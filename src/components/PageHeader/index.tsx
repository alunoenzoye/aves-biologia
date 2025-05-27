import { Link } from "react-router";
import styles from "./styles.module.scss";
import Icon from '@mdi/react';
import { mdiArrowLeft } from '@mdi/js';

export type pageHeaderProps = {
    to: string,
    title: string
}

function PageHeader({to, title}: pageHeaderProps) {
    return (
        <div className={styles.page_header}>
            <div className={styles.page_header_back_btn}>
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
            </div>
            <h1 className={styles.page_header_title}>{title}</h1>
        </div>
    )
}

export default PageHeader;