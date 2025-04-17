import { useMemo } from "react";
import styles from "./styles.module.css";
import getImageUrl from "../../util/getImageUrl";

export type quizQuestionProps = {
    onRightAnswer: () => void,
    onWrongAnswer: () => void,
    rightAnswer: string,
    answers: string[]
}

export function QuizQuestion({onRightAnswer, onWrongAnswer, rightAnswer, answers}: quizQuestionProps) {
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
        <div className={styles.question_container}>
            <img src={getImageUrl(`aves/${rightAnswer}`)} alt="" />
            <div>
                {answerButtons}
            </div>
        </div>
    )
}

export default QuizQuestion;