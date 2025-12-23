import * as httpRequest from "../utils/httpRequest";

// export const getCart = async (q, opt) => {
//     console.log("query:", q);
//     console.log("opt:", opt);
//     try {
//         const res = await httpRequest.get(q, opt);
//         console.log("res", res.data);
//         return res?.data;
//     } catch (error) {
//         console.log("Error from service:", error);
//     }
// };

export const cart = async (q, body, opt) => {
    console.log("query:", q);
    try {
        const res = await httpRequest.post(`/api/cart/${q}`, body, opt);
        console.log("res", res);
        return res;
    } catch (error) {
        console.log("Error from service:", error);
    }
};
