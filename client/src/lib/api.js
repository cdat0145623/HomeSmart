export const API_BASE = (
import.meta.env.VITE_API_BASE_URL ||
import.meta.env.VITE_API_URL ||
"http://localhost:5000"
).replace(/\/$/, "");

export async function api(path, { 
method = "GET",
body,
data,
query,
withCred = true,
headers = {}
} = {}) {

const url = new URL(path.startsWith("/") ? path.slice(1) : path, API_BASE + "/");

if (query && typeof query === "object") {
    Object.entries(query).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== "") {
        url.searchParams.set(k, v);
    }
    });
}

const options = {
    method,
    credentials: withCred ? "include" : "same-origin",
    headers: { ...headers }
};

if (data instanceof FormData) {
    options.body = data;
} 
else if (body !== undefined) {
    options.headers["Content-Type"] = "application/json";
    options.body = JSON.stringify(body);
}

const res = await fetch(url.toString(), options);
const json = await res.json().catch(() => ({}));

if (!res.ok) throw new Error(json.message || `HTTP ${res.status}`);

return json;
}
