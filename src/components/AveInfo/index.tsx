import useAve from "../../hooks/useAve";
import { aveName } from "../../types";
import styles from "./styles.module.scss";
import Icon from '@mdi/react';
import { mdiArrowLeft, mdiWeight, mdiForest, mdiRuler, mdiSilverwareForkKnife } from '@mdi/js';
import AveInfoField from "../AveInfoField";
import { motion as m } from "motion/react";

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
                    <m.h1
                        transition={{
                            delay: 0.1
                        }}
                        initial={{
                            opacity: 0,
                            translateX: 10,
                        }} 
                        animate={{
                            opacity: 1,
                            translateX: 0,
                        }} 
                    >{aveData.displayName}</m.h1>
                    <m.h2
                        transition={{
                            delay: 0.2
                        }}
                        initial={{
                            opacity: 0,
                            translateX: 20,
                        }} 
                        animate={{
                            opacity: 1,
                            translateX: 0,
                        }} 
                    >{aveData.scientificName}</m.h2>
                    <m.p
                        transition={{
                            delay: 0.3
                        }}
                        initial={{
                            opacity: 0,
                            translateY: 20,
                        }} 
                        animate={{
                            opacity: 1,
                            translateY: 0,
                        }} 
                    >{aveData.description}</m.p>
                </div>
                <div className={styles.ave_info_data}>
                    <AveInfoField 
                        title="MASSA"
                        content={aveData.mass}
                        iconPath={mdiWeight}
                    />
                    <AveInfoField 
                        title="ALTURA"
                        content={aveData.height}
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