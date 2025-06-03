import styles from "./styles.module.scss";
import cloudsBg from "../../assets/img/bg-clouds.jpg";
import Icon from "@mdi/react";
import { mdiBird } from "@mdi/js";
import { getAves } from "../../modules/dataFetcher";
import { useMemo } from "react";
import { motion as m } from "motion/react";

const totalAves = Object.keys(getAves()).length;

interface saveDataProps {
    unlockedAves: number,
    active: boolean,
    onPlay: () => void,
    onDelete: () => void
}

function SaveData({ unlockedAves, onDelete, onPlay, active }: saveDataProps) {
    const badges = useMemo(() => {
        const children = [];

        for (let i = 1; i <= totalAves; i++) {
            children.push(
                <m.ul 
                    className={styles.bird_badge} 
                    key={i}
                    initial={{
                        opacity: 0,
                        translateY: "10px"
                    }}
                    animate={{
                        opacity: 1,
                        translateY: 0,
                    }}
                    transition={{
                        delay: 0.025 * i
                    }}
                >
                    <Icon
                        className={styles.bird_icon_bg}
                        path={mdiBird}
                        color={'#2B2B34'}
                        size={"1.5rem"}
                    />
                    {(i <= unlockedAves) && (
                        <Icon
                            className={styles.bird_icon}
                            path={mdiBird}
                            color={'#FFDE5B'}
                            size={"1.25rem"}
                        />
                    )}
                </m.ul>
            )
        }

        return children;
    }, [unlockedAves])


    return (
        <div className={styles.save_data}>
            <div className={styles.bird_list_container}>
                <ul 
                    className={styles.bird_list} 
                    style={{
                        backgroundImage: `url(${cloudsBg})`
                    }}
                >
                    {badges}
                </ul>
            </div>
            {active && (
                <div className={styles.btns_container}>
                    <button 
                        className={styles.play_btn} 
                        onClick={onPlay}
                    >
                        JOGAR
                    </button>
                    <button 
                        className={styles.delete_btn} 
                        onClick={() => {
                            const confirmed = confirm("Você tem certeza que quer apagar este jogador? Essa ação não pode ser desfeita.");

                            if (confirmed) {
                                onDelete();
                            }
                        }}
                    >
                        DELETAR
                    </button>
                </div>
            )}
        </div>
    )
}

export default SaveData;