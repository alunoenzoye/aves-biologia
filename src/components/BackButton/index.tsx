import styles from './styles.module.scss';
import { Link } from "react-router";
import leftArrow from "../../assets/icons/arrow-left-circle.svg";

export type backButtonProps = {
    to: string
}

export function BackButton({to}: backButtonProps) {
    return (
        <Link to={to} className={styles.back_btn}>
            <img src={leftArrow} alt="" draggable="false" />
        </Link>
    )
}

export default BackButton;