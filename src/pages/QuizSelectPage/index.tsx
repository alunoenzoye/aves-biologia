import QuizSelect from '../../components/QuizSelect';
import styles from './styles.module.css';
import PageHeader from '../../components/PageHeader';
import { getQuizzes } from '../../modules/dataFetcher';
import { difficultyType, quizName } from '../../types';
import useLoadedSave from '../../hooks/useLoadedSave';
import { useMemo } from 'react';

function QuizSelectPage() {
    useLoadedSave();

    const quizes = useMemo(() => {
        const quizes = getQuizzes();
        return Object.keys(quizes).map((key, index) => {
            const quiz = quizes[key as quizName];

            return <QuizSelect
                key={index}
                quizName={key}
                title={quiz.name}
                difficulty={quiz.difficulty as difficultyType}
                totalQuestions={quiz.questions.length}
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