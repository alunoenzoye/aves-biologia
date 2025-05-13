import saveHandler from "../../modules/saveHandler";
import { saveSlots } from "../../types";

type saveViewProps = {
    selectedSlot: saveSlots,
    onDelete: () => void,
    onPickSave: () => void,
}

function SaveView({selectedSlot, onDelete, onPickSave}: saveViewProps) {
    const saveOnSlot = saveHandler.getSaveOnSlot(selectedSlot);

    return (
        <div>
            {(saveOnSlot === null) ? (
                <span>Save vazio</span>
            ) : (
                <div>
                    <h1>{saveOnSlot.getName()}</h1>
                    <button onClick={onDelete}>Apagar save</button>
                    <button onClick={onPickSave}>Selecionar</button>
                </div>
            )}
        </div>
    )
}

export default SaveView;