import QuizSelect from '../../components/QuizSelect';
import styles from './styles.module.css';
import PageHeader from '../../components/PageHeader';
import React from 'react';
import { getQuiz, getQuizes } from '../../modules/dataFetcher';
import { difficultyType, quizName } from '../../types';

function QuizSelectPage() {
    const quizes = React.useMemo(() => {
        const quizes = getQuizes();
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