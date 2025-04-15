import aves from "../data/aves.json";
import quizes from "../data/quizes.json";
import { aveType } from "../types";

export function getAve(name: keyof typeof aves): aveType {
    const ave: aveType = aves[name];

    if (ave === undefined) {
        console.error("Invalid ave name.");
    }

    return ave;
}

export function getQuizes(): typeof quizes {
    return quizes;
}