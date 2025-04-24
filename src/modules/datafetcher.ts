import aves from "../data/aves.json";
import quizes from "../data/quizes.json";
import { aveType, questionData, quizName, quizType } from "../types";

export function getAve(name: keyof typeof aves): aveType {
    const ave: aveType = aves[name];

    if (ave === undefined) {
        console.error(`Invalid ave name ${name}`);
    }

    return ave;
}

export function getQuiz(name: quizName): quizType {
    const quiz: quizType = quizes[name] as quizType;

    if (quiz === undefined) {
        console.error(`Invalid quiz name ${name}`);
    }

    return quiz;
}

export function getQuizes(): typeof quizes {
    return quizes;
}

export function getQuestionData(quizName: keyof typeof quizes, index: number): questionData {
    const quizData = getQuiz(quizName);
    const question = quizData.questions[index];

    return {
        ...question,
        hint: getAve(question.rightAnswer).hint
    }
}
