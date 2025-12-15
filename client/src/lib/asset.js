    export const ASSET_BASE = (
    import.meta.env.VITE_API_BASE_URL ||
    import.meta.env.VITE_API_URL ||
    "http://localhost:5000"
    ).replace(/\/+$/, "");

    export function joinAsset(p) {
    if (!p) return "";
    let s = String(p).trim();
    if (/^https?:\/\//i.test(s)) return s;  
    if (!s.startsWith("/")) s = `/${s}`;   
    return `${ASSET_BASE}${s}`;
    }
