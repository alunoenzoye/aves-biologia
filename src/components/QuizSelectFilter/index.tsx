import styles from "./styles.module.scss";

interface quizSelectFilters {
    search: string,
    statusFilter: "none" | "locked" | "unlocked" | "completed"
}

interface quizSelectFilterProps {
    onSubmit: (filters: quizSelectFilters) => void,
}

function QuizSelectFilter({onSubmit}: quizSelectFilterProps) {
    return (
        <div className={styles.filter_bar}>
            <form onSubmit={onSubmit}>
                <label>
                    Filtro:
                    <select 
                        name="quizFilter" 
                        defaultValue={"none"}
                    >
                        <option value="none">Nenhum</option>
                        <option value="locked">Bloqueados</option>
                        <option value="unlocked">Desbloqueados</option>
                        <option value="completed">Completados</option>
                    </select>
                </label>
                <label>
                    Pesquisar:
                    <input type="text" value={} />
                </label>
            </form>
        </div>
    )
}

export default QuizSelectFilter;