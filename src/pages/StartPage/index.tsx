import { useEffect, useReducer } from "react";
import styles from "./styles.module.scss";
import saveHandler from "../../modules/saveHandler";
import { saveSlot } from "../../types";
import { useNavigate } from "react-router";
import useCurrentSave from "../../hooks/useCurrentSave";
import SaveSwitcher from "../../components/SaveSwitcher";

type pageState = {
    selectedSlot: saveSlot | null,
}

type saveAction = {
    type: "SELECT",
    slot: saveSlot | null
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
            <h1 className={styles.start_page_title}>
                NOVO JOGO
            </h1>
            <div className={styles.saves_card}>
                <SaveSwitcher 
                    slots={["1", "2", "3"]}
                    selectedSlot={state.selectedSlot}
                    onSwitch={(slot) => dispatch({
                        type: "SELECT",
                        slot: slot
                    })}
                    onPlay={onPickSave}
                    onDelete={onDelete}
                    onCreate={onCreate}
                />
            </div>
        </div>
    )
}

export default StartPage;