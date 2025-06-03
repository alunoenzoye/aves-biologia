import useElapsedTime from "../../hooks/useElapsedTime";
import styles from "./styles.module.scss";
import Icon from '@mdi/react';
import { mdiTimerOutline } from '@mdi/js';
import getTimeMMSS from "../../util/getTimeMMSS";

interface quizTimerProps {
    startTime: number
}

function QuizTimer({startTime}: quizTimerProps) {
    const elapsedTime = useElapsedTime(startTime);

    return (
        <div className={styles.timer_container}>
            <Icon 
                path={mdiTimerOutline}
                size={"2rem"}
                color={"#2B2B34"}
            />
            <span>{getTimeMMSS(elapsedTime)}</span>
        </div>
    )
}

export default QuizTimer;