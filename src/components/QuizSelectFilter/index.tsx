import { useState } from "react";
import styles from "./styles.module.scss";
import Icon from '@mdi/react';
import { mdiMagnify } from '@mdi/js';

type quizStatusFilter = "none" | "locked" | "unlocked" | "completed";

export interface quizSelectFilters {
    search: string,
    statusFilter: quizStatusFilter
}

interface quizSelectFilterProps {
    onSubmit: (filters: quizSelectFilters) => void,
}

function QuizSelectFilter({onSubmit}: quizSelectFilterProps) {
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("none");

    return (
        <div className={styles.quiz_select_filter}>
            <form onSubmit={(e) => {
                e.preventDefault();

                onSubmit({
                    search: search,
                    statusFilter: statusFilter as quizStatusFilter,
                })
            }}>
                <div className={styles.quiz_select_filter_search_bar}>
                    <label
                        className={styles.quiz_select_filter_search}
                    >
                        <Icon 
                            path={mdiMagnify}
                            color={"#FFF7EB"}
                            size={"1.5rem"}
                        />
                        <input 
                            type="search" 
                            value={search} 
                            className={styles.quiz_select_filter_search_input}
                            placeholder="Pesquisar"
                            onChange={(e) => {
                                setSearch(e.target.value);
                            }}
                        />
                    </label>
                    <select 
                        className={styles.quiz_select_filter_select}
                        value={statusFilter}
                        onChange={(e) => {
                            setStatusFilter(e.target.value)

                            onSubmit({
                                search: search,
                                statusFilter: e.target.value as quizStatusFilter,
                            })
                        }}
                    >
                        <option value="none" data-selected={statusFilter === "none"}>Nenhum</option>
                        <option value="locked" data-selected={statusFilter === "locked"}>Bloqueados</option>
                        <option value="unlocked" data-selected={statusFilter === "unlocked"}>Desbloqueados</option>
                        <option value="completed" data-selected={statusFilter === "completed"}>Completos</option>
                    </select>
                </div>
            </form>
        </div>
    )
}

export default QuizSelectFilter;