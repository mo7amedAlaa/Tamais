export const ACCESS_TOKEN = 'accessToken';
export const BASE_URL = 'https://api.ymtaz.sa/api';
// export const BASE_URL = 'http://localhost:8000/api';
export const CLIENT = 'client';
export const LAWYER = 'lawyer';
export const API_ENDPOINTS = {
	LAWYER_SIGNIN: '/lawyer/login',
	CLIENT_SIGNIN: '/client/login',
	CLIENT_SIGNUP: '/client/register',
	LAWYER_SIGNUP: '/lawyer/register',
	CLIENT_ACTIVATE_OTP: '/client/activate-account',
	CLIENT_CONFIRM_ACTIVATION_OTP: '/client/confirmOtp',
	CLIENT_FORGOT_PASSWORD_EMAIL: '/client/pos-forgot',
	LAWYER_FORGOT_PASSWORD_EMAIL: '/lawyer/pos-forgot',
	CLIENT_PROFILE: '/client/profile',
	LAWYER_PROFILE: '/lawyer/profile',
	LAWYER_PROFILE_UPDATE: '/lawyer/profile/update',
	COUNTRIES_FETCH: '/lawyer/general_data/countries',
	CITIES_FETCH: '/lawyer/general_data/cities',
	DISTRICTS_FETCH: '/lawyer/general_data/districts',
	NATIONALITIES_FETCH: '/lawyer/general_data/nationalities',
	REGIONS_FETCH: '/lawyer/general_data/regions',
	TYPES_FETCH: '/lawyer/general_data/lawyer-types',
	DEGREES_FETCH: '/lawyer/general_data/degrees',
	GENERALSPECIALTY_FETCH: '/lawyer/general_data/general-specialty',
	ACCURATESPECIALTY_FETCH: '/lawyer/general_data/accurate-specialty',
	FUNCTIONALCASES: '/lawyer/general_data/functional-cases',
	SECTIONS_FETCH: '/lawyer/general_data/sections',
	GET_SERVICES: '/client/services/main-category',
	SERVICE_REQUEST: '/client/services-request',
	DELETE_PROFILE: '/profile/delete-account-request',
	LAWYER_TYPES: '/lawyer/general_data/lawyer-types',
	LAWYER_SECTIONS: '/lawyer/general_data/sections',
	VERIFICATION_FIRST: '/lawyer/verification/first-step',
	VERIFICATION_SECOND: '/lawyer/check/verification/first-step',
	LAWYER_REGISTER: '/lawyer/register',
	LAWYER_RESET_PASSWORD: '/lawyer/reset',
	CLIENT_RESET_PASSWORD: '/client/reset',
	LAWYER_FORGET_PASS_VERIFYCODE: '/lawyer/verification',
	CLIENT_FORGET_PASS_VERIFYCODE: '/client/verification',
	FETCH_NEW_ADVISORIES: '/v1/recentlyJoinedLawyers',
	LAWYER_CATEGORIES_CLIENT: '/v1/digital-guide/categories',
	LAWYERS_BY_CATEGORY_CLIENT: '/v1/digital-guide/search',
	FETCH_LAWYER_PROFILE: '/v1/lawyer/:id',
	FETCH_LAWYER_ADVISORY_SERVICES: '/client/lawyer/:id/advisory-services',
	FETCH_LAWYER_SERVICES: '/v1/lawyer/:id/services',
	MERGED_CONFIRM_OTP_ON_CHANGE: '/v1/auth/confirm-otp',
	MERGED_RESEND_OTP_ON_CHANGE: '/v1/auth/resend-otp',
	CONTACT_US: '/v1/contact-us',
	LAWYER_ANALYTICS:'/lawyer/profile/analytics',
	LAWYER_CLIENT:'lawyer/profile/clients',
	LAWYER_WALLET:"lawyer/payouts/wallet",
	ADVISORY_ADVISORY_DIGITAL:"lawyer/advisory-services/requested/lawyer",
	ADVISORY_ADVISORY_CLIENT:"lawyer/advisory-services/requested/client",
	ADVISORY_APPOINTMENTS_DIGITAL:"lawyer/reservations/lawyers",
	ADVISORY_APPOINTMENTS_CLIENT:"lawyer/reservations/clients",
	ADVISORY_SERVICES_DIGITAL:"lawyer/services-request/requested/lawyer",
	ADVISORY_SERVICES_CLIENT:"lawyer/services-request/requested/client",
	ADVISORY_Advisory_Available:"lawyer/advisory-services/availableForPricing",
	ADVISORY_Services_Available:"lawyer/services-request/getLawyerServicePrices",
	ADVISORY_APPOINTMENTS_Available:'lawyer/reservations/types'

};
export const PROFILE_TYPE = 'profileType';
