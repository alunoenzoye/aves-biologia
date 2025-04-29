import { useMemo } from "react";
import { aveName, aveType } from "../types";
import { getAve } from "../modules/dataFetcher";
import getImageUrl from "../util/getImageUrl";

type aveData = {
    imagePath: string
} & aveType;

function useAve(name: aveName): aveData {
    const aveData = useMemo(() => {
        const data = getAve(name);

        return {
            ...data,
            imagePath: getImageUrl(`aves/${name}`)
        };
    }, [name])

    return aveData;
}

export default useAve;