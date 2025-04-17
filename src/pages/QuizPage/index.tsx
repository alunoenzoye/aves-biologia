import React, { ReducerState, useEffect, useReducer } from "react";
import { useLocation, useNavigate } from "react-router";
import { quizLocationState } from "../../types";
import QuizQuestion from "../../components/QuizQuestion";

const CORRECT_ANSWER = "CORRECT";
const WRONG_ANSWER = "WRONG";
const RESTART = "RESTART";
const CHANGE_QUIZ = "CHANGE_QUIZ"

export type quizPageProps = {};

type quizState = {
    currentQuiz: string | null,
    currentQuestion: number,
    hasFailed: boolean,
    hasWon: boolean
}

type quizAction = {
    type: typeof CORRECT_ANSWER | typeof WRONG_ANSWER | typeof RESTART | typeof CHANGE_QUIZ,
    quizName?: string
}

function reducer(state: quizState, action: quizAction) {
    if (action.type === CORRECT_ANSWER) {
        return {
            ...state,
            currentQuestion: state.currentQuestion + 1
        };
    } else if (action.type === WRONG_ANSWER) {
        return {
            ...state,
            currentQuestion: 1,
            hasFailed: true
        };
    }

    return {
        ...state
    }
}

export function QuizPage(props: quizPageProps) {
    const navigate = useNavigate();
    const location = useLocation();
    // TODO: add state dispatching for when the an user gets a question right, wrong, or gets the last question right.
    const [state, dispatch] = useReducer(
        reducer, 
        {
            currentQuestion: 1, 
            hasFailed: false, 
            hasWon: false,
            currentQuiz: null,
        }
    )

    useEffect(() => {
        if (location.state === null) {
            navigate('/');
        }
        const locationState: quizLocationState = location.state;
        const newQuizName = locationState.quizName

        if (state.currentQuiz !== newQuizName) {
            dispatch({
                type: CHANGE_QUIZ,
                quizName: newQuizName
            })
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location, navigate])

    console.log(state);

    return (
        <div>
            <h1>Questão atual{state.currentQuestion}</h1>
            <QuizQuestion
                onRightAnswer={() => dispatch({type: CORRECT_ANSWER})}
                onWrongAnswer={() => dispatch({type: WRONG_ANSWER})}
                rightAnswer={"aveTeste"}
                answers={["aveTeste", "pomba"]}
            />
        </div>
    )
}

export default QuizPage