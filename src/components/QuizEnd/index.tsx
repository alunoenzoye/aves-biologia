import { Link } from "react-router";
import styles from "./styles.module.scss";
import { aveRewards } from "../../types";
import { useMemo } from "react";
import { getAve } from "../../modules/dataFetcher";

export type quizEndProps = {
    won: boolean,
    aveRewards: aveRewards,
    rightQuestions: number,
    totalQuestions: number,
    onRestartClick: () => void
};

export function QuizEnd({won, rightQuestions, totalQuestions, onRestartClick, aveRewards}: quizEndProps) {
    const textoTitulo = (won) ? "Parabens, você completou o quiz!" : "Não foi dessa vez, você errou!";

    console.log(aveRewards);

    const rewards = useMemo(() => {
        const elements = aveRewards.map((ave, index) => {
            console.log(ave);
            const aveData = getAve(ave);

            return (
                <div 
                    className={styles.ave_reward}
                    key={index}
                >
                    <img src={aveData.imagePath} alt="" />
                    <span>{aveData.displayName}</span>
                </div>
            )
        })

        console.log(elements);
        return elements;
    }, [aveRewards])

    return (
        <div className={styles.quiz_end}>
            <div className={styles.status_container}>
                <h1>{textoTitulo}</h1>
                <span>Questões acertadas: {rightQuestions}/{totalQuestions}</span>
            </div>
            {(aveRewards.length > 0) && (
                <div className={styles.rewarded_aves}>
                    <h1>Recompensas:</h1>
                    <div className={styles.rewards}>
                        {rewards}
                    </div>
                </div>
            )}
            <div className={styles.button_container}>
                <button onClick={onRestartClick}>Reiniciar</button>
                <Link draggable={false} to="/quiz-select" className={styles.nav_button}>Voltar</Link>
            </div>
        </div>
    )
}

export default QuizEnd;