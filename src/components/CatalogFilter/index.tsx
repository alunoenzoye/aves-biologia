import { useState } from "react";
import styles from "./styles.module.scss";

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
        <div className={styles.filter_bar}>
            <form onSubmit={(e) => {
                e.preventDefault();

                onSubmit({
                    search: search,
                    statusFilter: statusFilter as catalogStatusFilters,
                })
            }}>
                <label>
                    Filtro:
                    <select 
                        value={statusFilter}
                        onChange={(e) => {
                            setStatusFilter(e.target.value)

                            onSubmit({
                                search: search,
                                statusFilter: e.target.value as catalogStatusFilters,
                            })
                        }}
                    >
                        <option value="none">Nenhum</option>
                        <option value="locked">Bloqueados</option>
                        <option value="unlocked">Desbloqueados</option>
                    </select>
                </label>
                <label>
                    Pesquisar:
                    <input 
                        type="text" 
                        value={search} 
                        onChange={(e) => {
                            setSearch(e.target.value);
                        }}
                    />
                </label>
                <button>Ola</button>
            </form>
        </div>
    )
}

export default CatalogFilter;