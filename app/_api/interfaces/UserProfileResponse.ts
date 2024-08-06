export interface Nationality {
	id: number;
	name: string;
}

export interface Country {
	id: number;
	name: string;
	phone_code?: string;
	regions?: Region[];
}

export interface Region {
	id: number;
	name: string;
	cities?: City[];
}

export interface City {
	id: number;
	title: string;
}

export interface UserProfileResponse {
	id?: number;
	first_name?: string;
	second_name?: string;
	third_name?: any;
	fourth_name?: string;
	name?: string;
	phone_code?: string;
	email?: string;
	gender?: string;
	phone?: string;
	about?: string;
	birthday?: string;
	photo?: string;
	is_favorite?: number;
	office_request_status?: number;
	special?: number;
	sections: Section[];
	rates_count?: any;
	rates_avg?: any;
	mobile?: string;
	type?: number;
	image?: string;
	nationality?: Nationality;
	country?: Country;
	region?: Region;
	city?: City;
	longitude?: string;
	latitude?: string;
	'gender '?: string;
	company_lisences_no?: any;
	token: any;
	accepted: number;
	accurate_specialty: AccurateSpecialty;
	general_specialty: GeneralSpecialty;
	degree: Degree;
	functional_cases: FunctionalCases;
	identity_type: number;
	nat_id?: string;
	degree_certificate?: string;
	company_name?: string;
	company_lisences_file?: string;
	cv?: string;
	id_file?: string;
	digital_guide_subscription?: number;
	active: number;
	confirmationType?: string;
}

export interface AccurateSpecialty {
	id: number;
	title: string;
}
export interface GeneralSpecialty {
	id: number;
	title: string;
}
export interface FunctionalCases {
	id: number;
	title: string;
}
export interface Degree {
	id: number;
	title: string;
	need_certificate: 1;
	isSpecial: string;
}

export interface Section {
	id: number;
	section: Section2;
	lawyer_license_no?: string;
	lawyer_license_file?: string;
}

export interface Section2 {
	id: number;
	title: string;
	name?: string;
	image: string;
	need_license: number;
	lawyers_count: number;
}
