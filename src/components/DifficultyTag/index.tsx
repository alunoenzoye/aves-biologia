import styles from './styles.module.css';

const Difficulties = {
    Easy: {
        className: styles.easy_tag,
        text: "Fácil"
    },
    Medium: {
        className: styles.medium_tag,
        text: "Normal"
    },
    Hard: {
        className: styles.hard_tag,
        text: "Difícil"
    },
};

export type difficulties = keyof typeof Difficulties;

export type difficultyTagProps = {difficulty: difficulties};

export function DifficultyTag({difficulty}: difficultyTagProps) {
    const difficultyClass = Difficulties[difficulty].className;
    const difficultyText = Difficulties[difficulty].text;

    return (
        <span className={`${styles.difficulty_tag} ${difficultyClass}`}>{difficultyText}</span>
    )
}

export default DifficultyTag;