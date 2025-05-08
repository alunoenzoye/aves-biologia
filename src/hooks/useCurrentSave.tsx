import saveHandler from "../modules/saveHandler";

function useCurrentSave() {
    return saveHandler.getCurrentSave();
}

export default useCurrentSave;