import * as httpRequest from "../utils/httpRequest";

export const search = async (q, type = "less") => {
    try {
        const res = await httpRequest.get("/api/search", {
            params: {
                q,
                type,
            },
        });
        console.log("res::", res);
        console.log(res.data);
        return res;
    } catch (error) {
        console.log(error);
    }
};
