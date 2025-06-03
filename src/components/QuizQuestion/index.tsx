import { useMemo, useState } from "react";
import styles from "./styles.module.scss";
import useAve from "../../hooks/useAve";
import { aveName } from "../../types";
import Icon from "@mdi/react";
import { mdiLightbulbOn10 } from "@mdi/js";
import { getAve } from "../../modules/dataFetcher";
import { motion as m } from "motion/react";
import useForceUpdate from "../../hooks/useForceUpdate";

export type quizQuestionProps = {
    onRightAnswer: () => void,
    onWrongAnswer: () => void,
    rightAnswer: aveName,
    answers: aveName[],
}

export function QuizQuestion({onRightAnswer, onWrongAnswer, rightAnswer, answers}: quizQuestionProps) {
    const rightAveData = useAve(rightAnswer);
    const [revealBird, setRevealBird] = useState(false);
    const [clicked, setClicked] = useState(false);

    const answerButtons = useMemo(() => {
        return answers.map((answer, index) => {
            const onClick = () => {
                if (clicked === true) {
                    return;
                }

                setRevealBird(true);
                setClicked(true);

                if(answer === rightAnswer) {
                    setTimeout(() => {
                        onRightAnswer();
                        setRevealBird(false);
                        setClicked(false);
                    }, 2000);
                } else {
                    onWrongAnswer();
                    setRevealBird(false);
                    setClicked(false);
                }
            };

            const answerData = getAve(answer);

            return (
                <button
                    key={index}
                    className={styles.answer_button}
                    onClick={onClick}
                >
                    {answerData.displayName}
                </button>
            )
        })
    }, [answers, clicked, rightAnswer, onRightAnswer, onWrongAnswer])

    return (
        <div className={styles.quiz_question}>
            <h1 className={styles.question_title}>Qual é essa ave?</h1>
            <div className={styles.question_ave_icon}>
                {revealBird ? (
                    <m.img 
                        src={rightAveData.imagePath} 
                        alt={rightAveData.displayName} 
                        initial={{
                            filter: "brightness(0)"
                        }}
                        animate={{
                            filter: "brightness(1)"
                        }}
                    />
                ) : (
                    <img src={rightAveData.silhouetteImagePath} alt={rightAveData.displayName} />
                )}
            </div>
            <div className={styles.question_container_background}>
                <div className={styles.blue_div}>
                    <div className={styles.question_container}>
                        <div className={styles.question_hint_title}>
                            <Icon 
                                path={mdiLightbulbOn10}
                                size={"3rem"}
                                color={"#424242"}
                            />
                            <span>Dica</span>
                        </div>
                        <m.p 
                            className={styles.question_hint}
                            transition={{
                                delay: 0.1
                            }}
                            initial={{
                                opacity: 0,
                            }}
                            animate={{
                                opacity: 1
                            }}
                        >{rightAveData.hint}</m.p>
                        <m.div 
                            className={styles.answers_container}
                            transition={{
                                delay: 0.4
                            }}
                            initial={{
                                opacity: 0,
                            }}
                            animate={{
                                opacity: 1
                            }}
                        >
                            {answerButtons}
                        </m.div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default QuizQuestion;