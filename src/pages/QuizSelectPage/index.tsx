import QuizSelect from '../../components/QuizSelect';
import styles from './styles.module.css';

const StartPage = () => {
    return (
        <div className={styles.page_container}>
            <div className={styles.game_start_container}>
                <h1 className="game_title">Selecione o quiz</h1>
                <div className={styles.game_btns}>
                    <QuizSelect 
                        title={"Sla vey"} 
                        difficulty={"Medium"} 
                        totalQuestions={10}                    
                    />
                </div>
            </div>
        </div>
    )
}

export default StartPage;