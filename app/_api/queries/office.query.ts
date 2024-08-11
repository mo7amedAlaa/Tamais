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
    const { data, status } = await defaultAPI.get(API_ENDPOINTS.ADVISORY_ADVISORY_DIGITAL);
    return { data, status };
};
export const getListReservedFromClient = async () => {
    const { data, status } = await defaultAPI.get(API_ENDPOINTS.ADVISORY_ADVISORY_CLIENT);
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
export const getListServicesFromDigitalGuide = async () => {
    const { data, status } = await defaultAPI.get(API_ENDPOINTS.ADVISORY_SERVICES_DIGITAL);
    return { data, status };
};
export const getListServicesFromClient = async () => {
    const { data, status } = await defaultAPI.get(API_ENDPOINTS.ADVISORY_SERVICES_DIGITAL);
    return { data, status };
};
export const getListAdvisoryAvailableForPricing = async () => {
    const { data, status } = await defaultAPI.get(API_ENDPOINTS.ADVISORY_Advisory_Available);
    return { data, status };
};
export const getListAppointmentAvailableForPricing = async () => {
    const { data, status } = await defaultAPI.get(API_ENDPOINTS.ADVISORY_APPOINTMENTS_Available);
    return { data, status };
};
export const getListServicesAvailableForPricing = async () => {
    const { data, status } = await defaultAPI.get(API_ENDPOINTS.ADVISORY_Services_Available);
    return { data, status };
};
