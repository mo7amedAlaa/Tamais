import axios from 'axios';
import Cookies from 'js-cookie';
import { GetServerSidePropsContext } from 'next';
import { toast } from 'react-hot-toast';
import {
	ACCESS_TOKEN,
	BASE_URL,
	PROFILE_TYPE,
} from '../_helpers/config/constants';
const VALIDATION_ERRORS_RESPONSE = 422;
const UNAUTHENTICATED_ERROR = 401;

export const defaultAPI = axios.create({
	baseURL: BASE_URL,
});

const isServer = () => {
	return typeof window === 'undefined';
};

let locale = '';
let context = <GetServerSidePropsContext>{};

export const setLocale = (_locale: string) => {
	locale = _locale;
};

export const getLocale = () => locale;

export const setContext = (_context: GetServerSidePropsContext) => {
	context = _context;
};

defaultAPI.interceptors.response.use(
	function (response) {
		const SHOW_TOAST = false;

		if (SHOW_TOAST) {
			if (response.data.message !== 'Message Created Successfully') {
				toast.dismiss();
				toast.success(response.data.message);
			}
		}

		return response;
	},
	function (error) {
		const STATUS_CODE = error.response.status;
		// STATUS_CODE === VALIDATION_ERRORS_RESPONSE
		if (STATUS_CODE === VALIDATION_ERRORS_RESPONSE) {
			if (Array.isArray(error.response.data.data?.errors)) {
				const responseErrors = Object.values(
					error.response.data.data.errors
				)[0] as Array<string>;

				const firstErrorValue = responseErrors[0];
				toast.dismiss();
				toast.error(firstErrorValue);
				return error.response;
			}
		} else if (
			STATUS_CODE === UNAUTHENTICATED_ERROR &&
			error.config.url !== '/auth/signin'
		) {
			Cookies.remove(ACCESS_TOKEN);
			Cookies.remove(PROFILE_TYPE);
			localStorage.removeItem(ACCESS_TOKEN);
			localStorage.removeItem(PROFILE_TYPE);
		} else {
			toast.dismiss();
			toast.error(error.response.data.message);
		}

		return Promise.reject(error);
	}
);

defaultAPI.interceptors.request.use(
	(config) => {
		if (localStorage.getItem(ACCESS_TOKEN)) {
			config.headers.Authorization = `Bearer ${localStorage.getItem(
				ACCESS_TOKEN
			)}`;
		}
		if (!isServer()) {
			config.headers.Locale =
				window.location.pathname.slice(1, 3) == 'ar' ? 'ar' : 'en';
		}
		// if (isServer() && context?.req?.cookies) {
		//     config.headers.Locale = context?.req?.cookies?.NEXT_LOCALE || "en";
		// }
		config.headers.Accept = 'application/json';
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);
