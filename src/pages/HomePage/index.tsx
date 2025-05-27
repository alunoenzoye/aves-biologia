import { Link } from 'react-router';
import styles from './styles.module.scss';
import useLoadedSave from '../../hooks/useLoadedSave';
import saveHandler from '../../modules/saveHandler';
import useForceUpdate from '../../hooks/useForceUpdate';
import { motion as m } from 'motion/react';

const hoverButtonState = {
    scale: 1.1
}

const tapButtonState = {
    scale: 0.9
}

function HomePage() {
    useLoadedSave();

    const forceUpdate = useForceUpdate();

    return (
        <div className={styles.page_container}>
            <m.h1 
                className={styles.game_title}
                initial={{
                    scale: 0,
                }}
                animate={{
                    scale: 1,
                }}
            >
                Quiz das Aves
            </m.h1>
            <div className={styles.game_btns}>
                <m.div 
                    className={styles.home_btn}
                    whileHover={hoverButtonState}
                    whileTap={tapButtonState}
                >
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
                </m.div>
                <m.div 
                    className={styles.home_btn}
                    whileHover={hoverButtonState}
                    whileTap={tapButtonState}
                >
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
                </m.div>
                <div className={styles.home_btn}>
                    <m.button 
                        className={styles.home_btn_link} 
                        onClick={() => {
                            saveHandler.selectSlot(null);
                            forceUpdate();
                        }}
                        whileHover={hoverButtonState}
                        whileTap={tapButtonState}
                    >
                        <div>
                            <div>
                                <span>SAIR</span>
                            </div>
                        </div>
                    </m.button>
                </div>
            </div>
        </div>
    )
}

export default HomePage;