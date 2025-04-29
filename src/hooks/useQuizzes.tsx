import { useMemo } from "react";
import { getQuizzes } from "../modules/dataFetcher";

function useQuizzes() {
    return useMemo(() => {
        return getQuizzes();
    }, [])
}

export default useQuizzes;