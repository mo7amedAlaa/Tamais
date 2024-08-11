import { API_ENDPOINTS } from "@/app/_helpers/config/constants";
import { defaultAPI } from "../axios";
export const analytics = async () => {
    const { data, status } = await defaultAPI.get(API_ENDPOINTS.LAWYER_ANALYTICS);
    return { data, status };
};
export const getClients = async () => {
    const { data, status } = await defaultAPI.get(API_ENDPOINTS.LAWYER_CLIENT);
    return { data, status };
};
export const getWallet = async () => {
    const { data, status } = await defaultAPI.get(API_ENDPOINTS.LAWYER_WALLET);
    return { data, status };
};
export const getListReservedFromDigitalGuide = async () => {
    const { data, status } = await defaultAPI.get(API_ENDPOINTS.ADVISORY_SERVICES_DIGITAL);
    return { data, status };
};
export const getListReservedFromClient = async () => {
    const { data, status } = await defaultAPI.get(API_ENDPOINTS.ADVISORY_SERVICES_CLIENT);
    return { data, status };
};
export const getListAppointmentsFromDigitalGuide = async () => {
    const { data, status } = await defaultAPI.get(API_ENDPOINTS.ADVISORY_APPOINTMENTS_DIGITAL);
    return { data, status };
};
export const getListAppointmentsFromClient = async () => {
    const { data, status } = await defaultAPI.get(API_ENDPOINTS.ADVISORY_APPOINTMENTS_CLIENT);
    return { data, status };
};
