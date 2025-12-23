import axios from "axios";

const httpRequest = axios.create({
    baseURL: "http://localhost:5001",
});

export const axiosVnPay = axios.create({
    baseURL: "https://sandbox.vnpayment.vn",
});

export const get = async (req, options = {}) => {
    // console.log("req", req);
    const response = await httpRequest.get(req, options);

    return response.data;
};

export const post = async (q, body, opt) => {
    console.log("request:", q);
    const response = await httpRequest.post(q, body, opt);
    return response.data;
};

export default httpRequest;
