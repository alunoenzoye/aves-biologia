import useAve from "../../hooks/useAve";
import { aveName } from "../../types";
import styles from "./styles.module.scss";

type aveInfoProps = {
    ave: aveName,
    visible: boolean
}

function AveInfo({ave, visible}: aveInfoProps) {
    const aveData = useAve(ave);

    if (!visible) {
        return;
    }

    return (
        <div className={styles.ave_info}>
            <div className={styles.ave_title}>
                <h1>{aveData.displayName}</h1>
                <span>{aveData.scientificName}</span>
            </div>

            <img src={aveData.imagePath} alt="" />

            <div className={styles.statistics}>
                <span>Altura: {aveData.height}cm</span>
                <span>Massa: {aveData.mass}kg</span>
                <span>Habitat: {aveData.habitat}</span>
                <span>Alimentação: {aveData.diet}</span>
            </div>

            <p>{aveData.description}</p>

        </div>
    ) 
}

export default AveInfo;