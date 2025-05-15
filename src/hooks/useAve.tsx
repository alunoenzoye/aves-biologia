import { useMemo } from "react";
import { aveName } from "../types";
import { getAve } from "../modules/dataFetcher";

function useAve(name: aveName) {
    const aveData = useMemo(() => {
        return getAve(name);
    }, [name])

    return aveData;
}

export default useAve;