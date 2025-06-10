import useAve from "../../hooks/useAve";
import useCurrentSave from "../../hooks/useCurrentSave";
import { aveName } from "../../types";
import styles from "./styles.module.scss";
import Icon from '@mdi/react';
import { mdiLock } from '@mdi/js';
import { motion as m } from "motion/react";

type aveButtonProps = {
    ave: aveName
    onClick: () => void,
}

function AveButton({ave, onClick}: aveButtonProps) {
    const currentSave = useCurrentSave();
    const aveData = useAve(ave);

    const isAveUnlocked = currentSave?.isAveUnlocked(ave) === true;

    return (
        <m.button 
            className={styles.ave_button} 
            onClick={(isAveUnlocked) ? onClick : undefined} 
            data-locked={!isAveUnlocked}
            initial={{
                opacity: 0
            }}
            animate={{
                opacity: 1
            }}
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
        </m.button>
    )
}

export default AveButton;