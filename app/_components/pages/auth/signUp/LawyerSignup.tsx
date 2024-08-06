/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import {
	City,
	Country,
	Degree,
	Nationality,
	Region,
	Section2,
} from '@/app/_api/interfaces/UserProfileResponse';
import ar from 'react-phone-number-input/locale/ar';
import {
	LawyerSignupFirstRequest,
	LawyerSignupSecondRequest,
	fetchAccurateSpecialty,
	fetchCountries,
	fetchDegrees,
	fetchFunctionalCases,
	fetchGeneralSpecialty,
	fetchNationalities,
	fetchSections,
} from '@/app/_api/queries/profile.query';
import TextInput from '@/app/_components/ui/TextInput';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import SelectGroup from '../common/SelectGroup';
import MainButton from '@/app/_components/ui/MainButton';
import { FaAngleLeft, FaLocationArrow } from 'react-icons/fa';
import { useMutation } from '@tanstack/react-query';
import { lawyerSignup } from '@/app/_api/queries/auth.query';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { AxiosError } from 'axios';
import UploadFile from '../common/UploadFile';
import MultiSelectDropdown from '@/app/_components/ui/MultiSelectDropdown';
import OTPForm from '../common/otp/OTPForm';
import { useRouter } from 'next/navigation';
import 'react-phone-number-input/style.css';
import PhoneInput, {
	getCountries,
	getCountryCallingCode,
	isValidPhoneNumber,
	parsePhoneNumber,
	PhoneNumber,
} from 'react-phone-number-input';

