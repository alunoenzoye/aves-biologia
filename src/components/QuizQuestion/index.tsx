import { useMemo } from "react";
import styles from "./styles.module.scss";
import useAve from "../../hooks/useAve";
import { aveName } from "../../types";
import Icon from "@mdi/react";
import { mdiLightbulbOn10 } from "@mdi/js";

export type quizQuestionProps = {
    onRightAnswer: () => void,
    onWrongAnswer: () => void,
    rightAnswer: aveName,
    answers: aveName[],
}

export function QuizQuestion({onRightAnswer, onWrongAnswer, rightAnswer, answers}: quizQuestionProps) {
    const rightAveData = useAve(rightAnswer);

    const answerButtons = useMemo(() => {
        return answers.map((answer, index) => {
            const onClick = (answer === rightAnswer) ? onRightAnswer : onWrongAnswer;

            return (
                <button
                    key={index}
                    className={styles.answer_button}
                    onClick={onClick}
                >
                    {answer}
                </button>
            )
        })
    }, [rightAnswer, answers, onRightAnswer, onWrongAnswer])

    return (
        <div className={styles.quiz_question}>
            <h1 className={styles.question_title}>Qual é essa ave?</h1>
            <div className={styles.question_ave_icon}>
                <img src={rightAveData.imagePath} alt={rightAveData.displayName} />
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
                        <p className={styles.question_hint}>{rightAveData.hint}</p>
                        <div className={styles.answers_container}>
                            {answerButtons}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default QuizQuestion;