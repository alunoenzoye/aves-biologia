import styles from "./styles.module.scss";
import Icon from '@mdi/react';

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
                <span>{content}</span>
            </div>
        </div>
    )
}

export default AveInfoField;