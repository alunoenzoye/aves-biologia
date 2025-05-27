import { saveSlot } from "../../types";
import SaveSlot from "../SaveSlot";
import styles from "./styles.module.scss";

interface saveSwitcherProps {
    slots: saveSlot[]
    selectedSlot: saveSlot | null,
    onSwitch: (saveSlot: saveSlot | null) => void,
    onCreate: (name: string) => void,
    onPlay: () => void,
    onDelete: () => void,
}

function SaveSwitcher({slots, selectedSlot, onSwitch, onPlay, onDelete, onCreate}: saveSwitcherProps) {
    return (
        <div className={styles.save_switcher}>
            {slots.map((slot, index) => 
                <SaveSlot 
                    key={index}
                    onClick={() => onSwitch(slot)}
                    onDelete={onDelete}
                    onCreate={onCreate}
                    onPlay={onPlay}
                    slot={slot}
                    selected={selectedSlot === slot}
                />
            )}
        </div>
    )
}

export default SaveSwitcher;