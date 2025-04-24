import { useMemo } from "react";
import styles from "./styles.module.scss";
import getImageUrl from "../../util/getImageUrl";

export type quizQuestionProps = {
    onRightAnswer: () => void,
    onWrongAnswer: () => void,
    rightAnswer: string,
    answers: string[],
    hint: string
}

export function QuizQuestion({onRightAnswer, onWrongAnswer, rightAnswer, answers, hint}: quizQuestionProps) {
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
            <img className={styles.image_container} src={getImageUrl(`aves/${rightAnswer}`)} alt="" />
            <div className={styles.question_container}>
                <h1>Qual é essa ave?</h1>
                <span>Dica: {hint}</span>
                <div className={styles.answers_container}>
                    {answerButtons}
                </div>
            </div>
        </div>
    )
}

export default QuizQuestion;