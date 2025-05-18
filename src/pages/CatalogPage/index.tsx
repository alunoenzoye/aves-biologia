import { useMemo, useReducer, useState } from "react";
import styles from "./styles.module.scss";
import { getAve, getAves } from "../../modules/dataFetcher";
import { aveName } from "../../types";
import AveButton from "../../components/AveButton";
import PageHeader from "../../components/PageHeader";
import useLoadedSave from "../../hooks/useLoadedSave";
import AveInfo from "../../components/AveInfo";
import useCurrentSave from "../../hooks/useCurrentSave";
import CatalogFilter, { catalogFilters } from "../../components/CatalogFilter";

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

    const currentSave = useCurrentSave();

    const [filter, setFilter] = useState({
        search: "",
        statusFilter: "none"
    } as catalogFilters)
    const [state, dispatch] = useReducer(reducer, {
        selectedAve: null,
    });

    const aveButtons = useMemo(() => {
        const aves = getAves();
        return Object.keys(aves).filter((key) => {
            if (currentSave === null) {
                return true;
            }

            const aveKey = key as aveName;
            const aveData = getAve(aveKey);

            let include = true;

            if (filter.search.length > 0) {
                const regex = new RegExp(filter.search, 'i');

                include = (aveData.displayName.search(regex) === -1) ? false : true;
            }

            switch (filter.statusFilter) {
                case "locked":
                    include = (!currentSave.isAveUnlocked(aveKey));
                    break;
                case "unlocked":
                    include = (currentSave.isAveUnlocked(aveKey));
                    break;
                default:
                    break;
            }

            return include;
        })
        .map((key, index) => {
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
    }, [currentSave, filter])

    return (
        <div className={styles.catalog_page}>
            <PageHeader 
                to="/"
                title="AveDex"
            />
            <div className={styles.catalog}>
                <CatalogFilter 
                    onSubmit={(newFilter) => setFilter(newFilter)}
                />
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