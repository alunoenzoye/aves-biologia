import { Link } from 'react-router';
import styles from './styles.module.scss';
import { quizName } from '../../types';
import useQuiz from '../../hooks/useQuiz';
import useCurrentSave from '../../hooks/useCurrentSave';
import { mdiCheckCircle, mdiLock } from '@mdi/js';
import Icon from '@mdi/react';
import { motion as m } from 'motion/react';

export type quizSelectProps = {
    quiz: quizName,
}

const difficultyTranslations = {
    "Easy": "Fácil",
    "Medium": "Médio",
    "Hard": "Difícil",
    "Extreme": "Extremo",
}

function QuizSelect({ quiz }: quizSelectProps) {
    const quizData = useQuiz(quiz)
    const currentSave = useCurrentSave();
    const quizCompleted = currentSave?.isQuizCompleted(quiz) === true;

    let totalCompletedQuizzes = 0;
    let isUnlocked = true

    if (quizData.unlockRequirement !== undefined && currentSave !== null) {
        totalCompletedQuizzes = currentSave.getCompletedQuizzes().length;
        isUnlocked = totalCompletedQuizzes >= quizData.unlockRequirement;
    }

    return (
        <m.div
            initial={{
                opacity: 0
            }}
            animate={{
                opacity: 1
            }}
            whileHover={{
                translateY: 4
            }}
            whileTap={{
                translateY: 0,
                scale: 0.95
            }}
        >
            <Link
                to={isUnlocked ? "/quiz" : ""}
                state={{ quizName: quiz }}
                className={styles.quiz_select}
                data-locked={!isUnlocked}
                data-difficulty={quizData.difficulty}
            >
                <div className={styles.quiz_select_header}>
                    <h1 className={styles.quiz_select_title}>
                        {(isUnlocked) ? quizData.name : "???"}
                    </h1>
                    {quizCompleted && (
                        <Icon 
                            path={mdiCheckCircle} 
                            color={"#2B2B34"}
                            size="1.5rem"
                        />
                    )}
                    {!isUnlocked && (
                        <Icon 
                            path={mdiLock} 
                            size={"1.5rem"}
                            color={"#847E7C"}
                        />
                    )}
                </div>
                <div className={styles.quiz_select_content}>
                    {isUnlocked && (
                        <>
                        <div className={styles.difficulty_tag}>
                            <span>{difficultyTranslations[quizData.difficulty]}</span>
                        </div>
                        <p className={styles.total_questions_text}>{quizData.questions.length} questões</p>
                        </>
                    )}
                    {(!isUnlocked && quizData.unlockRequirement !== undefined) && (
                        <div className={styles.locked_container}>
                            <span>Complete mais {quizData.unlockRequirement - totalCompletedQuizzes} quiz(s)</span>
                        </div>
                    )}
                </div>
            </Link>
        </m.div>
    )
}

export default QuizSelect;