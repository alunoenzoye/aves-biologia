import { useSpring } from "motion/react";
import saveHandler from "../../modules/saveHandler";
import { saveSlot } from "../../types";
import SaveCreator from "../SaveCreator";
import SaveData from "../SaveData";
import styles from "./styles.module.scss";
import { motion as m } from "motion/react";

interface saveSlotProps {
    selected: boolean,
    slot: saveSlot,
    onClick: () => void,
    onDelete: () => void,
    onPlay: () => void,
    onCreate: (name: string) => void,
    index: number
}

function SaveSlot({selected, slot, onClick, onCreate, onDelete, onPlay, index}: saveSlotProps) {
    const slotData = saveHandler.getSaveOnSlot(slot);

    return (
        <div 
            onClick={() => onClick()} 
            className={styles.save_slot} 
            data-selected={selected}
            data-empty-slot={slotData === null}
        >
            <div className={styles.header}>
                <div className={styles.slot_number_container}>
                    <span className={styles.slot_number}>{slot}</span>
                </div>
                <h1 className={styles.slot_name}>
                    {slotData === null ? "VAZIO" : slotData.getName()}
                </h1>
            </div>
            {(slotData === null) ? (
                <SaveCreator 
                    visible={selected}
                    onCreate={onCreate}
                />
            ) : (
                <SaveData 
                    active={selected}
                    unlockedAves={slotData?.getUnlockedAves().length}
                    onDelete={onDelete}
                    onPlay={onPlay}
                />
            )}
        </div>
    )
}

export default SaveSlot;