export default (path: string) => {
    return new URL(`src/assets/${path}.png`, new URL(import.meta.url).origin).href;
}