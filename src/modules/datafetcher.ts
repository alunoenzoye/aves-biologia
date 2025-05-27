import aves from "../data/aves.json";
import quizzes from "../data/quizes.json";
import { aveType, questionType, quizName, quizType } from "../types";
import getImageUrl from "../util/getImageUrl";

type aveData = {
    imagePath: string,
    silhouetteImagePath: string
} & aveType;

export function getAve(name: keyof typeof aves): aveData {
    const ave: aveType = aves[name];

    if (ave === undefined) {
        console.error(`Invalid ave name ${name}`);
    }

    return {
        ...ave,
        imagePath: getImageUrl(`aves/${name}`),
        silhouetteImagePath: getImageUrl(`aves/${name}-silhueta`)
    };
}

export function getAves(): typeof aves {
    return {...aves};
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
