import { aveName, quizName } from "../types";
import { saveSlots } from "../types";

interface PlayerSave {
    name: string,
    completedQuizzes: quizName[],
    unlockedAves: aveName[],
}

function savePlayerSaveToStorage(key: string, object: PlayerSave) {
    window.localStorage.setItem(key, JSON.stringify(object));
}

function getPlayerSaveFromStorage(key: string): PlayerSave | null {
    const object = window.localStorage.getItem(key)

    return (object === null) ? null : JSON.parse(object);
}

function deletePlayerSaveFromStorage(key: string) {
    window.localStorage.removeItem(key);
}

function interactWithPlayerSave<T>(key: string, callback: (playerSave: PlayerSave) => T) {
    const playerSave = getPlayerSaveFromStorage(key);

    if (playerSave === null) {
        throw Error("The PlayerSave doesn't exist in the local storage");
    }

    return callback(playerSave)
}

export interface IPlayerSaveModel {
    getWebStorageKey: () => saveSlots,
    isAveUnlocked: (ave: aveName) => boolean,
    isQuizCompleted: (quiz: quizName) => boolean,
    getUnlockedAves: () => aveName[],
    getCompletedQuizzes: () => quizName[],
    setName: (name: string) => void,
    getName: () => string,
    unlockAve: (ave: aveName) => void,
    completeQuiz: (quiz: quizName) => void,
    delete: () => void
}

class PlayerSaveModel implements IPlayerSaveModel {
    private webStorageKey: saveSlots;

    constructor (key: saveSlots) {
        this.webStorageKey = key;
    }

    public getWebStorageKey() {
        return this.webStorageKey;
    }

    public isAveUnlocked(ave: aveName) {
        return interactWithPlayerSave<boolean>(this.webStorageKey, (playerSave) => {
            return (playerSave.unlockedAves.indexOf(ave) === -1) ? false : true;
        });
    }

    public isQuizCompleted(quiz: quizName) {
        return interactWithPlayerSave<boolean>(this.webStorageKey, (playerSave) => {
            return (playerSave.completedQuizzes.indexOf(quiz) === -1) ? false : true;
        });
    }

    public getUnlockedAves() {
        return interactWithPlayerSave<aveName[]>(this.webStorageKey, (playerSave) => {
            return playerSave.unlockedAves.slice();
        });
    }

    public getCompletedQuizzes() {
        return interactWithPlayerSave<quizName[]>(this.webStorageKey, (playerSave) => {
            return playerSave.completedQuizzes.slice();
        });
    }

    public setName(name: string) {
        interactWithPlayerSave(this.webStorageKey, (playerSave) => {
            playerSave.name = name;
            savePlayerSaveToStorage(this.webStorageKey, playerSave);
        })
    }

    public getName() {
        return interactWithPlayerSave<string>(this.webStorageKey, (playerSave) => {
            return playerSave.name;
        });
    }

    public unlockAve(ave: aveName) {
        if (this.isAveUnlocked(ave)) {
            console.error(`Ave ${ave} has already been unlocked.`);
            return;
        }

        interactWithPlayerSave(this.webStorageKey, (playerSave) => {
            playerSave.unlockedAves.push(ave);
            savePlayerSaveToStorage(this.webStorageKey, playerSave);
        })
    }

    public completeQuiz(quiz: quizName) {
        if (this.isQuizCompleted(quiz)) {
            console.error(`Quiz ${quiz} has already been unlocked.`);
            return;
        }

        interactWithPlayerSave(this.webStorageKey, (playerSave) => {
            playerSave.completedQuizzes.push(quiz);
            savePlayerSaveToStorage(this.webStorageKey, playerSave);
        })
    }

    public delete() {
        deletePlayerSaveFromStorage(this.webStorageKey);
    }

};

type selectableSlots = saveSlots | null

class SaveHandler {
    private currentSlot: selectableSlots = null;

    public createSaveInSlot(name: string, slot: saveSlots) {
        if (getPlayerSaveFromStorage(slot) !== null) {
            console.error(`There's already a PlayerSave in slot ${slot}`);
            return;
        }

        savePlayerSaveToStorage(slot, {
            name: name,
            unlockedAves: [],
            completedQuizzes: []
        })
    }

    public getCurrentSlot() {
        return this.currentSlot;
    }

    public selectSlot(slot: selectableSlots) {
        this.currentSlot = slot;
    }

    public getSaveOnSlot(slot: saveSlots) {
        return (getPlayerSaveFromStorage(slot) === null) ? null : new PlayerSaveModel(slot);
    }

    public getCurrentSave() {
        if (this.currentSlot === null || getPlayerSaveFromStorage(this.currentSlot) === null) {
            return null;
        }

        return new PlayerSaveModel(this.currentSlot);
    }
}

export default new SaveHandler();