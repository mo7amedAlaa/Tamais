import { API_ENDPOINTS } from "@/app/_helpers/config/constants";
import { defaultAPI } from "../axios";

export const getGeneralLawyerData = async () => {
  const { data } = await defaultAPI.get(API_ENDPOINTS.GENERALSPECIALTY_FETCH);
  return data;
};

export const getAccurateLawyerData = async () => {
  const { data } = await defaultAPI.get(API_ENDPOINTS.ACCURATESPECIALTY_FETCH);
  return data;
};

export const getLawyerDegree = async () => {
  const { data } = await defaultAPI.get(API_ENDPOINTS.DEGREES_FETCH);
  return data;
};
