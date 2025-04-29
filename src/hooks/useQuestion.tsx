import { useMemo } from "react";
import { questionType, quizName } from "../types";
import { getQuestionData } from "../modules/dataFetcher";

function useQuestion(quizName: quizName, questionNumber: number): questionType {
    const questionData = useMemo(() => {
        return getQuestionData(quizName, questionNumber);
    }, [quizName, questionNumber])

    return questionData
}

export default useQuestion;