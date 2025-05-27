import { ChangeEvent, FormEvent, useState } from "react";
import styles from "./styles.module.scss";

const NAME_MAX_LENGTH = 30;

interface saveCreatorProps {
    onCreate: (name: string) => void,
    visible: boolean
}

function SaveCreator({onCreate, visible}: saveCreatorProps) {
    const [playerName, setPlayerName] = useState("");

    if (!visible) {
        return;
    }

    const updatePlayerName = (e: ChangeEvent<HTMLInputElement>) => {
        let newValue = e.target.value;
        newValue = (newValue.length > NAME_MAX_LENGTH) ? newValue.substring(0, NAME_MAX_LENGTH) : newValue;

        setPlayerName(newValue);
    }

    const validateCreation = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (playerName.trim().length > 0) {
            onCreate(playerName);
        }
    }

    return (
        <div className={styles.save_creator}>
            <form className={styles.save_creator_form} onSubmit={validateCreation}>
                <input 
                    className={styles.save_creator_name_field}
                    type="text"
                    value={playerName}
                    onChange={updatePlayerName}
                    placeholder="Digite o nome"
                />
                <button className={styles.save_creator_btn}>Criar</button>
            </form>
        </div>
    )
}

export default SaveCreator;