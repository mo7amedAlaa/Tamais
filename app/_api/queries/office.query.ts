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
//استشاره
export const getListReservedFromDigitalGuide = async () => {
    const { data, status } = await defaultAPI.get(API_ENDPOINTS.ADVISORY_ADVISORY_DIGITAL);
    return { data, status };
};
export const getListReservedFromClient = async () => {
    const { data, status } = await defaultAPI.get(API_ENDPOINTS.ADVISORY_ADVISORY_CLIENT);
    return { data, status };
};
//
export const getListAppointmentsFromDigitalGuide = async () => {
    const { data, status } = await defaultAPI.get(API_ENDPOINTS.ADVISORY_APPOINTMENTS_DIGITAL);
    return { data, status };
};
export const getListAppointmentsFromClient = async () => {
    const { data, status } = await defaultAPI.get(API_ENDPOINTS.ADVISORY_APPOINTMENTS_CLIENT);
    return { data, status };
};
// خدمه
export const getListServicesFromDigitalGuide = async () => {
    const { data, status } = await defaultAPI.get(API_ENDPOINTS.ADVISORY_SERVICES_DIGITAL);
    return { data, status };
};
export const getListServicesFromClient = async () => {
    const { data, status } = await defaultAPI.get(API_ENDPOINTS.ADVISORY_SERVICES_CLIENT);
    return { data, status };
};
//
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
    const { data, status } = await   defaultAPI.delete(`lawyer/services-request/${id}`);
    return { data, status };
};
export const deleteSchedule = async (id:any) => {
    const { data, status } = await defaultAPI.delete(`lawyer/reservations/${id}`);
    return { data, status };
};
export const changeConsultationEn = async (id:any) => {
    const { data, status } = await  defaultAPI.post(`lawyer/advisory-services/${id}`,{"status": true});
    return { data, status };
};
export const changeConsultationDis = async (id:any) => {
    const { data, status } = await  defaultAPI.post(`lawyer/advisory-services/${id}`,{"status": false});
    return { data, status };
};
export const changeScheduleEn = async (id:any) => {
    const { data, status } = await  defaultAPI.post(`lawyer/reservations/${id}`,{"status": true});
    return { data, status };
};
export const changeScheduleDis = async (id:any) => {
    const { data, status } = await  defaultAPI.post(`lawyer/reservations/${id}`,{"status": false});
    return { data, status };
};
export const changeServiceEn = async (id:any) => {
    const { data, status } = await  defaultAPI.post(`lawyer/services-request/${id}`,{"status": true});
    return { data, status };
};
export const changeServiceDis = async (id:any) => {
    const { data, status } = await  defaultAPI.post(`lawyer/services-request/${id}`,{"status": false});
    return { data, status };
};
 
export const createPriceConsultation = async (formData:any) => {
    const { data, status } = await defaultAPI.post(API_ENDPOINTS.CONSULTATION_CREATE_PRICES,formData);
    return { data, status };
};
export const createPriceSchedule = async (formData:any) => {
    const { data, status } = await defaultAPI.post(API_ENDPOINTS.SCHEDULE_CREATE_PRICES,formData);
    return { data, status };
};
export const createPriceService = async (formData:any) => {
    const { data, status } = await defaultAPI.post(API_ENDPOINTS.SERVICE_CREATE_PRICES,formData);
    return { data, status };
};
export const analytics_Client = async () => {
    const { data, status } = await defaultAPI.get(API_ENDPOINTS.CLIENT_ANALYTICS);
    return { data, status };
};
export const getClients_Client = async () => {
    const { data, status } = await defaultAPI.get(API_ENDPOINTS.LAWYER_CLIENT);
    return { data, status };
};
export const getWallet_Client = async () => {
    const { data, status } = await defaultAPI.get(API_ENDPOINTS.CLIENT_WALLET);
    return { data, status };
};
// 
export const getListReservedFromDigitalGuide_Client = async () => {
    const { data, status } = await defaultAPI.get(API_ENDPOINTS.CLIENT_ADVISORY_DIGITAL);
    return { data, status };
};
export const getListReservedFromClient_Client = async () => {
    const { data, status } = await defaultAPI.get(API_ENDPOINTS.CLIENT_ADVISORY_CLIENT);
    return { data, status };
};
// 
export const getListServicesFromDigitalGuide_Client = async () => {
    const { data, status } = await defaultAPI.get(API_ENDPOINTS.CLIENT_SERVICES_DIGITAL);
    return { data, status };
};
export const getListServicesFromClient_Client = async () => {
    const { data, status } = await defaultAPI.get(API_ENDPOINTS.CLIENT_SERVICES_CLIENT);
    return { data, status };
};
// 
export const getListAppointmentsFromDigitalGuide_Client = async () => {
    const { data, status } = await defaultAPI.get(API_ENDPOINTS.ADVISORY_APPOINTMENTS_DIGITAL);
    return { data, status };
};
export const getListAppointmentsFromClient_Client = async () => {
    const { data, status } = await defaultAPI.get(API_ENDPOINTS.ADVISORY_APPOINTMENTS_CLIENT);
    return { data, status };
};
// export const getListServicesFromDigitalGuide_Client = async () => {
//     const { data, status } = await defaultAPI.get(API_ENDPOINTS.ADVISORY_SERVICES_DIGITAL);
//     return { data, status };
// };
// export const getListServicesFromClient_Client = async () => {
//     const { data, status } = await defaultAPI.get(API_ENDPOINTS.ADVISORY_SERVICES_CLIENT);
//     return { data, status };
// };
