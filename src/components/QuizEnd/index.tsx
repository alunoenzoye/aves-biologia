import { Link } from "react-router";
import styles from "./styles.module.scss";
import { aveRewards } from "../../types";
import { useMemo } from "react";
import { getAve } from "../../modules/dataFetcher";
import Icon from "@mdi/react";
import { mdiCheckBold, mdiTimerOutline } from "@mdi/js";
import getTimeMMSS from "../../util/getTimeMMSS";
import { motion as m } from "motion/react";
import cloudsBg from "../../assets/img/bg-clouds.jpg";

export type quizEndProps = {
    won: boolean,
    elapsedTime: number,
    aveRewards: aveRewards,
    rightQuestions: number,
    totalQuestions: number,
    onRestartClick: () => void
};

export function QuizEnd({elapsedTime, won, rightQuestions, totalQuestions, onRestartClick, aveRewards}: quizEndProps) {
    const textoTitulo = (won) ? "Parabens, você completou o quiz!" : "Não foi dessa vez, você errou!";

    const rewards = useMemo(() => {
        const elements = aveRewards.map((ave, index) => {
            const aveData = getAve(ave);

            return (
                <m.div 
                    className={styles.ave_reward}
                    key={index}
                    transition={{
                        delay: 0.3 * index
                    }}
                    initial={{
                        translateY: 10,
                        opacity: 0
                    }}
                    animate={{
                        translateY: 0,
                        opacity: 1
                    }}
                >
                    <div className={styles.ave_reward_container}>
                        <img src={aveData.imagePath} alt="" />
                    </div>
                    <div className={styles.ave_reward_footer}>
                        <span>{aveData.displayName}</span>
                    </div>
                </m.div>
            )
        })

        return elements;
    }, [aveRewards])

    return (
        <m.div 
            className={styles.quiz_end}
            initial={{
                opacity: 0
            }}
            animate={{
                opacity: 1
            }}
        >
            <m.h1 
                className={styles.end_title}
                initial={{
                    scale: 0,
                }}
                animate={{
                    scale: 1,
                }}
            >Fim de jogo!</m.h1>
            <div className={styles.status_container}>
                <h2 
                    className={styles.result_status}
                >{textoTitulo}</h2>
                <div className={styles.game_stats}>
                    <div 
                        className={styles.game_stat}
                    >
                        <m.div
                            className={styles.layout_container}
                            initial={{
                                opacity: 0,
                                translateY: 10
                            }}
                            animate={{
                                opacity: 1,
                                translateY: 0
                            }}
                        >
                            <Icon 
                                path={mdiCheckBold}
                                size={"1.5rem"}
                                color={"#424242"}
                            />
                            <span>{rightQuestions} / {totalQuestions}</span>
                        </m.div>
                    </div>
                    <div className={styles.game_stat}>
                        <m.div
                            className={styles.layout_container}
                            initial={{
                                opacity: 0,
                                translateY: 10
                            }}
                            animate={{
                                opacity: 1,
                                translateY: 0
                            }}
                        >
                            <Icon 
                                path={mdiTimerOutline}
                                size={"1.5rem"}
                                color={"#424242"}
                            />
                            <span>{getTimeMMSS(elapsedTime)}</span>
                        </m.div>
                    </div>
                </div>
                {(aveRewards.length > 0) && (
                    <div className={styles.rewarded_aves}>
                        <div className={styles.rewards_header}>
                            <h1 className={styles.rewards_title}>Recompensas</h1>
                        </div>
                        <div 
                            className={styles.rewards}
                            style={{
                                backgroundImage: `url(${cloudsBg})`
                            }}
                        >
                            {rewards}
                        </div>
                    </div>
                )}
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
        </m.div>
    )
}

export default QuizEnd;