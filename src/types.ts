import aves from "./data/aves.json";
import quizes from "./data/quizes.json";

export type AppPages = "Start" | "Catalog" | "QuizSelect" | "Game";

export type aveName = keyof typeof aves;
export type quizName = keyof typeof quizes;

export type aveType = {
    displayName: string,
    hint: string,
    description: string,
}

export type difficultyType = "Easy" | "Medium" | "Hard";

export type questionType = {
    name: string,
    rightAnswer: aveName,
    answers: aveName[],
}

export type saveSlots = "1" | "2" | "3";

export type quizType = {
    name: string,
    difficulty: difficultyType | string,
    questions: [questionType]
}

export type quizLocationState = {
    quizName: string
}