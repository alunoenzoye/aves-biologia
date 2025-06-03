export default function getTimeMMSS(time: number) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time - (minutes * 60));

    let formattedSeconds = seconds.toString();

    if (formattedSeconds.length < 2) {
        formattedSeconds = "0" + formattedSeconds;
    }

    return `${minutes}:${formattedSeconds}`
}