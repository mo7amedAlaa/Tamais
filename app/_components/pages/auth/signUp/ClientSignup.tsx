/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import {
	City,
	Country,
	Nationality,
	Region,
} from '@/app/_api/interfaces/UserProfileResponse';
import {
	fetchCountries,
	fetchNationalities,
} from '@/app/_api/queries/profile.query';
import TextInput from '@/app/_components/ui/TextInput';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import SelectGroup from '../common/SelectGroup';
import MainButton from '@/app/_components/ui/MainButton';
import { FaAngleLeft, FaLocationArrow } from 'react-icons/fa';
import { useMutation } from '@tanstack/react-query';
import { clientSignup } from '@/app/_api/queries/auth.query';
import Link from 'next/link';
import { Screens } from './SignUpPage';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import PhoneInputWithCountrySelect, {
	isValidPhoneNumber,
	parsePhoneNumber,
	PhoneNumber,
} from 'react-phone-number-input';
import ar from 'react-phone-number-input/locale/ar';
function ClientSignup({
	className,
	setCurrentScreen,
}: {
	className: string;
	setCurrentScreen: any;
}) {
	const StepOneValidationSchema = Yup.object({
		name: Yup.string().required('الحقل مطلوب'),
		phone: Yup.string()
			.required('الحقل مطلوب')
			.test('is-valid-phone', 'رقم الهاتف غير صحيح', (value) => {
				return value ? isValidPhoneNumber(value) == true : false;
			}),
		email: Yup.string()
			.email('هذا الأيميل غير صحيح')
			.required('الحقل مطلوب'),
		password: Yup.string().required('الحقل مطلوب'),
		confirmPassword: Yup.string()
			.oneOf([Yup.ref('password'), undefined], 'يجب تطابق كلمة المرور')
			.required('الحقل مطلوب'),
	});

	const StepTwoValidationSchema = Yup.object({
		selectedType: Yup.string().required('الحقل مطلوب'),
		selectedGender: Yup.string().required('الحقل مطلوب'),
		selectedCountry: Yup.string().required('الحقل مطلوب'),
		selectedRegion: Yup.string().required('الحقل مطلوب'),
		selectedCity: Yup.string().required('الحقل مطلوب'),
		selectedNationality: Yup.string().required('الحقل مطلوب'),
		latitude: Yup.number().nullable().required('الحقل مطلوب'),
		longitude: Yup.number().nullable().required('الحقل مطلوب'),
	});
	const [formNumber, setFormNumber] = useState(1);
	async function changeForm(formNumber: number) {
		setFormNumber(formNumber);
	}
	const formik = useFormik({
		initialValues: {
			name: '',
			phone: '',
			email: '',
			password: '',
			confirmPassword: '',
			selectedType: '',
			selectedNationality: '',
			selectedCountry: '',
			selectedRegion: '',
			selectedCity: '',
			selectedGender: '',
			longitude: null,
			latitude: null,
		},
		validationSchema:
			formNumber === 1
				? StepOneValidationSchema
				: StepTwoValidationSchema,

		onSubmit: (values) => {
			if (formNumber === 1) {
				// If on step 1, move to step 2
				setFormNumber(2);
			} else {
				// If on step 2, submit the form
				console.log(values);
				const phoneNumber = parsePhoneNumber(
					values.phone
				) as PhoneNumber;
				mutate({
					...values,
					phone_code: phoneNumber.countryCallingCode,
					mobile: phoneNumber.nationalNumber,
					activation_type:
						phoneNumber.countryCallingCode == '966' ? 2 : 1,
					type: values.selectedType,
					gender: values.selectedGender,
					nationality_id: values.selectedNationality,
					country_id: values.selectedCountry,
					city_id: values.selectedCity,
					region_id: values.selectedRegion,
				});
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
	]);

	const [latitude, setLatitude] = useState<number | null>(null);
	const [longitude, setLongitude] = useState<number | null>(null);
	const [getLocationButtonDisabled, setGetLocationButtonDisabled] =
		useState(false);
	const [errors, setErrors] = useState<{
		[key: string]: string;
	}>({});
	const { mutate, isPending, isSuccess } = useMutation({
		mutationFn: clientSignup,
		onSuccess: (res: any) => {
			if (res.code == 422) {
				setErrors(res.data.errors);
				let errorKeys = Object.keys(res.data.errors);
				if (
					errorKeys.includes('email') ||
					errorKeys.includes('name') ||
					errorKeys.includes('phone_code') ||
					errorKeys.includes('mobile') ||
					errorKeys.includes('password')
				) {
					setFormNumber(1);
				}
				return;
			}
			toast.success(res.message);
			localStorage.setItem('client_id', res.data.client.id);
			setCurrentScreen(Screens.CONFIRM_OTP);
		},
		onError(err: any) {
			toast.error(err.response.data.message);
			setErrors(err.response.data.data.errors);
			let errorKeys = Object.keys(err.response.data.data.errors);
			if (
				errorKeys.includes('email') ||
				errorKeys.includes('name') ||
				errorKeys.includes('phone_code') ||
				errorKeys.includes('mobile') ||
				errorKeys.includes('password')
			) {
				setFormNumber(1);
			}
		},
	});
	useEffect(() => {
		if (formik.values.longitude != null && formik.values.latitude != null) {
			formik.validateForm();
		}
	}, [formik.values]);
	useEffect(() => {
		async function fetchData() {
			const { data, status } = await fetchCountries();
			if (status == 200) {
				setCountries(data.data.Countries);
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
	useEffect(() => console.log(formik.values), [formik.values]);
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

	return (
		<div
			className={`flex flex-col ${
				formNumber == 2 && 'pt-10'
			} w-full gap-[25px] ${className}`}
		>
			<button
				onClick={() =>
					formNumber == 1 ? setCurrentScreen() : setFormNumber(1)
				}
				className="self-end flex items-center gap-3"
			>
				<span>الرجوع</span>
				<FaAngleLeft />
			</button>
			<h1 className="font-bold w-full text-center text-2xl">
				إنشاء حساب طالب خدمة
			</h1>
			<form
				onSubmit={formik.handleSubmit}
				className="flex flex-col gap-[25px]"
			>
				{formNumber == 1 && (
					<>
						<TextInput
							name="name"
							type="text"
							label="الاسم بالكامل"
							className="w-full"
							onChange={formik.handleChange}
							value={formik.values.name}
							error={
								(formik.touched.name && formik.errors.name
									? formik.errors.name
									: '') || errors?.name
							}
						/>
						<div className="flex w-full gap-4">
							<div className="flex flex-col gap-1">
								<label className="text-[#696F79]">الجوال</label>
								<PhoneInputWithCountrySelect
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
							value={formik.values.confirmPassword}
							name="confirmPassword"
							type="password"
							onChange={formik.handleChange}
							label="تأكيد كلمة المرور"
							error={
								formik.touched.confirmPassword &&
								formik.errors.confirmPassword
									? formik.errors.confirmPassword
									: ''
							}
						/>

						<MainButton type="submit">التالي</MainButton>
					</>
				)}
				{formNumber == 2 && (
					<>
						<SelectGroup
							options={types}
							selectedOption={formik.values.selectedType}
							setSelectedOption={(value) =>
								formik.setFieldValue('selectedType', value)
							}
							title="نوع الحساب"
							placeholder="اختر نوع الحساب"
							error={
								(formik.touched.selectedType &&
								formik.errors.selectedType
									? formik.errors.selectedType
									: '') || errors?.type
							}
						/>
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
						<SelectGroup
							options={[
								{ id: 'Male', title: 'ذكر' },
								{ id: 'Female', title: 'أنثى' },
							]}
							title="الجنس"
							placeholder="اختر الجنس"
							selectedOption={formik.values.selectedGender}
							setSelectedOption={(value) =>
								formik.setFieldValue('selectedGender', value)
							}
							error={
								(formik.touched.selectedGender &&
								formik.errors.selectedGender
									? formik.errors.selectedGender
									: '') || errors?.gender
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
						<MainButton
							type="submit"
							disabled={!formik.isValid || isPending}
							isLoading={isPending}
						>
							إنشاء حساب
						</MainButton>
					</>
				)}
			</form>
		</div>
	);
}

export default ClientSignup;
