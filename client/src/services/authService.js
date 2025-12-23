import { toast } from "react-toastify";
import * as httpRequest from "../utils/httpRequest";

export const login = async (q, body, opt) => {
    try {
        const res = await httpRequest.post(q, body, opt);
        // console.log("login status:", res.user);
        return res.data || res;
    } catch (error) {
        console.log("Error from service:", error);
        toast.error(error?.response?.data?.message || "Đăng nhập thất bại!!!");
    }
};
