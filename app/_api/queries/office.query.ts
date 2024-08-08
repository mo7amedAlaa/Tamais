import { API_ENDPOINTS } from "@/app/_helpers/config/constants";
import { defaultAPI } from "../axios";
export const analytics = async (token) => {
    const { data, status } = await defaultAPI.get(API_ENDPOINTS.LAWYER_ANALYTICS);
    return { data, status };
};
