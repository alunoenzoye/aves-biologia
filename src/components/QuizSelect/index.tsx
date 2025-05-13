import { Link } from 'react-router';
import {DifficultyTag} from '../DifficultyTag';
import styles from './styles.module.scss';
import checkmark from '../../assets/icons/check.svg';
import { quizName } from '../../types';
import useQuiz from '../../hooks/useQuiz';
import useCurrentSave from '../../hooks/useCurrentSave';

export type quizSelectProps = {
    quiz: quizName,
}

function QuizSelect ({quiz}: quizSelectProps) {
    const quizData = useQuiz(quiz)
    const currentSave = useCurrentSave();
    const quizCompleted = currentSave?.isQuizCompleted(quiz) === true;

    let totalCompletedQuizzes = 0;
    let isUnlocked = true

    if (quizData.unlockRequirement !== undefined && currentSave !== null) {
        totalCompletedQuizzes = currentSave.getCompletedQuizzes().length;
        isUnlocked = (totalCompletedQuizzes >= quizData.unlockRequirement) ? true : false
    }

    let quizClass;

    switch(quizData.difficulty) {
        case "Easy":
            quizClass = styles.easy;
            break;
        case "Medium":
            quizClass = styles.medium;
            break;
        case "Hard":
            quizClass = styles.hard;
            break;
        default:
            console.error("Invalid difficulty");
            break
    }

    if (!isUnlocked && quizData.unlockRequirement !== undefined) {
        return (
            <div className={`${styles.quiz_select} ${styles.locked_quiz}`}>
                <div className={styles.container}>
                    <span>Quiz bloqueado!</span>
                    <span>Complete mais {quizData?.unlockRequirement - totalCompletedQuizzes} quiz(s)</span>
                </div>
            </div>
        )
    }

    return (
        <Link 
            to='/quiz'
            state={{quizName: quiz}}
            className={`${styles.quiz_select} ${quizClass}`}
        >
            {quizCompleted && (
                <img src={checkmark} alt="Completado" className={styles.check} />
            )}
            <div className={styles.container}>
                <span className={styles.quiz_title}>{quizData.name}</span>
                <DifficultyTag difficulty={quizData.difficulty} />
                <span>{quizData.questions.length} questões</span>
            </div>
        </Link>
    )
}

export default QuizSelect;