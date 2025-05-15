import { ChangeEvent, useState } from "react";

const NAME_MAX_LENGTH = 30;

type saveCreatorProps = {
    onCreate: (name: string) => void
}

function SaveCreator({onCreate}: saveCreatorProps) {
    const [playerName, setPlayerName] = useState("");

    const updatePlayerName = (e: ChangeEvent<HTMLInputElement>) => {
        let newValue = e.target.value;
        newValue = (newValue.length > NAME_MAX_LENGTH) ? newValue.substring(0, NAME_MAX_LENGTH) : newValue;

        setPlayerName(newValue);
    }

    const validateCreation = () => {
        if (playerName.trim().length > 0) {
            onCreate(playerName);
        }
    }

    return (
        <form onSubmit={validateCreation}>
            <label>
                Nome: <input 
                    type="text"
                    value={playerName}
                    onChange={updatePlayerName}
                />
            </label>
            <button>Criar</button>
        </form>
    )
}

export default SaveCreator;