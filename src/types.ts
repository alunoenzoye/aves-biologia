export type AppPages = "Start" | "Catalog" | "QuizSelect" | "Game";

export type aveType = {
    displayName: string,
    hint: string,
    description: string,
}

export type difficultyType = "Easy" | "Medium" | "Hard";

export type questionType = {
    name: string,
    rightAnswer: string,
    answers: [string],
}

export type quizType = {
    name: string,
    difficulty: difficultyType,
    questions: [questionType]
}

export type quizLocationState = {
    quizName: string
}