import { useCallback, useReducer, useState } from "react";
import styles from "./styles.module.scss";
import saveHandler from "../../modules/saveHandler";
import { saveSlots } from "../../types";

// todo: refactor component to use reducers, simplyfing logic and allowing for rerenders when needed.

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
    }

    return {
        ...state
    }
}

function StartPage() {
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
                        <div>
                            <h1>Criar Save</h1>
                            <button onClick={() => dispatch({
                                type: "CREATE",
                                name: "teste"
                            })}>Criar save</button>
                        </div>
                    ) : (
                        <div>
                            Informacao do save
                            {saveHandler.getSaveOnSlot(state.selectedSlot)?.getName()}
                            <button onClick={() => dispatch({
                                type: "DELETE",
                            })}>Apagar</button>
                        </div>
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