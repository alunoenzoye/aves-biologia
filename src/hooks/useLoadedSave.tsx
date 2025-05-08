import { useNavigate } from "react-router";
import saveHandler from "../modules/saveHandler";
import { useEffect } from "react";

function useLoadedSave() {
    const navigate = useNavigate();

    useEffect(() => {
        if (saveHandler.getCurrentSave() === null) {
            navigate('/');
        };
    }, [navigate]);

}

export default useLoadedSave;