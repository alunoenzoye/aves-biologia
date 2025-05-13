import { Link } from 'react-router';
import styles from './styles.module.scss';
import useLoadedSave from '../../hooks/useLoadedSave';
import saveHandler from '../../modules/saveHandler';
import useForceUpdate from '../../hooks/useForceUpdate';

function HomePage() {
    useLoadedSave();

    const forceUpdate = useForceUpdate();

    return (
        <div className={styles.page_container}>
            <div className={styles.game_start_container}>
                <h1 className="game_title">Quiz das Aves</h1>
                <div className={styles.game_btns}>
                    <Link to="/quiz-select" className={styles.game_btn}>Jogar</Link>
                    <Link to="/catalog" className={styles.game_btn}>Catálogo</Link>
                    <button className={styles.game_btn} onClick={() => {
                        saveHandler.selectSlot(null);
                        forceUpdate();
                    }}>Sair</button>
                </div>
            </div>
        </div>
    )
}

export default HomePage;