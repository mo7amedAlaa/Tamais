import { API_ENDPOINTS } from '@/app/_helpers/config/constants';
import { defaultAPI } from '../axios';
import { HttpStatusCode } from 'axios';
import { LawyerFormData } from '../interfaces/Profile';
import { id } from '@form-validation/bundle/full';

export const clientProfile = async () => {
	const { data, status } = await defaultAPI.get(API_ENDPOINTS.CLIENT_PROFILE);
	return { data, status };
};
export const lawyerProfile = async () => {
	const { data, status } = await defaultAPI.get(API_ENDPOINTS.LAWYER_PROFILE);
	return { data, status };
};
export const fetchCountries = async () => {
	const { data, status } = await defaultAPI.get(
		API_ENDPOINTS.COUNTRIES_FETCH
	);
	return { data, status };
};
export const fetchCities = async () => {
	const { data, status } = await defaultAPI.get(API_ENDPOINTS.CITIES_FETCH);
	return { data, status };
};
export const fetchDistricts = async () => {
	const { data, status } = await defaultAPI.get(
		API_ENDPOINTS.DISTRICTS_FETCH
	);
	return { data, status };
};
export const fetchRegions = async () => {
	const { data, status } = await defaultAPI.get(API_ENDPOINTS.REGIONS_FETCH);
	return { data, status };
};
export const fetchTypes = async () => {
	const { data, status } = await defaultAPI.get(API_ENDPOINTS.TYPES_FETCH);
	return { data, status };
};
export const fetchDegrees = async () => {
	const { data, status } = await defaultAPI.get(API_ENDPOINTS.DEGREES_FETCH);
	return { data, status };
};
export const fetchGeneralSpecialty = async () => {
	const { data, status } = await defaultAPI.get(
		API_ENDPOINTS.GENERALSPECIALTY_FETCH
	);
	return { data, status };
};
export const fetchAccurateSpecialty = async () => {
	const { data, status } = await defaultAPI.get(
		API_ENDPOINTS.ACCURATESPECIALTY_FETCH
	);
	return { data, status };
};

export const fetchSections = async () => {
	const { data, status } = await defaultAPI.get(API_ENDPOINTS.SECTIONS_FETCH);
	return { data, status };
};
export const updateClientProfile = async (updatedProfile: any) => {
	const { data, status } = await defaultAPI.post(
		API_ENDPOINTS.CLIENT_PROFILE,
		updatedProfile
	);
	return { data, status };
};
export const updateLawyerProfile = async (updatedProfile: any) => {
	const { data, status } = await defaultAPI.post(
		API_ENDPOINTS.LAWYER_PROFILE_UPDATE,
		updatedProfile,
		{
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		}
	);
	return { data, status };
};

export const deleteProfile = async (id: number, otherField: any) => {
	try {
		const response = await defaultAPI.delete(
			`${API_ENDPOINTS.DELETE_PROFILE}/${id}`,
			{
				data: {
					otherField: otherField,
				},
			}
		);
		return {
			data: response.data,
			status: response.status,
		};
	} catch (error) {
		console.error('Error deleting profile:', error);
		throw error;
	}
};

export const getLawyerTypes = async () => {
	const { data, status } = await defaultAPI.get(API_ENDPOINTS.LAWYER_TYPES);
	return { data, status };
};
export const getLawyerSections = async () => {
	const { data, status } = await defaultAPI.get(
		API_ENDPOINTS.LAWYER_SECTIONS
	);
	return { data, status };
};

export const fetchFunctionalCases = async () => {
	const { data, status } = await defaultAPI.get(
		API_ENDPOINTS.FUNCTIONALCASES
	);
	return { data, status };
};
export const fetchNationalities = async () => {
	const { data, status } = await defaultAPI.get(
		API_ENDPOINTS.NATIONALITIES_FETCH
	);
	return { data, status };
};

