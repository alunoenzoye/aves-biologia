import { useMemo } from "react";
import styles from "./styles.module.scss";
import useAve from "../../hooks/useAve";
import { aveName } from "../../types";

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
                    onClick={onClick}
                >
                    {answer}
                </button>
            )
        })
    }, [rightAnswer, answers, onRightAnswer, onWrongAnswer])

    return (
        <div className={styles.container}>
            <img className={styles.image_container} src={rightAveData.imagePath} alt="" />
            <div className={styles.question_container}>
                <h1>Qual é essa ave?</h1>
                <span>Dica: {rightAveData.hint}</span>
                <div className={styles.answers_container}>
                    {answerButtons}
                </div>
            </div>
        </div>
    )
}

export default QuizQuestion;