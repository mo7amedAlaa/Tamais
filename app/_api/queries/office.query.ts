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
    const { data, status } = await defaultAPI.get(API_ENDPOINTS.ADVISORY_SERVICES_CLIENT);
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
export const replyTpConsultationFromClient = async (Form_Data:any) => {
    const { data, status } = await defaultAPI.post(API_ENDPOINTS.ADVISORY_REPLY_CLIENT,Form_Data);
    return { data, status };
};
export const replyToAppointFromClient = async (Form_Data:any) => {
    const { data, status } = await defaultAPI.post(API_ENDPOINTS.APPOINT_REPLY_CLIENT,Form_Data);
    return { data, status };
};
export const replyToServiceFromClient = async (Form_Data:any) => {
    const { data, status } = await defaultAPI.post(API_ENDPOINTS.SERVICE_REPLY_CLIENT,Form_Data);
    return { data, status };
};
export const replyTpConsultationFromLawyer = async (Form_Data:any) => {
    const { data, status } = await defaultAPI.post(API_ENDPOINTS.ADVISORY_REPLY_Lawyer,Form_Data);
    return { data, status };
};
export const replyToAppointFromLawyer = async (Form_Data:any) => {
    const { data, status } = await defaultAPI.post(API_ENDPOINTS.SERVICE_REPLY_Lawyer,Form_Data);
    return { data, status };
};
export const replyToServiceFromLawyer = async (Form_Data:any) => {
    const { data, status } = await defaultAPI.post(API_ENDPOINTS.SERVICE_REPLY_Lawyer,Form_Data);
    return { data, status };
};
export const deleteConsultation = async (id:any) => {
    const { data, status } = await  defaultAPI.delete(`lawyer/advisory-services/${id}`);
    return { data, status };
};
export const deleteService = async (id:any) => {
    const { data, status } = await   defaultAPI.get(`lawyer/services-request/:${id}`);
    return { data, status };
};
export const deleteAppointment = async (id:any) => {
    const { data, status } = await defaultAPI.delete(`lawyer/reservations/:${id}`);
    return { data, status };
};
export const changeConsultation = async (id:any) => {
    const { data, status } = await  defaultAPI.post(`lawyer/advisory-services/${id}`);
    return { data, status };
};
export const changeService = async (id:any) => {
    const { data, status } = await   defaultAPI.post(`lawyer/services-request/:${id}`);
    return { data, status };
};
export const changeAppointment = async (id:any) => {
    const { data, status } = await defaultAPI.post(`lawyer/reservations/:${id}`);
    return { data, status };
};
