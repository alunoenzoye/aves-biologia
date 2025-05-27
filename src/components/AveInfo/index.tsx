import useAve from "../../hooks/useAve";
import { aveName } from "../../types";
import styles from "./styles.module.scss";
import Icon from '@mdi/react';
import { mdiArrowLeft, mdiWeight, mdiForest, mdiRuler, mdiSilverwareForkKnife } from '@mdi/js';
import AveInfoField from "../AveInfoField";


type aveInfoProps = {
    ave: aveName,
    onClose: () => void,
}

function AveInfo({ave, onClose}: aveInfoProps) {
    const aveData = useAve(ave);

    return (
        <div className={styles.ave_info}>
            <div className={styles.ave_info_header}>
                <button 
                    className={styles.ave_info_back_btn}
                    onClick={onClose}
                >
                    <Icon 
                        path={mdiArrowLeft}
                        size={"2rem"}
                        color={"#2B2B34"}
                    />
                </button>
                <div className={styles.ave_info_icon}>
                    <img src={aveData.imagePath} alt={aveData.displayName} />
                </div>
            </div>
            <div className={styles.ave_info_content}>
                <div className={styles.ave_info_description}>
                    <h1>{aveData.displayName}</h1>
                    <h2>{aveData.scientificName}</h2>
                    <p>{aveData.description}</p>
                </div>
                <div className={styles.ave_info_data}>
                    <AveInfoField 
                        title="MASSA"
                        content={`${aveData.mass} kg`}
                        iconPath={mdiWeight}
                    />
                    <AveInfoField 
                        title="ALTURA"
                        content={`${aveData.height} cm`}
                        iconPath={mdiRuler}
                    />
                    <AveInfoField 
                        title="HABITAT"
                        content={aveData.habitat}
                        iconPath={mdiForest}
                    />
                    <AveInfoField 
                        title="DIETA"
                        content={aveData.diet}
                        iconPath={mdiSilverwareForkKnife}
                    />
                </div>
            </div>
        </div>
    ) 
}

export default AveInfo;