export const LawyerSignupFirstRequest = async (formData: {
	email: string;
	phoneNum: string;
	phoneCode: string;
}) => {
	let body = new FormData();

	body.append('email', formData.email);
	body.append('phone', formData.phoneNum);
	body.append('phone_code', formData.phoneCode);

	try {
		const { data } = await defaultAPI.post(
			API_ENDPOINTS.VERIFICATION_FIRST,
			body
		);
		return data;
	} catch (error) {
		console.error('Error in Profile request:', error);
		throw error;
	}
};

export const LawyerSignupSecondRequest = async (formData: {
	email: string;
	phoneNum: string;
	phoneCode: string;
	otpString: string;
}) => {
	let body = new FormData();

	body.append('email', formData.email);
	body.append('phone', formData.phoneNum);
	body.append('phone_code', formData.phoneCode);
	body.append('otp', formData.otpString);

	try {
		const { data, status } = await defaultAPI.post(
			API_ENDPOINTS.VERIFICATION_SECOND,
			body
		);
		return { data, status };
	} catch (error) {
		console.error('Error in Profile request:', error);
		throw error;
	}
};

export const LawyerRegister = async (formData: LawyerFormData) => {
	const section = formData.section;

	let body = new FormData();

	body.append('first_name', formData.firstName);
	body.append('second_name', formData.secondName);
	body.append('third_name', formData.thirdName);
	body.append('fourth_name', formData.forthName);
	body.append('email', formData.email);
	body.append('phone', formData.phoneNum);
	body.append('phone_code', formData.phoneCode);

	body.append('password', formData.password);
	body.append('password_confirmation', formData.confirmPassword);
	body.append('about', formData.discription);
	body.append('birth_day', formData.day);
	body.append('birth_month', formData.month);
	body.append('birth_year', formData.year);
	body.append('gender', formData.gender);
	body.append('degree', formData.degree);

	body.append('general_specialty', formData.generalSpeciality);
	body.append('accurate_specialty', formData.accurateSpeciality);
	body.append('nationality', formData.lawyerNationality);
	body.append('country', formData.country);

	body.append('longitude', formData.longitude);
	body.append('latitude', formData.latitude);

	body.append('region', formData.region);
	body.append('city', formData.city);
	body.append('type', formData.lawyerType);

	body.append('nat_id', formData.idNumber);

	body.append('functional_cases', formData.functionalCase);
	body.append('identity_type', '2');
	body.append('company_name', formData.companyName);

	for (let i = 0; i < formData.lawyerSection.length; i++) {
		body.append(`sections[${i}]`, formData.lawyerSection[i].id);
		if (formData.lawyerSection[i].section.lawyer_license_no == '1') {
			body.append(
				`licence_no[${formData.lawyerSection[i].id}]`,
				formData.lawyerSection[i].sectionLicenseNo
			);
		}
		if (formData.lawyerSection[i].section.lawyer_license_file == '1') {
			body.append(
				`license_file[${formData.lawyerSection[i].id}]`,
				formData.lawyerSection[i].secondLicenseFile
			);
		}
	}

	if (formData.imageFile != null) {
		body.append('photo', formData.imageFile);
	}

	if (formData.logoFile != null) {
		body.append('logo', formData.logoFile);
	}

	if (formData.userCvFile != null) {
		body.append('cv', formData.userCvFile);
	}

	if (formData.degreeCertificateFile != null) {
		body.append('degree_certificate', formData.degreeCertificateFile);
	}

	if (formData.companyLicensesFile != null) {
		body.append('company_lisences_file', formData.companyLicensesFile);
	}
	if (formData.userIdFile != null) {
		body.append('id_file', formData.userIdFile);
	}

	try {
		const { data } = await defaultAPI.post(
			API_ENDPOINTS.LAWYER_REGISTER,
			body
		);
		return data;
	} catch (error) {
		console.error('Error in Register request:', error);
		throw error;
	}
};
