import { createPortal } from "react-dom";
import { motion } from "motion/react";
import styles from "./styles.module.scss";

function PageTransition() {
    return (
        createPortal(
            (<motion.div
                className={styles.page_transition}
            ></motion.div>),
            document.body
        )
    )
}

export default PageTransition;