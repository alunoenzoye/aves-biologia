import { useEffect, useState } from "react";
import getCurrentTimeInSeconds from "../util/getCurrentTimeInSeconds";

function useElapsedTime(startTime: number) {
    const [time, setTime] = useState(0);

    useEffect(() => {
        const timer = window.setInterval(() => {
            console.log(getCurrentTimeInSeconds());
            setTime(getCurrentTimeInSeconds() - startTime);
        }, 1000);
        
        return () => window.clearInterval(timer);
    }, [startTime])

    return time;
}

export default useElapsedTime;