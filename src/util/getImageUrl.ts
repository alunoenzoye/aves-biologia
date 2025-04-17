export default (path: string) => {
    return new URL(`src/assets/${path}.jpg`, new URL(import.meta.url).origin).href;
}