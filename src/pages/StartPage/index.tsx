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
            {selectedSlot === null ? (
                <p>Nenhum save selecionado</p>
            ) : (
                <div>
                    <button onClick={() => setSelectedSlot(null)}>Voltar</button>
                    {saveOnSlot === null ? (
                        <div>
                            <h1>Criar Save</h1>
                            <button onClick={() => saveHandler.createSaveInCurrentSlot("nome teste")}>Criar save</button>
                        </div>
                    ) : (
                        <div>
                            Informacao do save
                            <button onClick={() => {
                                saveOnSlot.delete();
                                setSelectedSlot(null);
                            }}>Apagar</button>
                        </div>
                    )}
                </div>
            )}
            <div className={styles.save_slots}>
                <button onClick={() => selectSlot("1")}>Save 1</button>
                <button onClick={() => selectSlot("2")}>Save 2</button>
                <button onClick={() => selectSlot("3")}>Save 3</button>
            </div>
        </div>
    )
}

export default StartPage;