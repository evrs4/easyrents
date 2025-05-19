export default function getStaticAsset(name = '') {
    return new URL(`/src/assets/${name}`, import.meta.url).href;
}