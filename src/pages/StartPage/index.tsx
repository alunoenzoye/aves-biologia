import { useEffect, useReducer } from "react";
import styles from "./styles.module.scss";
import saveHandler from "../../modules/saveHandler";
import { saveSlots } from "../../types";
import SaveCreator from "../../components/SaveCreator";
import SaveView from "../../components/SaveView";
import { useNavigate } from "react-router";
import useCurrentSave from "../../hooks/useCurrentSave";


type pageState = {
    selectedSlot: saveSlots | null,
}

type saveAction = {
    type: "SELECT",
    slot: saveSlots | null
} | {
    type: "CREATE",
} | {
    type: "DELETE"
} | {
    type: "PICK_SAVE"
};

function reducer(state: pageState, action: saveAction) {
    if (action.type === "SELECT") {
        return {
            selectedSlot: action.slot
        }
    } else if (action.type === "DELETE") {
        if (state.selectedSlot !== null) {
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

    const onCreate = (name: string) => {
        if (loadedSave === null && state.selectedSlot !== null) {
            saveHandler.createSaveInSlot(name, state.selectedSlot);
        }

        dispatch({
            type: "CREATE"
        });
    }

    const onPickSave = () => {
        if (state.selectedSlot !== null) {
            saveHandler.selectSlot(state.selectedSlot);
        }

        dispatch({
            type: "PICK_SAVE"
        });
    }

    const onDelete = () => {
        if (state.selectedSlot !== null) {
            saveHandler.getSaveOnSlot(state.selectedSlot)?.delete();

            dispatch({
                type: "DELETE"
            });
        }
    }

    return (
        <div className={styles.start_page}>
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
                            onCreate={onCreate} 
                        />
                    ) : (
                        <SaveView 
                            selectedSlot={state.selectedSlot}
                            onPickSave={onPickSave}
                            onDelete={onDelete}
                        />
                    )}
                </div>
            )}
        </div>
    )
}

export default StartPage;