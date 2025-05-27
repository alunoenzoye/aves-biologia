import { useEffect, useReducer, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { aveRewards, quizLocationState, quizName } from "../../types";
import QuizQuestion from "../../components/QuizQuestion";
import styles from "./styles.module.scss";
import { getQuiz } from "../../modules/dataFetcher";
import QuizEnd from "../../components/QuizEnd";
import useQuiz from "../../hooks/useQuiz";
import useQuestion from "../../hooks/useQuestion";
import useLoadedSave from "../../hooks/useLoadedSave";
import useCurrentSave from "../../hooks/useCurrentSave";

const CORRECT_ANSWER = "CORRECT";
const WRONG_ANSWER = "WRONG";
const RESTART = "RESTART";
const CHANGE_QUIZ = "CHANGE_QUIZ";

type quizState = {
    currentQuiz: quizName,
    currentQuestion: number,
    hasFailed: boolean,
    hasWon: boolean
    totalRightQuestions: number,
}

type quizAction = {
    type: typeof CORRECT_ANSWER | typeof WRONG_ANSWER | typeof RESTART | typeof CHANGE_QUIZ,
    quizName?: quizName
}

function reducer(state: quizState, action: quizAction) {
    if (state.currentQuiz === null) {
        return {
            ...state
        }
    }

    if (action.type === CORRECT_ANSWER) {
        const nextQuestionIndex = state.currentQuestion + 1;
        const quizData = getQuiz(state.currentQuiz);

        if (nextQuestionIndex > (quizData.questions.length - 1)) {
            return {
                ...state,
                hasWon: true,
                totalRightQuestions: state.totalRightQuestions + 1
            }
        }

        return {
            ...state,
            currentQuestion: state.currentQuestion + 1,
            totalRightQuestions: state.totalRightQuestions + 1
        };
    } else if (action.type === WRONG_ANSWER) {
        return {
            ...state,
            currentQuestion: 0,
            hasFailed: true
        };
    } else if (action.type === RESTART) {
        return {
            ...state,
            totalRightQuestions: 0,
            currentQuestion: 0,
            hasFailed: false,
            hasWon: false
        }
    } else if (action.type === CHANGE_QUIZ) {
        if (action.quizName === undefined) {
            console.error("No quiz name provided.");
        }

        return {
            currentQuestion: 0,
            hasFailed: false,
            hasWon: false,
            currentQuiz: action.quizName as quizName,
            totalRightQuestions: 0
        }
    }

    return {
        ...state
    }
}

export function QuizPage() {
    useLoadedSave();

    const currentSave = useCurrentSave();
    const navigate = useNavigate();
    const location = useLocation();

    const [state, dispatch] = useReducer(
        reducer,
        {
            currentQuestion: 0,
            hasFailed: false,
            hasWon: false,
            currentQuiz: "quiz2",
            totalRightQuestions: 0
        }
    )

    const questionData = useQuestion(state.currentQuiz, state.currentQuestion);
    const quizData = useQuiz(state.currentQuiz);

    useEffect(() => {
        if (location.state === null) {
            navigate('/');
        }
        const locationState: quizLocationState = location.state;
        const newQuizName = locationState.quizName as quizName

        if (state.currentQuiz !== newQuizName) {
            dispatch({
                type: CHANGE_QUIZ,
                quizName: newQuizName
            })
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location, navigate])

    const [aveRewards, setAveRewards] = useState([] as aveRewards);

    const onRightAnswer = () => {
        console.log(state.currentQuestion);
        console.log(quizData.questions.length)
        if (state.currentQuestion + 1 > (quizData.questions.length - 1)) {
            console.log(quizData.rewards);
            const rewards: aveRewards = []

            quizData.rewards.forEach(ave => {
                if (currentSave?.isAveUnlocked(ave) === false) {
                    currentSave.unlockAve(ave);
                    rewards.push(ave);
                }
            });

            if (currentSave?.isQuizCompleted(state.currentQuiz) === false) {
                currentSave.completeQuiz(state.currentQuiz);
            }

            console.log(rewards);

            setAveRewards(rewards);
        }


        dispatch({
            type: CORRECT_ANSWER
        })
    }

    if (state.hasWon) {
        return (
            <QuizEnd 
                won={true}
                aveRewards={aveRewards}
                rightQuestions={state.totalRightQuestions}
                totalQuestions={quizData.questions.length}
                onRestartClick={() => dispatch({type: RESTART})}
            />
        )
    } else if (state.hasFailed) {
        return (
            <QuizEnd 
                won={false}
                aveRewards={aveRewards}
                rightQuestions={state.totalRightQuestions}
                totalQuestions={quizData.questions.length}
                onRestartClick={() => dispatch({type: RESTART})}
            />
        )
    }

    return (
        <div className={styles.quiz_page}>
            <div className={styles.quiz_question_container}>
                <i className={styles.quiz_question_number}>
                    <span>{state.currentQuestion + 1}</span>
                </i>
                <QuizQuestion
                    onRightAnswer={onRightAnswer}
                    onWrongAnswer={() => dispatch({ type: WRONG_ANSWER })}
                    rightAnswer={questionData.rightAnswer}
                    answers={questionData.answers}
                />
            </div>
        </div>
    )
}

export default QuizPage