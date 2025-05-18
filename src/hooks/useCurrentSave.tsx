import { useMemo } from "react";
import saveHandler from "../modules/saveHandler";

function useCurrentSave() {
    const currentSlot = saveHandler.getCurrentSlot();

    return useMemo(() => {
        return saveHandler.getCurrentSave();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentSlot])
}

export default useCurrentSave;