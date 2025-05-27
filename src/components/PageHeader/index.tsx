import { Link } from "react-router";
import styles from "./styles.module.scss";
import Icon from '@mdi/react';
import { mdiArrowLeft } from '@mdi/js';
import { motion as m } from "motion/react";

export type pageHeaderProps = {
    to: string,
    title: string
}

function PageHeader({to, title}: pageHeaderProps) {
    return (
        <div className={styles.page_header}>
            <m.div 
                className={styles.page_header_back_btn}
                animate={{
                    translateX: "0",
                    opacity: 1,
                }}
                initial={{
                    translateX: "40px",
                    opacity: 0,
                }}
                transition={{
                    delay: 0.05
                }}
            >
                <Link 
                    to={to}
                    className={styles.back_link_container}
                >
                    <Icon 
                        path={mdiArrowLeft}
                        size={"2rem"}
                        color={"#2B2B34"}
                    />
                </Link>
            </m.div>
            <m.h1 
                className={styles.page_header_title}
                animate={{
                    translateX: "0",
                    opacity: 1,
                }}
                initial={{
                    translateX: "40px",
                    opacity: 0,
                }}
            >
                    {title}
            </m.h1>
        </div>
    )
}

export default PageHeader;