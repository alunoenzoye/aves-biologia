import { useState } from "react";
import styles from "./styles.module.scss";
import Icon from '@mdi/react';
import { mdiMagnify } from '@mdi/js';

type catalogStatusFilters = "none" | "locked" | "unlocked"

export interface catalogFilters {
    search: string,
    statusFilter: catalogStatusFilters
}

interface catalogFilterProps {
    onSubmit: (filters: catalogFilters) => void,
}

function CatalogFilter({onSubmit}: catalogFilterProps) {
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("none");

    return (
        <div className={styles.catalog_filter}>
            <form onSubmit={(e) => {
                e.preventDefault();

                onSubmit({
                    search: search,
                    statusFilter: statusFilter as catalogStatusFilters,
                })
            }}>
                <div className={styles.catalog_filter_search_bar}>
                    <label
                        className={styles.catalog_filter_search}
                    >
                        <Icon 
                            path={mdiMagnify}
                            color={"#FFF7EB"}
                            size={"1.5rem"}
                        />
                        <input 
                            type="search" 
                            value={search} 
                            className={styles.catalog_filter_search_input}
                            placeholder="Pesquisar"
                            onChange={(e) => {
                                setSearch(e.target.value);
                            }}
                        />
                    </label>
                    <select 
                        className={styles.catalog_filter_select}
                        value={statusFilter}
                        onChange={(e) => {
                            setStatusFilter(e.target.value)

                            onSubmit({
                                search: search,
                                statusFilter: e.target.value as catalogStatusFilters,
                            })
                        }}
                    >
                        <option value="none" data-selected={statusFilter === "none"}>Nenhum</option>
                        <option value="locked" data-selected={statusFilter === "locked"}>Bloqueados</option>
                        <option value="unlocked" data-selected={statusFilter === "unlocked"}>Desbloqueados</option>
                    </select>
                </div>
            </form>
        </div>
    )
}

export default CatalogFilter;