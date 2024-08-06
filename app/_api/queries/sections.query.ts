import { API_ENDPOINTS } from '@/app/_helpers/config/constants';
import { defaultAPI } from '../axios';
import { FormDataState } from '@/app/(routes)/sub-services/[serviceId]/service-req/[requestId]/page';

/*
export const serviceRequest = async (body: any) => {
	const { data } = await defaultAPI.post(API_ENDPOINTS.SERVICE_REQUEST, body);
	return data;
};*/

export const getSections = async () => {
	const { data } = await defaultAPI.get(
		API_ENDPOINTS.LAWYER_CATEGORIES_CLIENT
	);
	return data;
};
export const getLawyersBySection = async ({ id }: { id: string | number }) => {
	const { data } = await defaultAPI.post(
		API_ENDPOINTS.LAWYERS_BY_CATEGORY_CLIENT,
		{
			category_id: id,
		}
	);
	return data;
};
