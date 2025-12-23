import * as httpRequest from "../utils/httpRequest";

export const product = async (q) => {
    try {
        const res = await httpRequest.get(`/products/${q}`);
        // console.log("res", res.data);
        return res?.data || res;
    } catch (error) {
        console.log("Error from service:", error);
    }
};

export const getAllProducts = async (q, body, opt) => {
    // console.log("query:", q);
    try {
        const res = await httpRequest.get(q, body, opt);
        console.log("res", res);
        return res;
    } catch (error) {
        console.log("Error from service:", error);
    }
};
