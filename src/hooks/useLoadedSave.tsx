import { useNavigate } from "react-router";
import { useEffect } from "react";
import useCurrentSave from "./useCurrentSave";

function useLoadedSave() {
    const navigate = useNavigate();
    const currentSave = useCurrentSave();

    useEffect(() => {
        if (currentSave === null) {
            navigate('/');
        };
    }, [navigate, currentSave]);
}

export default useLoadedSave;