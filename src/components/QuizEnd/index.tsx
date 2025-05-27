import { Link } from "react-router";
import styles from "./styles.module.scss";
import { aveRewards } from "../../types";
import { useMemo } from "react";
import { getAve } from "../../modules/dataFetcher";
import Icon from "@mdi/react";
import { mdiCheckBold } from "@mdi/js";

export type quizEndProps = {
    won: boolean,
    aveRewards: aveRewards,
    rightQuestions: number,
    totalQuestions: number,
    onRestartClick: () => void
};

export function QuizEnd({won, rightQuestions, totalQuestions, onRestartClick, aveRewards}: quizEndProps) {
    const textoTitulo = (won) ? "Parabens, você completou o quiz!" : "Não foi dessa vez, você errou!";

    const rewards = useMemo(() => {
        const elements = aveRewards.map((ave, index) => {
            const aveData = getAve(ave);

            return (
                <div 
                    className={styles.ave_reward}
                    key={index}
                >
                    <div className={styles.ave_reward_container}>
                        <img src={aveData.imagePath} alt="" />
                    </div>
                    <div className={styles.ave_reward_footer}>
                        <span>{aveData.displayName}</span>
                    </div>
                </div>
            )
        })

        return elements;
    }, [aveRewards])

    return (
        <div className={styles.quiz_end}>
            <h1 className={styles.end_title}>Fim de jogo!</h1>
            <div className={styles.status_container}>
                <h2 className={styles.result_status}>{textoTitulo}</h2>
                <div className={styles.game_stats}>
                    <div className={styles.game_stat}>
                        <Icon 
                            path={mdiCheckBold}
                            size={"1.5rem"}
                            color={"#424242"}
                        />
                        <span>{rightQuestions} / {totalQuestions}</span>
                    </div>
                    {(aveRewards.length > 0) && (
                        <div className={styles.rewarded_aves}>
                            <div className={styles.rewards_header}>
                                <h1 className={styles.rewards_title}>Recompensas</h1>
                            </div>
                            <div className={styles.rewards}>
                                {rewards}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className={styles.button_container}>
                <button className={styles.quiz_end_btn} onClick={onRestartClick}>Reiniciar</button>
                <Link 
                    className={styles.quiz_end_btn} 
                    draggable={false} 
                    to="/quiz-select"
                >
                        Voltar
                </Link>
            </div>
        </div>
    )
}

export default QuizEnd;