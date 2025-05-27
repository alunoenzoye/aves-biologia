import useAve from "../../hooks/useAve";
import useCurrentSave from "../../hooks/useCurrentSave";
import { aveName } from "../../types";
import styles from "./styles.module.scss";
import Icon from '@mdi/react';
import { mdiLock } from '@mdi/js';

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
            data-locked={!isAveUnlocked}
        >
            <div className={styles.ave_button_icon_container}>
                <div className={styles.ave_button_icon_content}>
                    {isAveUnlocked ? (
                        <img className={styles.ave_button_icon} src={aveData.imagePath} alt={aveData.displayName} />
                    ) : (
                        <div className={styles.locked_icon_container}>
                            <Icon 
                                path={mdiLock} 
                                size={"auto"}
                                color={"#847E7C"}
                            />
                        </div>
                    )}
                </div>
            </div>
            <div className={styles.ave_button_footer}>
                <span className={styles.ave_button_title}>
                    {isAveUnlocked ? aveData.displayName : "???"}
                </span>
            </div>
        </button>
    )
}

export default AveButton;