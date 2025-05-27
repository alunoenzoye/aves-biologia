import aves from "./data/aves.json";
import quizes from "./data/quizes.json";

export type AppPages = "Start" | "Catalog" | "QuizSelect" | "Game";

export type aveName = keyof typeof aves;
export type quizName = keyof typeof quizes;

export type aveRewards = aveName[];

export type aveType = {
    displayName: string,
    scientificName: string,
    hint: string,
    height: number,
    mass: number
    habitat: string
    diet: string,
    description: string,
}

export type difficultyType = "Easy" | "Medium" | "Hard";

export type questionType = {
    name: string,
    rightAnswer: aveName,
    answers: aveName[],
}

export type saveSlot = "1" | "2" | "3";

export type quizType = {
    name: string,
    difficulty: difficultyType,
    questions: [questionType],
    unlockRequirement?: number
    rewards: aveName[]
}

export type quizLocationState = {
    quizName: string
}