import { Link } from "react-router";
import styles from "./styles.module.scss";

export type quizEndProps = {
    won: boolean,
    rightQuestions: number,
    totalQuestions: number,
    onRestartClick: () => void
};

export function QuizEnd({won, rightQuestions, totalQuestions, onRestartClick}: quizEndProps) {
    const textoTitulo = (won) ? "Parabens, você completou o quiz!" : "Não foi dessa vez, você errou!";

    return (
        <div className={styles.quiz_end}>
            <div className={styles.status_container}>
                <h1>{textoTitulo}</h1>
                <span>Questões acertadas: {rightQuestions}/{totalQuestions}</span>
            </div>
            <div className={styles.button_container}>
                <button onClick={onRestartClick}>Reiniciar</button>
                <Link draggable={false} to="/quiz-select" className={styles.nav_button}>Voltar</Link>
            </div>
        </div>
    )
}

export default QuizEnd;