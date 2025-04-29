import { useMemo } from "react";
import { quizName, quizType } from "../types";
import { getQuiz } from "../modules/dataFetcher";

function useQuiz(quizName: quizName): quizType {
    const quizData = useMemo(() => {
        return getQuiz(quizName);
    }, [quizName])

    return quizData
}

export default useQuiz;