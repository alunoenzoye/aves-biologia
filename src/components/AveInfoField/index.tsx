import styles from "./styles.module.scss";
import Icon from '@mdi/react';
import { motion as m } from "motion/react";

interface aveInfoFieldProps {
    iconPath: string,
    title: string,
    content: string
}

function AveInfoField({iconPath, title, content}: aveInfoFieldProps) {
    return (
        <div className={styles.ave_info_data}>
            <div className={styles.ave_info_data_title}>
                <Icon 
                    path={iconPath}
                    size={"1.5rem"}
                    color={"#847E7C"}
                />
                <span>{title}</span>
            </div>
            <div className={styles.ave_info_data_field}>
                <m.span
                    transition={{
                        delay: 0.4
                    }}
                    initial={{
                        translateY: 10,
                        opacity: 0
                    }}
                    animate={{
                        translateY: 0,
                        opacity: 1
                    }}
                >{content}</m.span>
            </div>
        </div>
    )
}

export default AveInfoField;