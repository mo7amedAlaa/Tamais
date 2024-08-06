import { API_ENDPOINTS } from "@/app/_helpers/config/constants";
import { defaultAPI } from "../axios";
import { FormDataState } from "@/app/(routes)/sub-services/[serviceId]/service-req/[requestId]/page";

/*
export const serviceRequest = async (body: any) => {
	const { data } = await defaultAPI.post(API_ENDPOINTS.SERVICE_REQUEST, body);
	return data;
};*/

export const getServices = async () => {
  const { data } = await defaultAPI.get(API_ENDPOINTS.GET_SERVICES);
  return data;
};

export const serviceRequest = async (
  serviceId: number,
  formData: FormDataState,
) => {
  let body = new FormData();
  body.append("service_id", serviceId.toString());
  body.append("priority", formData.level);
  body.append("description", formData.content);
  body.append("accept_rules", "1");

  if (formData.attachments != null) {
    body.append("file", formData.attachments);
  }

  try {
    const { data } = await defaultAPI.post(API_ENDPOINTS.SERVICE_REQUEST, body);
    return data;
  } catch (error) {
    console.error("Error in service request:", error);
    throw error;
  }
};