const idTypes = [
	{
		id: 1,
		name: 'هوية وطنية',
	},
	{
		id: 2,
		name: 'جواز سفر',
	},
	{
		id: 3,
		name: 'هوية مقيم',
	},
];
function LawyerSignup({
	className,
	setCurrentScreen,
}: {
	className: string;
	setCurrentScreen: any;
}) {
	const StepOneValidationSchema = Yup.object({
		first_name: Yup.string().required('الحقل مطلوب'),
		second_name: Yup.string().required('الحقل مطلوب'),
		third_name: Yup.string().notRequired(),
		fourth_name: Yup.string().required('الحقل مطلوب'),
		phone: Yup.string()
			.required('الحقل مطلوب')
			.test('is-valid-phone', 'رقم الهاتف غير صحيح', (value) => {
				return value ? isValidPhoneNumber(value) == true : false;
			}),
		email: Yup.string()
			.email('هذا الأيميل غير صحيح')
			.required('الحقل مطلوب'),
		password: Yup.string().required('الحقل مطلوب'),
		password_confirmation: Yup.string()
			.oneOf([Yup.ref('password'), undefined], 'يجب تطابق كلمة المرور')
			.required('الحقل مطلوب'),
	});

	const StepThreeValidationSchema = Yup.object({
		selectedType: Yup.string().required('الحقل مطلوب'),
		cv: Yup.mixed().when('selectedType', {
			is: '1',
			then: (schema) => schema.required('الحقل مطلوب'),
			otherwise: (schema) => schema.notRequired(),
		}),
		company_name: Yup.string().when('selectedType', {
			is: (selectedType: string) =>
				selectedType == '4' || selectedType == '5',
			then: (schema) => schema.required('الحقل مطلوب'),
			otherwise: (schema) => schema.notRequired(),
		}),
		company_lisences_file: Yup.mixed().when('selectedType', {
			is: (selectedType: string) =>
				selectedType == '2' || selectedType == '3',
			then: (schema) => schema.required('الحقل مطلوب'),
			otherwise: (schema) => schema.notRequired(),
		}),
		company_lisences_no: Yup.string().when('selectedType', {
			is: (selectedType: string) =>
				selectedType == '2' || selectedType == '3',
			then: (schema) => schema.required('الحقل مطلوب'),
			otherwise: (schema) => schema.notRequired(),
		}),
		gender: Yup.string().required('الحقل مطلوب'),
		about: Yup.string().required('الحقل مطلوب'),
		day: Yup.string().required('الحقل مطلوب'),
		month: Yup.string().required('الحقل مطلوب'),
		year: Yup.string().required('الحقل مطلوب'),
	});
	const StepFourValidationSchema = Yup.object({
		selectedCountry: Yup.string().required('الحقل مطلوب'),
		selectedRegion: Yup.string().required('الحقل مطلوب'),
		selectedCity: Yup.string().required('الحقل مطلوب'),
		selectedNationality: Yup.string().required('الحقل مطلوب'),
		latitude: Yup.number().nullable().required('الحقل مطلوب'),
		longitude: Yup.number().nullable().required('الحقل مطلوب'),
	});
	const StepFiveValidationSchema = Yup.object({
		identity_type: Yup.number().required('الحقل مطلوب'),

		nat_id: Yup.string().when('identity_type', {
			is: 2, // If identity_type is 2
			then: (schema) => schema.required('الحقل مطلوب').max(9),
			otherwise: (schema) =>
				schema
					.required('الحقل مطلوب')
					.matches(/^\d+$/, 'رقم الهوية يجب أن يكون رقماً')
					.max(10), // Additional validation for strings, if needed
		}),
		id_file: Yup.mixed().required('الحقل مطلوب'),
		functional_cases: Yup.string().required('الحقل مطلوب'),
		degree: Yup.string().required('الحقل مطلوب'),
		other_degree: Yup.string().when('degree', {
			is: (degree: string) =>
				degrees.find((deg) => deg.id.toString() == degree)?.title ==
				'أخرى',
			then: (schema) => schema.required('الحقل مطلوب'),
			otherwise: (schema) => schema.notRequired(),
		}),

		general_specialty: Yup.string().required('الحقل مطلوب'),
		accurate_specialty: Yup.string().required('الحقل مطلوب'),
		sections: Yup.array()
			.of(
				Yup.object().shape({
					id: Yup.number().required(),
					need_license: Yup.number().required(),
					name: Yup.string().required(),
					licence_no: Yup.string().when('need_license', {
						is: 1,
						then: (schema) => schema.required('رقم الترخيص مطلوب'),
						otherwise: (schema) => schema,
					}),
					license_file: Yup.mixed().when('need_license', {
						is: 1,
						then: (schema) => schema.required('ملف الترخيص مطلوب'),
						otherwise: (schema) => schema.nullable(),
					}),
				})
			)
			.min(1, 'يجب اختيار مهنة واحدة على الأقل')
			.required('الحقل مطلوب'),
		degree_certificate: Yup.mixed().when(['sections', 'degree'], {
			is: (sections: Section2[], degree: string) => {
				const hasNeedLicense = sections.some(
					(section: Section2) => section.need_license == 1
				);
				const deg = degrees.find(
					(deg) => deg.id.toString() == degree
				) as Degree;
				const isSpecialDegree = deg.isSpecial;
				const isOtherDegree = deg.title === 'أخرى';

				return (
					(hasNeedLicense && isSpecialDegree) ||
					!hasNeedLicense ||
					isOtherDegree
				);
			},
			then(schema) {
				return schema.required('الحقل مطلوب');
			},
			otherwise(schema) {
				return schema.nullable();
			},
		}),
	});
	const StepSixValidationSchema = Yup.object({
		photo: Yup.mixed().nullable().notRequired(),
		logo: Yup.mixed().nullable().notRequired(),
	});
	const [formNumber, setFormNumber] = useState(5);
	async function changeForm(formNumber: number) {
		setFormNumber(formNumber);
	}
	const formik = useFormik({
		initialValues: {
			first_name: '',
			second_name: '',
			third_name: '',
			fourth_name: '',
			phone: '',
			email: '',
			password: '',
			password_confirmation: '',
			selectedType: '',
			selectedNationality: '',
			selectedCountry: '',
			selectedRegion: '',
			selectedCity: '',
			gender: '',
			longitude: null,
			latitude: null,
			about: '',
			day: '',
			month: '',
			year: '',
			cv: null,
			company_name: '',
			company_lisences_file: null,
			company_lisences_no: '',
			photo: null,
			logo: null,
			identity_type: '',
			nat_id: '',
			id_file: null,
			general_specialty: '',
			accurate_specialty: '',
			degree: '',
			other_degree: '',
			functional_cases: '',
			degree_certificate: null,
			sections: [],
		},
		validationSchema:
			formNumber === 1
				? StepOneValidationSchema
				: formNumber == 3
				? StepThreeValidationSchema
				: formNumber == 4
				? StepFourValidationSchema
				: formNumber == 5
				? StepFiveValidationSchema
				: StepSixValidationSchema,

		onSubmit: (values) => {
			if (formNumber === 1) {
				// If on step 1, move to step 2
				console.log('heelo');
				const phoneNumber = parsePhoneNumber(
					values.phone
				) as PhoneNumber;
				mutateSendOtp({
					email: values.email,
					phoneNum: phoneNumber.nationalNumber,
					phoneCode: phoneNumber.countryCallingCode,
				});
				setErrors({});
				setFormNumber(2);
			} else if (formNumber === 2) {
			} else if (formNumber === 3) {
				setFormNumber(4);
			} else if (formNumber == 4) {
				setFormNumber(5);
			} else if (formNumber == 5) {
				setFormNumber(6);
			} else {
				const formData = new FormData();
				formData.append('first_name', values.first_name);
				formData.append('second_name', values.second_name);
				formData.append('third_name', values.third_name);
				formData.append('fourth_name', values.fourth_name);
				formData.append('email', values.email);
				formData.append('password', values.password);
				formData.append(
					'password_confirmation',
					values.password_confirmation
				);
				formData.append('accept_rules', '1');
				formData.append('about', values.about);
				formData.append('birth_day', values.day);
				formData.append('birth_month', values.month);
				formData.append('birth_year', values.year);
				formData.append('gender', values.gender);
				formData.append('degree', values.degree);
				formData.append('general_specialty', values.general_specialty);
				formData.append(
					'accurate_specialty',
					values.accurate_specialty
				);
				formData.append('nationality', values.selectedNationality);
				formData.append('country', values.selectedCountry);
				formData.append('region', values.selectedRegion);
				formData.append('city', values.selectedCity);
				formData.append('longitude', values.longitude!);
				formData.append('latitude', values.latitude!);
				formData.append('type', values.selectedType);
				formData.append('identity_type', values.identity_type);
				formData.append('nat_id', values.nat_id);
				formData.append('functional_cases', values.functional_cases);
				if (values.photo) {
					formData.append('photo', values.photo);
				}
				if (values.logo) {
					formData.append('logo', values.logo);
				}
				formData.append('id_file', values.id_file!);
				const phoneNumber = parsePhoneNumber(values.phone);
				formData.append(
					'phone_code',
					phoneNumber?.countryCallingCode as string
				);
				formData.append('phone', phoneNumber?.nationalNumber as string);

				if (values.selectedType == '1') {
					formData.append('cv', values.cv!);
				} else if (
					values.selectedType == '2' ||
					values.selectedType == '3'
				) {
					formData.append(
						'company_lisences_no',
						values.company_lisences_no
					);
					formData.append(
						'company_lisences_file',
						values.company_lisences_file!
					);
				} else {
					formData.append('company_name', values.company_name);
				}
				const degree = degrees.find(
					(deg) => deg.id.toString() == values.degree
				);
				const isSpecialDegree = degree?.isSpecial;
				const isOthersDegree = degree?.title == 'أخرى';
				const sectionsHasLicense = values.sections.some(
					(sec: Section2) => sec.need_license == 1
				);
				if (
					(sectionsHasLicense && isSpecialDegree) ||
					isOthersDegree ||
					!sectionsHasLicense
				) {
					formData.append(
						'degree_certificate',
						values.degree_certificate!
					);
				}
				if (isOthersDegree) {
					formData.append('other_degree', values.other_degree);
				}
				if (values.sections.length > 0) {
					for (let i = 0; i < values.sections.length; i++) {
						let sec = values.sections[i] as {
							id: number;
							name: string;
							need_license: number;
							license_file: File | null;
							licence_no: string;
						};
						console.log('sec', sec);
						formData.append(`sections[${i}]`, sec.id.toString());
						if (sec.need_license) {
							formData.append(
								`licence_no[${sec.id}]`,
								sec.licence_no
							);
							formData.append(
								`license_file[${sec.id}]`,
								sec.license_file!
							);
						}
					}
				}
				mutate(formData);
			}
		},
	});
	const [countries, setCountries] = useState<Country[]>([]);
	const [regions, setRegions] = useState<Region[]>([]);
	const [cities, setCities] = useState<City[]>([]);
	const [nationalities, setNationalities] = useState<Nationality[]>([]);
	const [types] = useState<{ id: string; title: string }[]>([
		{
			id: '1',
			title: 'فرد',
		},
		{ id: '2', title: 'مؤسَّسة' },
		{ id: '3', title: 'شركة' },
		{ id: '4', title: 'جهة حكومية' },
		{ id: '5', title: 'هيئه' },
	]);

	const [latitude, setLatitude] = useState<number | null>(null);
	const [longitude, setLongitude] = useState<number | null>(null);
	const [getLocationButtonDisabled, setGetLocationButtonDisabled] =
		useState(false);
	const [errors, setErrors] = useState<{
		[key: string]: string;
	}>({});
	const router = useRouter();
	const { mutate, isPending, isSuccess } = useMutation({
		mutationFn: lawyerSignup,
		onSuccess: (res: any) => {
			toast.success(res.message);
			router.push('/auth/signin?success=true&successType=true');
		},
		onError: (err: any) => {
			setErrors(err.response.data.data.errors);
			let errorKeys = Object.keys(err.response.data.data.errors);
			if (
				errorKeys.includes('email') ||
				errorKeys.includes('first_name') ||
				errorKeys.includes('second_name') ||
				errorKeys.includes('fourth_name') ||
				errorKeys.includes('phone_code') ||
				errorKeys.includes('phone') ||
				errorKeys.includes('password_confirmation') ||
				errorKeys.includes('password')
			) {
				setFormNumber(1);
			} else if (
				errorKeys.includes('type') ||
				errorKeys.includes('cv') ||
				errorKeys.includes('company_name') ||
				errorKeys.includes('company_lisences_file') ||
				errorKeys.includes('company_lisences_no') ||
				errorKeys.includes('gender') ||
				errorKeys.includes('birth_day') ||
				errorKeys.includes('birth_month') ||
				errorKeys.includes('birth_year') ||
				errorKeys.includes('about')
			) {
				setFormNumber(3);
			} else if (
				errorKeys.includes('country') ||
				errorKeys.includes('region') ||
				errorKeys.includes('city') ||
				errorKeys.includes('nationality') ||
				errorKeys.includes('longitude') ||
				errorKeys.includes('latitude')
			) {
				setFormNumber(4);
			} else if (
				errorKeys.includes('identity_type') ||
				errorKeys.includes('nat_id') ||
				errorKeys.includes('id_file') ||
				errorKeys.includes('functional_cases') ||
				errorKeys.includes('degree') ||
				errorKeys.includes('other_degree') ||
				errorKeys.includes('degree_certificate') ||
				errorKeys.includes('general_specialty') ||
				errorKeys.includes('accurate_specialty')
			) {
				setFormNumber(5);
			}
			return;
		},
	});
	const [degrees, setDegrees] = useState<Degree[]>([]);
	const [GeneralSpecialty, setGeneralSpecialties] = useState([]);
	const [AccurateSpecialty, setAccurateSpecialies] = useState([]);
	const [functional_cases, setFunctionalCases] = useState([]);
	const [sections, setSections] = useState<Section2[]>([]);
	const [avilableSections, setAvailableSections] = useState<Section2[]>([]);
	useEffect(() => {
		async function fetchData() {
			const { data, status } = await fetchCountries();
			if (status == 200) {
				setCountries(data.data.Countries);
			}

			const { data: degreesData, status: statusDegrees } =
				await fetchDegrees();
			if (statusDegrees == 200) {
				setDegrees(degreesData.data.Degrees);
			}
			const {
				data: generalSpecialtyData,
				status: statusGeneralSpecialty,
			} = await fetchGeneralSpecialty();
			if (statusGeneralSpecialty == 200) {
				setGeneralSpecialties(
					generalSpecialtyData.data.GeneralSpecialty
				);
			}
			const {
				data: accurateSpecialtyData,
				status: statusAccurateSpecialty,
			} = await fetchAccurateSpecialty();
			if (statusAccurateSpecialty == 200) {
				setAccurateSpecialies(
					accurateSpecialtyData.data.AccurateSpecialty
				);
			}

			const { data: functionalCasesData, status: statusFunctionalCases } =
				await fetchFunctionalCases();
			if (statusFunctionalCases == 200) {
				setFunctionalCases(functionalCasesData.data.FunctionalCases);
			}
			const { data: sectionsData, status: statusSections } =
				await fetchSections();
			if (statusSections == 200) {
				setSections(sectionsData.data.DigitalGuideCategories);
				setAvailableSections(sectionsData.data.DigitalGuideCategories);
			}

			const { data: nationalitiesData, status: nationalitiesStatus } =
				await fetchNationalities();
			if (nationalitiesStatus == 200) {
				setNationalities(nationalitiesData.data.nationalities);
			}
		}
		fetchData();
	}, []);
	function getLocation() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((position) => {
				setLatitude(position.coords.latitude);
				setLongitude(position.coords.longitude);
				setGetLocationButtonDisabled(true);
				console.log('hello');
				formik.setFieldValue('latitude', position.coords.latitude);
				formik.setFieldValue('longitude', position.coords.longitude);
			});
		}
	}
	useEffect(() => {
		if (formik.values.longitude != null && formik.values.latitude != null) {
			formik.validateForm();
		}
	}, [formik.values]);
	useEffect(
		() => console.log(formik.errors, formik.isValid),
		[formik.errors]
	);
	useEffect(() => {
		if (countries.length > 0 && formik.values.selectedCountry != '') {
			const selectedCountryObj = countries.find(
				(country) =>
					country.id.toString() === formik.values.selectedCountry
			);
			setRegions(selectedCountryObj?.regions as Region[]);
			setCities([]);
			formik.setFieldValue('selectedRegion', '');
			formik.setFieldValue('selectedCity', '');
		}
	}, [formik.values.selectedCountry]);
	useEffect(() => {
		if (formik.values.selectedCountry && formik.values.selectedRegion) {
			const selectedCountryObj = countries.find(
				(country) =>
					country.id.toString() === formik.values.selectedCountry
			);
			if (selectedCountryObj) {
				const selectedRegionObj = selectedCountryObj.regions?.find(
					(region) =>
						region.id == parseInt(formik.values.selectedRegion)
				);
				if (selectedRegionObj) {
					setCities(selectedRegionObj.cities as City[]);
					formik.setFieldValue('selectedCity', '');
				}
			}
		}
	}, [formik.values.selectedRegion]);
	useEffect(() => {
		console.log(errors);
	}, [errors]);
	const [OTP, setOTP] = useState<string[]>(Array(4).fill(''));
	const {
		mutate: mutateSendOtp,
		isPending: sendOtpIsPending,
		isSuccess: sendOtpIsSuccess,
	} = useMutation({
		mutationFn: LawyerSignupFirstRequest,
		onSuccess: (res: any) => {
			if (res.code == 200) {
				toast.success(res.message);
			}
		},
		onError: (err: AxiosError) => {
			//@ts-ignore
			setErrors(err.response?.data?.data.errors);
			//@ts-ignore
			let errorKeys = Object.keys(err.response.data.data.errors);

			if (
				errorKeys.includes('email') ||
				errorKeys.includes('phone_code') ||
				errorKeys.includes('phone')
			) {
				setFormNumber(1);
			}
		},
	});
	const {
		mutate: mutateCheckOtp,
		isPending: checkOtpIsPending,
		isSuccess: checkOtpIsSuccess,
	} = useMutation({
		mutationFn: LawyerSignupSecondRequest,
		onSuccess: () => {
			toast.success('تم تأكيد رمز الحساب');
			changeForm(3);
		},
		onError: (err: AxiosError) => {
			console.log(err);
			//@ts-ignore
			console.log(err.response?.data?.message);
			//@ts-ignore
			setErrors({ otp: err.response?.data?.message });
		},
	});
	useEffect(() => {
		if (OTP.every((digit) => digit != '')) {
			const phoneNumber = parsePhoneNumber(
				formik.values.phone
			) as PhoneNumber;

			mutateCheckOtp({
				email: formik.values.email,
				phoneNum: phoneNumber.nationalNumber,
				phoneCode: phoneNumber.countryCallingCode,
				otpString: OTP.join(''),
			});
		}
	}, [OTP]);
	const CountrySelect = ({
		value,
		onChange,
		labels,
		...rest
	}: {
		value: any;
		onChange: any;
		labels: any;
	}) => (
		<select
			{...rest}
			value={value}
			onChange={(event) => onChange(event.target.value || undefined)}
		>
			<option value="">{labels['ZZ']}</option>
			{getCountries().map((country) => (
				<option key={country} value={getCountryCallingCode(country)}>
					{labels[country]} +{getCountryCallingCode(country)}
				</option>
			))}
		</select>
	);
	useEffect(
		() => console.log(parsePhoneNumber(formik.values.phone)),
		[formik.values]
	);
	return (
		<div
			className={`flex flex-col ${
				formNumber == 2 && 'pt-10'
			} w-full gap-[25px] ${className}`}
		>
			<button
				onClick={() =>
					formNumber == 1
						? setCurrentScreen()
						: setFormNumber(formNumber - 1)
				}
				className="self-end flex items-center gap-3"
			>
				<span>الرجوع</span>
				<FaAngleLeft />
			</button>
			<h1 className="font-bold w-full text-center text-2xl">
				إنشاء حساب مقدم خدمة
			</h1>
			<form
				onSubmit={formik.handleSubmit}
				className="flex flex-col gap-[25px]"
			>
				{formNumber == 1 && (
					<>
						<div className="w-full gap-2 flex flex-row">
							<TextInput
								name="first_name"
								type="text"
								label="الاسم الأول"
								className="w-full"
								onChange={formik.handleChange}
								value={formik.values.first_name}
								error={
									(formik.touched.first_name &&
									formik.errors.first_name
										? formik.errors.first_name
										: '') || errors?.first_name
								}
							/>
							<TextInput
								name="second_name"
								type="text"
								label="الاسم الثاني"
								className="w-full"
								onChange={formik.handleChange}
								value={formik.values.second_name}
								error={
									(formik.touched.second_name &&
									formik.errors.second_name
										? formik.errors.second_name
										: '') || errors?.second_name
								}
							/>
						</div>
						<div className="w-full gap-2 flex flex-row">
							<TextInput
								name="third_name"
								type="text"
								label="الاسم الثالث"
								className="w-full"
								onChange={formik.handleChange}
								value={formik.values.third_name}
								error={
									(formik.touched.third_name &&
									formik.errors.third_name
										? formik.errors.third_name
										: '') || errors?.third_name
								}
							/>
							<TextInput
								name="fourth_name"
								type="text"
								label="الاسم الرابع"
								className="w-full"
								onChange={formik.handleChange}
								value={formik.values.fourth_name}
								error={
									(formik.touched.fourth_name &&
									formik.errors.fourth_name
										? formik.errors.fourth_name
										: '') || errors?.fourth_name
								}
							/>
						</div>
						<TextInput
							name="email"
							type="email"
							label="البريد الإلكتروني"
							value={formik.values.email}
							onChange={formik.handleChange}
							error={
								(formik.touched.email && formik.errors.email
									? formik.errors.email
									: '') || errors?.email
							}
						/>
						<div className="flex w-full gap-4">
							<div className="flex flex-col gap-1">
								<label className="text-[#696F79]">الجوال</label>
								<PhoneInput
									name="phone"
									value={formik.values.phone}
									onChange={(value) =>
										formik.setFieldValue('phone', value)
									}
									defaultCountry="SA"
									addInternationalOption={false}
									onBlur={() =>
										formik.setFieldTouched('phone', true)
									}
									labels={ar}
									className={`w-full gap-4 rounded border-[1.5px] border-stroke bg-transparent py-[9px] px-5 text-black outline-none transition focus:border-primary active:border-primary ${
										formik.touched.phone &&
										formik.errors.phone
											? 'border-red-500'
											: ''
									}`}
								/>
								{formik.touched.phone &&
									formik.errors.phone && (
										<div className="text-red-500">
											{formik.errors.phone}
										</div>
									)}
							</div>
						</div>

						<TextInput
							value={formik.values.password}
							name="password"
							type="password"
							onChange={formik.handleChange}
							label="كلمة المرور"
							error={
								(formik.touched.password &&
									(formik.errors.password
										? formik.errors.password
										: '')) ||
								errors?.password
							}
						/>
						<TextInput
							value={formik.values.password_confirmation}
							name="password_confirmation"
							type="password"
							onChange={formik.handleChange}
							label="تأكيد كلمة المرور"
							error={
								formik.touched.password_confirmation &&
								formik.errors.password_confirmation
									? formik.errors.password_confirmation
									: ''
							}
						/>

						<MainButton type="submit">التالي</MainButton>
					</>
				)}
				{formNumber == 2 && (
					<div className="flex flex-col gap-4 items-center justify-center">
						{errors.otp && (
							<div className="bg-red-400 flex w-full p-4 text-white rounded-lg">
								{errors.otp == 'invalid_data'
									? 'الرمز فير صحيح'
									: errors.otp}
							</div>
						)}
						<OTPForm
							onComplete={() => {
								const phoneNumber = parsePhoneNumber(
									formik.values.phone
								) as PhoneNumber;

								mutateCheckOtp({
									email: formik.values.email,
									phoneCode: phoneNumber.countryCallingCode,
									phoneNum: phoneNumber.nationalNumber,
									otpString: OTP.join(''),
								});
							}}
							OTP={OTP}
							setOTP={setOTP}
							isPending={isPending}
						/>
					</div>
				)}
				{formNumber == 3 && (
					<>
						<SelectGroup
							options={types}
							selectedOption={formik.values.selectedType}
							setSelectedOption={(value) =>
								formik.setFieldValue('selectedType', value)
							}
							title="الصفة"
							placeholder="اختر الصفة"
							error={
								(formik.touched.selectedType &&
								formik.errors.selectedType
									? formik.errors.selectedType
									: '') || errors?.type
							}
						/>

						{formik.values.selectedType == '1' && (
							<UploadFile
								handleChange={(event: any) => {
									event.preventDefault();
									formik.setFieldValue(
										'cv',
										event.currentTarget.files![0]
									);
								}}
								//@ts-ignore
								value={formik.values.cv}
								name="cv"
								text="إرفاق السيرة الذاتية"
								error={
									(formik.touched.cv && formik.errors.cv
										? formik.errors.cv
										: '') || errors?.cv
								}
							/>
						)}
						{formik.values.selectedType == '2' && (
							<>
								<TextInput
									value={formik.values.company_lisences_no}
									name="company_lisences_no"
									type="text"
									onChange={formik.handleChange}
									label="رقم السجل التجاري"
									error={
										formik.touched.company_lisences_no &&
										formik.errors.company_lisences_no
											? formik.errors.company_lisences_no
											: ''
									}
								/>
								<UploadFile
									//@ts-ignore
									//prettier-ignore
									value={formik.values.company_lisences_file}
									handleChange={(event: any) => {
										event.preventDefault();
										formik.setFieldValue(
											'company_lisences_file',
											event.currentTarget.files![0]
										);
									}}
									name="company_lisences_file"
									text="إرفاق نسخه من السجل التجاري ( إجباري )"
									error={
										(formik.touched.company_lisences_file &&
										formik.errors.company_lisences_file
											? formik.errors
													.company_lisences_file
											: '') ||
										errors?.company_lisences_file
									}
								/>
							</>
						)}
						{formik.values.selectedType == '4' && (
							<TextInput
								value={formik.values.company_name}
								name="company_name"
								type="text"
								onChange={formik.handleChange}
								label="اسم الجهه"
								error={
									formik.touched.company_name &&
									formik.errors.company_name
										? formik.errors.company_name
										: ''
								}
							/>
						)}
						{formik.values.selectedType == '3' && (
							<>
								<TextInput
									value={formik.values.company_lisences_no}
									name="company_lisences_no"
									type="text"
									onChange={formik.handleChange}
									label="رقم السجل التجاري"
									error={
										formik.touched.company_lisences_no &&
										formik.errors.company_lisences_no
											? formik.errors.company_lisences_no
											: ''
									}
								/>
								<UploadFile
									//@ts-ignore
									//prettier-ignore
									value={formik.values.company_lisences_file}
									handleChange={(event: any) => {
										event.preventDefault();
										formik.setFieldValue(
											'company_lisences_file',
											event.currentTarget.files![0]
										);
									}}
									name="company_lisences_file"
									text="إرفاق نسخه من السجل التجاري ( إجباري )"
									error={
										(formik.touched.company_lisences_file &&
										formik.errors.company_lisences_file
											? formik.errors
													.company_lisences_file
											: '') ||
										errors?.company_lisences_file
									}
								/>
							</>
						)}
						{formik.values.selectedType == '5' && (
							<TextInput
								value={formik.values.company_name}
								name="company_name"
								type="text"
								onChange={formik.handleChange}
								label="اسم الهيئه"
								error={
									formik.touched.company_name &&
									formik.errors.company_name
										? formik.errors.company_name
										: ''
								}
							/>
						)}
						<div className="flex flex-col w-full gap-[5px]">
							<label className={`text-[16px] text-[#696F79]`}>
								نبذه مختصرة
							</label>
							<textarea
								name="about"
								onChange={formik.handleChange}
								value={formik.values.about}
								rows={4}
								className={`text-[16px] w-full px-[12px] py-[12px] border border-gray rounded-md bg-[#F9F9F9] focus:ring-0 dark:focus:ring-0 dark:focus:outline-darkPrimary focus:outline-primary ${className} ${
									(formik.touched.about && formik.errors.about
										? formik.errors.about
										: '') || errors?.type
										? 'border-red-500'
										: ''
								}`}
							/>

							{(formik.touched.about && formik.errors.about
								? formik.errors.about
								: '') || errors?.about ? (
								<span className="text-red-500 text-sm">
									{(formik.errors.about
										? formik.errors.about
										: '') || errors?.about}
								</span>
							) : (
								''
							)}
						</div>
						<div className="flex gap-4">
							<select
								name="day"
								value={formik.values.day}
								onChange={formik.handleChange}
								className="w-full px-2 py-1 outline-[#DDB762] text-[#696F79] border border-gray-300 rounded"
								required
								style={{ appearance: 'menulist' }}
							>
								<option disabled value="">
									اليوم
								</option>

								{Array.from(
									{ length: 31 },
									(_, i) => i + 1
								).map((day) => (
									<option key={day} value={day.toString()}>
										{day}
									</option>
								))}
							</select>

							<select
								name="month"
								value={formik.values.month}
								onChange={formik.handleChange}
								className="w-full px-2 py-1 outline-[#DDB762] text-[#696F79] border border-gray-300 rounded"
								required
							>
								<option disabled value="">
									الشهر
								</option>

								{Array.from(
									{ length: 12 },
									(_, i) => i + 1
								).map((month) => (
									<option
										key={month}
										value={month.toString()}
									>
										{month}
									</option>
								))}
							</select>

							<select
								name="year"
								value={formik.values.year}
								onChange={formik.handleChange}
								className="w-full px-2 py-1 outline-[#DDB762] text-[#696F79] border border-gray-300 rounded"
								required
							>
								<option disabled value="">
									السنة
								</option>

								{Array.from(
									{ length: 90 },
									(_, i) => new Date().getFullYear() - i
								).map((year) => (
									<option key={year} value={year.toString()}>
										{year}
									</option>
								))}
							</select>
						</div>

						<SelectGroup
							options={[
								{ id: 'Male', title: 'ذكر' },
								{ id: 'Female', title: 'أنثى' },
							]}
							title="الجنس"
							placeholder="اختر الجنس"
							selectedOption={formik.values.gender}
							setSelectedOption={(value) =>
								formik.setFieldValue('gender', value)
							}
							error={
								(formik.touched.gender && formik.errors.gender
									? formik.errors.gender
									: '') || errors?.gender
							}
						/>
						<MainButton type="submit">التالي</MainButton>
					</>
				)}
				{formNumber == 4 && (
					<>
						<SelectGroup
							options={nationalities}
							selectedOption={formik.values.selectedNationality}
							setSelectedOption={(value) =>
								formik.setFieldValue(
									'selectedNationality',
									value
								)
							}
							title="الجنسية"
							placeholder="اختر الجنسية"
							error={
								(formik.touched.selectedNationality &&
								formik.errors.selectedNationality
									? formik.errors.selectedNationality
									: '') || errors?.nationality_id
							}
						/>
						<button
							disabled={getLocationButtonDisabled}
							onClick={getLocation}
							type="button"
							className="bg-blue group flex disabled:justify-center justify-between items-center  relative font-medium w-full  text-white  rounded-lg p-[15px] text-[18px] disabled:bg-green-500"
						>
							<p>
								{getLocationButtonDisabled
									? 'تم اختيار الموقع بنجاح'
									: 'اختر الموقع'}
							</p>
							<FaLocationArrow className="block group-disabled:hidden" />
						</button>
						<SelectGroup
							options={countries}
							title="الدولة"
							placeholder="اختر الدولة"
							selectedOption={formik.values.selectedCountry}
							setSelectedOption={(value) =>
								formik.setFieldValue('selectedCountry', value)
							}
							error={
								(formik.touched.selectedCountry &&
								formik.errors.selectedCountry
									? formik.errors.selectedCountry
									: '') || errors?.country_id
							}
						/>
						<SelectGroup
							options={regions}
							title="المنطقة"
							placeholder="اختر المنطقة"
							selectedOption={formik.values.selectedRegion}
							setSelectedOption={(value) =>
								formik.setFieldValue('selectedRegion', value)
							}
							error={
								(formik.touched.selectedRegion &&
								formik.errors.selectedRegion
									? formik.errors.selectedRegion
									: '') || errors?.region_id
							}
						/>
						<SelectGroup
							options={cities}
							title="المدينة"
							placeholder="اختر المدينة"
							selectedOption={formik.values.selectedCity}
							setSelectedOption={(value) =>
								formik.setFieldValue('selectedCity', value)
							}
							error={
								(formik.touched.selectedCity &&
								formik.errors.selectedCity
									? formik.errors.selectedCity
									: '') || errors?.city_id
							}
						/>
						<MainButton type="submit">التالي</MainButton>
					</>
				)}

				{formNumber == 5 && (
					<>
						<SelectGroup
							options={idTypes}
							selectedOption={formik.values.identity_type}
							setSelectedOption={(value) =>
								formik.setFieldValue('identity_type', value)
							}
							title="نوع الهوية"
							placeholder=""
							error={
								(formik.touched.identity_type &&
								formik.errors.identity_type
									? formik.errors.identity_type
									: '') || errors?.identity_type
							}
						/>
						{formik.values.identity_type != '' && (
							<div className="flex flex-col gap-4 justify-center items-center">
								<TextInput
									value={formik.values.nat_id}
									name="nat_id"
									type={
										formik.values.identity_type == '2'
											? 'text'
											: 'number'
									}
									onChange={(e) => {
										if (
											formik.values.identity_type != '2'
										) {
											if (e.target.value.length > 10) {
												e.target.value =
													e.target.value.slice(0, 10);
											} else {
												formik.handleChange(e);
											}
										} else {
											formik.handleChange(e);
										}
									}}
									label="رقم الهوية"
									error={
										formik.touched.nat_id &&
										formik.errors.nat_id
											? formik.errors.nat_id
											: ''
									}
									maxLength={9}
								/>
								<UploadFile
									//@ts-ignore
									value={formik.values.id_file}
									handleChange={(event: any) => {
										event.preventDefault();
										formik.setFieldValue(
											'id_file',
											event.currentTarget.files![0]
										);
									}}
									name="id_file"
									text="إرفاق نسخه من الهويه"
									error={
										(formik.touched.id_file &&
										formik.errors.id_file
											? formik.errors.id_file
											: '') || errors?.id_file
									}
								/>
							</div>
						)}
						<SelectGroup
							options={functional_cases}
							title="الحاله الوظيفية"
							placeholder="اختر الحاله الوظيفية"
							selectedOption={formik.values.functional_cases}
							setSelectedOption={(value) =>
								formik.setFieldValue('functional_cases', value)
							}
							error={
								(formik.touched.functional_cases &&
								formik.errors.functional_cases
									? formik.errors.functional_cases
									: '') || errors?.functional_cases
							}
						/>
						<MultiSelectDropdown
							label="المهنة"
							name="sections"
							options={sections}
							handleChange={(selectedOptions: any) =>
								formik.setFieldValue(
									'sections',
									selectedOptions
										? selectedOptions.map((op: any) => ({
												id: op.value,
												need_license: sections.find(
													(s) => s.id == op.value
												)?.need_license,
												name: sections.find(
													(s) => s.id == op.value
												)?.title,
												licence_no: '',
												license_file: null,
										  }))
										: []
								)
							}
							selectedOptions={formik.values.sections}
						/>
						{formik.values.sections.length > 0 &&
							formik.values.sections
								.filter((s: any) => s.need_license)
								.map((section: any, index: number) => (
									<div
										key={section.id}
										className="flex flex-row w-full gap-2"
									>
										<TextInput
											value={section.licence_no}
											name="licence_no"
											type="number"
											placeholder={`رقم ترخيص ${section.name}`}
											onChange={(e) =>
												formik.setFieldValue(
													'sections',
													formik.values.sections.map(
														(s: any) =>
															s.id == section.id
																? {
																		...s,
																		licence_no:
																			e
																				.target
																				.value,
																  }
																: s
													)
												)
											}
											label="رقم الترخيص"
											error={
												//@ts-ignore
												//prettier-ignore
												formik.errors.sections && formik.errors.sections.length > 0 && (formik.errors.sections[index]?.licence_no || formik.errors.sections[index]?.license_file)
											}
										/>
										<div className="flex w-[15%]">
											<UploadFile
												value={
													//@ts-ignore
													//prettier-ignore
													formik.values.sections.find((s: any) =>s.id == section.id)?.license_file
												}
												handleChange={(e: any) => {
													e.preventDefault();
													formik.setFieldValue(
														'sections',
														formik.values.sections.map(
															(s: any) =>
																s.id ==
																section.id
																	? {
																			...s,
																			license_file:
																				e
																					.currentTarget
																					.files![0],
																	  }
																	: s
														)
													);
												}}
												name={`license_file_${section.id}`}
												text=""
												className="py-2 px-2"
												imageHeight="h-[32px]"
												label=" "
											/>
										</div>
									</div>
								))}
						<SelectGroup
							options={degrees}
							title="الدرجه العلميه"
							placeholder="اختر الدرجه العلميه"
							selectedOption={formik.values.degree}
							setSelectedOption={(value) =>
								formik.setFieldValue('degree', value)
							}
							error={
								(formik.touched.degree && formik.errors.degree
									? formik.errors.degree
									: '') || errors?.degree
							}
						/>
						{degrees.find(
							(deg) => deg.id.toString() == formik.values.degree
						)?.title == 'أخرى' ? (
							<TextInput
								value={formik.values.other_degree}
								name="other_degree"
								type="text"
								onChange={formik.handleChange}
								label="اسم الدرجة"
								error={
									formik.touched.other_degree &&
									formik.errors.other_degree
										? formik.errors.other_degree
										: ''
								}
							/>
						) : (
							''
						)}
						{(formik.values.sections.some(
							(sec: any) => sec.need_license == 1
						) &&
							degrees.find(
								(deg) =>
									deg.id.toString() == formik.values.degree
							)?.isSpecial) ||
						degrees.find(
							(deg) => deg.id.toString() == formik.values.degree
						)?.title == 'أخرى' ||
						!formik.values.sections.some(
							(sec: any) => sec.need_license == 1
						) ? (
							<UploadFile
								//@ts-ignore
								value={formik.values.degree_certificate}
								handleChange={(event: any) => {
									event.preventDefault();
									formik.setFieldValue(
										'degree_certificate',
										event.currentTarget.files![0]
									);
								}}
								name="degree_certificate"
								text="إرفاق نسخه من شهادة الدرجة العلمية"
								error={
									(formik.touched.degree_certificate &&
									formik.errors.degree_certificate
										? formik.errors.degree_certificate
										: '') || errors?.degree_certificate
								}
							/>
						) : (
							''
						)}

						<SelectGroup
							options={GeneralSpecialty}
							title="التخصص العام"
							placeholder="اختر التخصص العام"
							selectedOption={formik.values.general_specialty}
							setSelectedOption={(value) =>
								formik.setFieldValue('general_specialty', value)
							}
							error={
								(formik.touched.general_specialty &&
								formik.errors.general_specialty
									? formik.errors.general_specialty
									: '') || errors?.general_specialty
							}
						/>
						<SelectGroup
							options={AccurateSpecialty}
							title="التخصص الدقيق"
							placeholder="اختر التخصص الدقيق"
							selectedOption={formik.values.accurate_specialty}
							setSelectedOption={(value) =>
								formik.setFieldValue(
									'accurate_specialty',
									value
								)
							}
							error={
								(formik.touched.accurate_specialty &&
								formik.errors.accurate_specialty
									? formik.errors.accurate_specialty
									: '') || errors?.accurate_specialty
							}
						/>

						<MainButton type="submit">التالي</MainButton>
					</>
				)}
				{formNumber == 6 && (
					<div className="flex w-full flex-col justify-center items-center gap-6">
						<UploadFile
							//@ts-ignore
							value={formik.values.photo}
							handleChange={(event: any) => {
								event.preventDefault();
								formik.setFieldValue(
									'photo',
									event.currentTarget.files![0]
								);
							}}
							name="photo"
							text="إرفاق الصورة الشخصية (اختياري)"
							error={
								(formik.touched.photo && formik.errors.photo
									? formik.errors.photo
									: '') || errors?.photo
							}
						/>
						<UploadFile
							handleChange={(event: any) => {
								event.preventDefault();
								formik.setFieldValue(
									'logo',
									event.currentTarget.files![0]
								);
							}}
							//@ts-ignore
							value={formik.values.logo}
							name="logo"
							text="إرفاق الشعار (اجباري للشركات والمؤسسات)"
							error={
								(formik.touched.logo && formik.errors.logo
									? formik.errors.logo
									: '') || errors?.logo
							}
						/>
						<MainButton
							type="submit"
							disabled={!formik.isValid || isPending}
							isLoading={isPending}
						>
							إنشاء حساب
						</MainButton>
					</div>
				)}
			</form>
		</div>
	);
}

export default LawyerSignup;
