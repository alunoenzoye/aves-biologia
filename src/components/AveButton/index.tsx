import useAve from "../../hooks/useAve";
import useCurrentSave from "../../hooks/useCurrentSave";
import { aveName } from "../../types";
import styles from "./styles.module.scss";

type aveButtonProps = {
    ave: aveName
    onClick: () => void,
}

function AveButton({ave, onClick}: aveButtonProps) {
    const currentSave = useCurrentSave();
    const aveData = useAve(ave);

    const isAveUnlocked = currentSave?.isAveUnlocked(ave) === true;

    return (
        <button 
            className={styles.ave_button} 
            onClick={(isAveUnlocked) ? onClick : undefined} 
            data-locked={isAveUnlocked}
        >
            {isAveUnlocked ? (
                <div className={styles.ave_info}>
                    <h1>{aveData.displayName}</h1>
                    <img src={aveData.imagePath} alt="" />
                </div>
            ) : (
                <>
                    <span>Ave bloqueada!</span>
                </>
            )}
        </button>
    )
}

export default AveButton;