import { useEffect, useMemo, useReducer } from "react";
import { useLocation, useNavigate } from "react-router";
import { quizLocationState, quizName } from "../../types";
import QuizQuestion from "../../components/QuizQuestion";
import styles from "./styles.module.scss";
import { getQuestionData, getQuiz } from "../../modules/dataFetcher";
import QuizEnd from "../../components/QuizEnd";

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
            currentQuestion: state.currentQuestion + 1
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
    const navigate = useNavigate();
    const location = useLocation();

    // TODO: add state dispatching for when the an user gets a question right, wrong, or gets the last question right.
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
    }, [location])
    
    const questionData = useMemo(() => {
        return getQuestionData(state.currentQuiz, state.currentQuestion);
    }, [state.currentQuestion, state.currentQuiz]);

    const quizData = useMemo(() => {
        return getQuiz(state.currentQuiz);
    }, [state.currentQuiz]);

    console.log(state)

    if (state.hasWon) {
        return (
            <QuizEnd 
                won={true}
                rightQuestions={state.totalRightQuestions}
                totalQuestions={quizData.questions.length}
                onRestartClick={() => dispatch({type: RESTART})}
            />
        )
    } else if (state.hasFailed) {
        return (
            <QuizEnd 
                won={false}
                rightQuestions={state.totalRightQuestions}
                totalQuestions={quizData.questions.length}
                onRestartClick={() => dispatch({type: RESTART})}
            />
        )
    }

    return (
        <div className={styles.page_container}>
            <h1>Questão atual {state.currentQuestion + 1}</h1>
            <QuizQuestion
                onRightAnswer={() => dispatch({ type: CORRECT_ANSWER })}
                onWrongAnswer={() => dispatch({ type: WRONG_ANSWER })}
                rightAnswer={questionData.rightAnswer}
                answers={questionData.answers}
                hint={questionData.hint}
            />
        </div>
    )
}

export default QuizPage