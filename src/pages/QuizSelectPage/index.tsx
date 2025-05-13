import QuizSelect from '../../components/QuizSelect';
import styles from './styles.module.css';
import PageHeader from '../../components/PageHeader';
import { getQuizzes } from '../../modules/dataFetcher';
import { difficultyType, quizName } from '../../types';
import useLoadedSave from '../../hooks/useLoadedSave';
import { useMemo } from 'react';
import useCurrentSave from '../../hooks/useCurrentSave';

function QuizSelectPage() {
    useLoadedSave();

    const currentSave = useCurrentSave();

    const quizes = useMemo(() => {
        const quizes = getQuizzes();
        return Object.keys(quizes).map((key, index) => {
            const quizKey = key as quizName;
            const quiz = quizes[quizKey];

            return <QuizSelect
                key={index}
                quiz={quizKey}
            />
        })
    }, [])

    return (
        <>
            <div className={styles.page_container}>
                <PageHeader
                    to='/'
                    title='SELECIONE O QUIZ'
                />
                <div className={styles.game_start_container}>
                    <div className={styles.game_btns}>
                        {quizes}
                    </div>
                </div>
            </div>
        </>
    )
}

export default QuizSelectPage;