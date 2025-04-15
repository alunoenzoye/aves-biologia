import { Link } from 'react-router';
import {DifficultyTag, difficulties} from '../DifficultyTag';
import styles from './styles.module.css';

export type quizSelectProps = {
    quizName: string
    title: string,
    difficulty: difficulties,
    totalQuestions: number
}

function QuizSelect ({title, difficulty, totalQuestions, quizName}: quizSelectProps) {
    let quizClass;

    switch(difficulty) {
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

    return (
        <Link 
            to='/quiz'
            state={{quizName: quizName}}
            className={`${styles.quiz_select} ${quizClass}`}
        >
            <div className={styles.container}>
                <span className={styles.quiz_title}>{title}</span>
                <DifficultyTag difficulty={difficulty} />
                <span>{totalQuestions} questões</span>
            </div>
        </Link>
    )
}

export default QuizSelect;