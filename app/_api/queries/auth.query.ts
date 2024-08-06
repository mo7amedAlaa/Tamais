import { API_ENDPOINTS } from '@/app/_helpers/config/constants';
import { defaultAPI } from '../axios';
import { SigninInput } from '../interfaces/signinInput';

export const clientSIgnin = async (body: SigninInput) => {
	const { data } = await defaultAPI.post(API_ENDPOINTS.CLIENT_SIGNIN, body);
	return data;
};
export const lawyerSignin = async (body: SigninInput) => {
	const { data } = await defaultAPI.post(API_ENDPOINTS.LAWYER_SIGNIN, body);
	return data;
};

export const clientSignup = async (body: any) => {
	const { data } = await defaultAPI.post(API_ENDPOINTS.CLIENT_SIGNUP, body);
	return data;
};
export const lawyerSignup = async (body: any) => {
	const { data } = await defaultAPI.post(API_ENDPOINTS.LAWYER_SIGNUP, body);
	return data;
};

export const clientActivate = async (body: any) => {
	const { data } = await defaultAPI.post(
		API_ENDPOINTS.CLIENT_ACTIVATE_OTP,
		body
	);
	return data;
};

export const confirmOtp = async (body: any) => {
	const { data, status } = await defaultAPI.post(
		API_ENDPOINTS.CLIENT_CONFIRM_ACTIVATION_OTP,
		body
	);
	return { data, status };
};

export const mergedConfirmOtpOnChange = async (body: any) => {
	const { data, status } = await defaultAPI.post(
		API_ENDPOINTS.MERGED_CONFIRM_OTP_ON_CHANGE,
		body
	);
	return { data, status };
};
export const mergedResendOtpOnChange = async () => {
	const { data, status } = await defaultAPI.post(
		API_ENDPOINTS.MERGED_RESEND_OTP_ON_CHANGE
	);
	return { data, status };
};

export const contactUs = async (body: any) => {
	const { data, status } = await defaultAPI.post(
		API_ENDPOINTS.CONTACT_US,
		body,
		{
			headers: {
				Authorization:
					'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaS55bXRhei5zYS9hcGkvY2xpZW50L2xvZ2luIiwiaWF0IjoxNzIyNzYwMTAyLCJleHAiOjIxNjAxNzIyNzYwMTAyLCJuYmYiOjE3MjI3NjAxMDIsImp0aSI6Im9LSlJkUHRBR3F2WTU2VWMiLCJzdWIiOiIxNzQ5IiwicHJ2IjoiMmE4NDY2MmMzMzE1NzU0NmM0M2Y0MDM3NTQ2NDE1YmM3MGQ3OGJiYyJ9.2kxIFL0af0QIjBC_cNFxwI2mUnjlmIME9Zd386Zubgc',
			},
		}
	);
	return { data, status };
};
