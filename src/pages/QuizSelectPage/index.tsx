import QuizSelect from '../../components/QuizSelect';
import styles from './styles.module.css';
import PageHeader from '../../components/PageHeader';
import React from 'react';
import { getQuizes } from '../../modules/dataFetcher';
import { difficultyType } from '../../types';

function QuizSelectPage() {
    const quizes = React.useMemo(() => {
        return Object.values(getQuizes()).map((quiz, index) => (
            <QuizSelect
                key={index}
                quizName='aaaa'
                title={quiz.name}
                difficulty={quiz.difficulty as difficultyType}
                totalQuestions={quiz.questions.length} />
        ))
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