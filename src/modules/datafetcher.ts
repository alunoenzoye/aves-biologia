import aves from "../data/aves.json";
import quizzes from "../data/quizes.json";
import { aveType, questionType, quizName, quizType } from "../types";

export function getAve(name: keyof typeof aves): aveType {
    const ave: aveType = aves[name];

    if (ave === undefined) {
        console.error(`Invalid ave name ${name}`);
    }

    return {...ave};
}

export function getQuiz(name: quizName): quizType {
    const quiz: quizType = quizzes[name] as quizType;

    if (quiz === undefined) {
        console.error(`Invalid quiz name ${name}`);
    }

    return {...quiz};
}

export function getQuizzes(): typeof quizzes {
    return {...quizzes};
}

export function getQuestionData(quizName: keyof typeof quizzes, index: number): questionType {
    const quizData = getQuiz(quizName);
    const question = quizData.questions[index];

    return {...question};
}
