import QuizSelect from '../../components/QuizSelect';
import styles from './styles.module.scss';
import PageHeader from '../../components/PageHeader';
import { getQuiz, getQuizzes } from '../../modules/dataFetcher';
import { quizName } from '../../types';
import useLoadedSave from '../../hooks/useLoadedSave';
import { useMemo, useState } from 'react';
import QuizSelectFilter, { quizSelectFilters } from '../../components/QuizSelectFilter';
import useCurrentSave from '../../hooks/useCurrentSave';

function QuizSelectPage() {
    useLoadedSave();

    const currentSave = useCurrentSave();

    const [filter, setFilter] = useState({
        search: "",
        statusFilter: "none"
    } as quizSelectFilters)

    const quizes = useMemo(() => {
        const quizes = getQuizzes();
        return Object.keys(quizes).filter((key) => {
            if (currentSave === null) {
                return true;
            }

            const quizKey = key as quizName;
            const quizData = getQuiz(quizKey);

            let include = true;

            if (filter.search.length > 0) {
                const regex = new RegExp(filter.search, 'i');

                include = (quizData.name.search(regex) === -1) ? false : true;
            }

            switch (filter.statusFilter) {
                case "completed":
                    include = (currentSave?.isQuizCompleted(quizKey) === true);
                    break;
                case "locked":
                    if (quizData.unlockRequirement === undefined) {
                        include = false;
                        break;
                    }

                    include = (currentSave.getCompletedQuizzes().length < quizData.unlockRequirement);
                    break;
                case "unlocked":
                    if (quizData.unlockRequirement === undefined) {
                        break;
                    }

                    include = (currentSave.getCompletedQuizzes().length >= quizData.unlockRequirement);
                    break;
                default:
                    break;
            }

            return include;
        })
        .map((key, index) => {
            const quizKey = key as quizName;

            return (
                <QuizSelect
                    key={index}
                    quiz={quizKey}
                />
            )
        })
    }, [filter, currentSave])
        
    return (
        <>
            <div className={styles.page_container}>
                <PageHeader
                    to='/'
                    title='SELECIONE O QUIZ'
                />
                <div className={styles.quiz_select}>
                    <QuizSelectFilter 
                        onSubmit={(newFilter) => setFilter(newFilter)}
                    />
                    <div className={styles.quiz_select_btns}>
                        {quizes}
                    </div>
                </div>
            </div>
        </>
    )
}

export default QuizSelectPage;