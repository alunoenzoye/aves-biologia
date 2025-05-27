import {BackButton, backButtonProps} from "../BackButton";
import styles from "./styles.module.scss";

export type pageHeaderProps = {
    title: string
} & backButtonProps;

function PageHeader({to, title}: pageHeaderProps) {
    return (
        <div className={styles.header}>
            <BackButton to={to} />
            <div className={styles.center_title}>
                <span className={styles.header_title}>{title}</span>
            </div>
        </div>
    )
}

export default PageHeader;