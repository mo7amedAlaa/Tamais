import { API_ENDPOINTS } from '@/app/_helpers/config/constants';
import { defaultAPI } from '../axios';

export const getLawyer = async (id: string) => {
	const { data } = await defaultAPI.get(
		`${API_ENDPOINTS.FETCH_LAWYER_PROFILE.replace(':id', id)}`
	);
	return data;
};

export const getLawyerAdvisoryServices = async (id: string) => {
	const { data } = await defaultAPI.get(
		`${API_ENDPOINTS.FETCH_LAWYER_ADVISORY_SERVICES.replace(':id', id)}`
	);
	return data;
};
export const getLawyerServices = async (id: string) => {
	const { data } = await defaultAPI.get(
		`${API_ENDPOINTS.FETCH_LAWYER_SERVICES.replace(':id', id)}`
	);
	return data;
};
