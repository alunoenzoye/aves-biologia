import React, { ReducerState, useReducer } from "react";
import { useLocation, useNavigate } from "react-router";

export type quizPageProps = {};

type quizState = {
    currentQuestion: number,
    hasFailed: boolean,
    hasWon: boolean
}



function reducer(state: quizState, action) {

}

export function QuizPage(props: quizPageProps) {
    const navigate = useNavigate();
    const location = useLocation();
    // TODO: add state dispatching for when the an user gets a question right, wrong, or gets the last question right.
    const [state, dispatch] = useReducer(reducer, {currentQuestion: 1, hasFailed: false, hasWon: false})

    React.useEffect(() => {
        if (location.state === null) {
            navigate('/');
        }
    }, [location, navigate])

    return (
        <div></div>
    )
}

export default QuizPage