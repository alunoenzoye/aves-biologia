import { useMemo, useReducer } from "react";
import styles from "./styles.module.scss";
import { getAves } from "../../modules/dataFetcher";
import { aveName } from "../../types";
import AveButton from "../../components/AveButton";
import PageHeader from "../../components/PageHeader";
import useLoadedSave from "../../hooks/useLoadedSave";
import AveInfo from "../../components/AveInfo";

type catalogState = {
    selectedAve: aveName | null
}

type catalogAction = {
    type: "SELECT_AVE"
    ave: aveName | null
}

function reducer(state: catalogState, action: catalogAction) {
    const newState = {
        ...state
    }

    if (action.type === "SELECT_AVE") {
        newState.selectedAve = action.ave;
    }

    return newState
}

function CatalogPage() {
    useLoadedSave();

    const [state, dispatch] = useReducer(reducer, {
        selectedAve: null,
    });

    const aveButtons = useMemo(() => {
        const aves = getAves();
        return Object.keys(aves).map((key, index) => {
            const aveKey = key as aveName;

            return (
                <AveButton 
                    key={index}
                    ave={aveKey}
                    onClick={() => dispatch({
                        type: "SELECT_AVE",
                        ave: aveKey,
                    })}
                />
            )
        })
    }, [])

    return (
        <div className={styles.catalog_page}>
            <PageHeader 
                to="/"
                title="AveDex"
            />
            <div className={styles.catalog}>
                <div className={styles.aves_container}>
                    {aveButtons}
                </div>
                <div className={styles.info_container}>
                    <button onClick={() => dispatch({
                        type: "SELECT_AVE",
                        ave: null,
                    })}>Fechar</button>
                    <AveInfo 
                        ave={(state.selectedAve !== null) ? state.selectedAve : "pomba"}
                        visible={state.selectedAve !== null}
                    />
                </div>
            </div>
        </div>
    )
}

export default CatalogPage;