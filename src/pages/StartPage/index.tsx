import { useEffect, useReducer } from "react";
import styles from "./styles.module.scss";
import saveHandler from "../../modules/saveHandler";
import { saveSlots } from "../../types";
import SaveCreator from "../../components/SaveCreator";
import SaveView from "../../components/SaveView";
import { useNavigate } from "react-router";
import useCurrentSave from "../../hooks/useCurrentSave";

// todo: refactor this page component into three components such: SaveSwitcher, SaveCreator e SaveView .

type pageState = {
    selectedSlot: saveSlots | null,
}

type saveAction = {
    type: "SELECT",
    slot: saveSlots | null
} | {
    type: "CREATE",
    name: string,
} | {
    type: "DELETE"
} | {
    type: "PICK_SAVE"
};

function reducer(state: pageState, action: saveAction) {
    const currentSave = saveHandler.getCurrentSave();

    if (action.type === "CREATE") {
        if (currentSave === null && state.selectedSlot !== null) {
            saveHandler.createSaveInSlot(action.name, state.selectedSlot);
        }
    } else if (action.type === "SELECT") {
        return {
            selectedSlot: action.slot
        }
    } else if (action.type === "DELETE") {
        if (state.selectedSlot !== null) {
            saveHandler.getSaveOnSlot(state.selectedSlot)?.delete();

            return {
                selectedSlot: null
            }
        }
    } else if (action.type === "PICK_SAVE") {
        if (state.selectedSlot !== null) {
            saveHandler.selectSlot(state.selectedSlot)
            return {
                selectedSlot: null
            }
        }
    }

    return {
        ...state
    }
}

function StartPage() {
    const navigate = useNavigate();
    const loadedSave = useCurrentSave();

    useEffect(() => {
        if (loadedSave !== null) {
            navigate('/home')
        }
    }, [navigate, loadedSave])

    const [state, dispatch] = useReducer(reducer, {
        selectedSlot: null,
    })

    return (
        <div className={styles.start_page}>
            {state.selectedSlot === null ? (
                <p>Nenhum save selecionado</p>
            ) : (
                <div>
                    <button onClick={() => dispatch({
                        type: "SELECT",
                        slot: null
                    })}>Voltar</button>
                    {saveHandler.getSaveOnSlot(state.selectedSlot) === null ? (
                        <SaveCreator 
                            onCreate={(name) => dispatch({
                                type: "CREATE",
                                name: name
                            })} 
                        />
                    ) : (
                        <SaveView 
                            selectedSlot={state.selectedSlot}
                            onPickSave={() => dispatch({
                                type: "PICK_SAVE",
                            })}
                            onDelete={() => dispatch({
                                type: "DELETE",
                            })}
                        />
                    )}
                </div>
            )}
            <div className={styles.save_slots}>
                <button onClick={() => dispatch({
                    type: "SELECT",
                    slot: "1",
                })}>Save 1</button>
                <button onClick={() => dispatch({
                    type: "SELECT",
                    slot: "2",
                })}>Save 2</button>
                <button onClick={() => dispatch({
                    type: "SELECT",
                    slot: "3",
                })}>Save 3</button>
            </div>
        </div>
    )
}

export default StartPage;