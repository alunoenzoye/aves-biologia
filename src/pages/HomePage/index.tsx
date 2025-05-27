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
            <h1 className={styles.game_title}>Quiz das Aves</h1>
            <div className={styles.game_btns}>
                <div className={styles.home_btn}>
                    <Link 
                        to="/quiz-select" 
                        style={{textDecoration: "none"}}
                        className={styles.home_btn_link}
                    >
                        <div>
                            <div>
                                <span>JOGAR</span>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className={styles.home_btn}>
                    <Link 
                        to="/avedex" 
                        style={{textDecoration: "none"}}
                        className={styles.home_btn_link}
                    >
                        <div>
                            <div>
                                <span>AVEDEX</span>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className={styles.home_btn}>
                    <button className={styles.home_btn_link} onClick={() => {
                        saveHandler.selectSlot(null);
                        forceUpdate();
                    }}>
                        <div>
                            <div>
                                <span>SAIR</span>
                            </div>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default HomePage;