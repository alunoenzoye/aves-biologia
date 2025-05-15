import { useMemo } from "react";
import { getAves } from "../modules/dataFetcher";

function useAves() {
    return useMemo(() => {
        return getAves();
    }, [])
}

export default useAves;