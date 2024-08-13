/* eslint-disable react-hooks/exhaustive-deps */
//@ts-nocheck
'use client';
import {
	Country,
	Region,
	Section,
	Section2,
	UserProfileResponse,
} from '@/app/_api/interfaces/UserProfileResponse';
import {
	fetchAccurateSpecialty,
	fetchCountries,
	fetchDegrees,
	fetchFunctionalCases,
	fetchGeneralSpecialty,
	fetchNationalities,
	fetchSections,
	fetchTypes,
	updateClientProfile,
	updateLawyerProfile,
} from '@/app/_api/queries/profile.query';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ChangeEvent, useEffect, useState } from 'react';
import SelectGroup from '../../auth/common/SelectGroup';
import { PROFILE_TYPE } from '@/app/_helpers/config/constants';
import { UserTypes } from '@/app/types/enums';
import DatePicker from '../../auth/common/DatePicker';
import { FaPlus, FaTrash, FaUserEdit } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import {
	FaClipboardList,
	FaGear,
	FaHeart,
	FaLocationArrow,
	FaPhone,
	FaUser,
} from 'react-icons/fa6';
import ProtectedRoute from '@/app/_helpers/middleware/ProtectedRoute';
import Link from 'next/link';
import OTPForm from '../../auth/common/otp/OTPForm';
import { clientActivate } from '@/app/_api/queries/auth.query';
import { parsePhoneNumber, PhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

function EditProfileForm() {
	const [currentStep, setCurrentStep] = useState(0);

	let profileType = localStorage.getItem(PROFILE_TYPE);
	let { data: updatedClient } = useQuery<UserProfileResponse>({
		queryKey: ['profile'],
	});
	const [profile, setProfile] = useState(updatedClient);

	const [getLocationButtonDisabled, setGetLocationButtonDisabled] =
		useState(false);
	const [cities, setCities] = useState([]);
	const [countries, setCountries] = useState<Country[]>([]);
	const [regions, setRegions] = useState([]);
	const [nationalities, setNationalities] = useState([]);
	const [types, setTypes] = useState([]);
	const [degrees, setDegrees] = useState([]);
	const [GeneralSpecialty, setGeneralSpecialties] = useState([]);
	const [AccurateSpecialty, setAccurateSpecialies] = useState([]);
	const [functional_cases, setFunctionalCases] = useState([]);
	const [degreeCertificate, setDegreeCertificate] = useState(null);
	const [cv, setCVFile] = useState(null);
	const [companyLicensesFile, setCompanyLicensesFile] = useState(null);
	const [idFile, setIdFile] = useState(null);
	const [sections, setSections] = useState<Section2[]>([]);
	const [avilableSections, setAvailableSections] = useState<Section2[]>([]);
	const [sectionsToBeAdded, setSectionsToBeAdded] = useState<
		{
			section_id: string | number;
			sectionLicenseNo: any;
			sectionLicenseFile: any;
		}[]
	>([]);
	const [selectedSection, setSelectedSection] = useState('');
	const [sectionLicenseNo, setSectionLicenseNo] = useState('');
	const [sectionLicenseFile, setSectionLicenseFile] = useState(null);
	const [profileImage, setProfileImage] = useState(null);
	const [logo, setLogo] = useState(null);
	useEffect(() => {
		async function fetchSelect() {
			const { data: countriesData, status: statusCountries } =
				await fetchCountries();
			console.log(statusCountries);
			if (statusCountries == 200) {
				setCountries(countriesData.data.Countries);
				setRegions(
					countriesData.data.Countries.find(
						(country: { id: number | undefined }) =>
							country.id == profile?.country?.id
					).regions
				);
				setCities(
					countriesData.data.Countries.find(
						(country: { id: number | undefined }) =>
							country.id == profile?.country?.id
					).regions.find(
						(region: { id: number | undefined }) =>
							region.id == profile?.region?.id
					).cities
				);
			}
			if (profileType == UserTypes.LAWYER) {
				const { data: typesData, status: statusTypes } =
					await fetchTypes();
				if (statusTypes == 200) {
					setTypes(typesData.data.types);
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

				const {
					data: functionalCasesData,
					status: statusFunctionalCases,
				} = await fetchFunctionalCases();
				if (statusFunctionalCases == 200) {
					setFunctionalCases(
						functionalCasesData.data.FunctionalCases
					);
				}
				const { data: sectionsData, status: statusSections } =
					await fetchSections();
				if (statusSections == 200) {
					setSections(sectionsData.data.DigitalGuideCategories);
					setAvailableSections(
						sectionsData.data.DigitalGuideCategories.filter(
							(section: Section2) =>
								!profile?.sections.find(
									(profileSection) =>
										section.id === profileSection.section.id
								)
						)
					);
				}
			}
			const { data: nationalitiesData, status: statusNationality } =
				await fetchNationalities();
			if (statusNationality == 200) {
				setNationalities(nationalitiesData.data.nationalities);
			}
		}

		fetchSelect();
	}, []);
	const [OTP, setOTP] = useState<string[]>(Array(4).fill(''));

	const {
		mutate: mutateCheckOtp,
		isPending: sendOtpIsPending,
		isSuccess: sendOtpIsSuccess,
	} = useMutation({
		mutationFn: clientActivate,
		onSuccess: (res: any) => {
			if (res.code == 200) {
				toast.success('تم تأكيد رمز الحساب');

				router.push('/homePage/profile?success=true');
			}
		},
		onError: (err: AxiosError) => {
			//@ts-ignore
			setErrors(err.response?.data?.data.errors);
		},
	});
	useEffect(() => {
		if (OTP.every((digit) => digit != '')) {
			mutateCheckOtp({
				otp_code: OTP.join(''),
				client_id: profile.id,
			});
		}
	}, [OTP]);
	const [firstName, setFirstName] = useState('');
	const [secondName, setSecondName] = useState('');
	const [thirdName, setThirdName] = useState('');
	const [fourthName, setFourthName] = useState('');
	const [companyLicensesNo, setCompanyLicensesNo] = useState('');
	const [name, setName] = useState('');
	const [mobile, setMobile] = useState('');
	const [email, setEmail] = useState('');
	const [selectedType, setSelectedType] = useState('');
	const [selectedNationality, setSelectedNationality] = useState('');
	const [selectedCountry, setSelectedCountry] = useState('');
	const [selectedRegion, setSelectedRegion] = useState('');
	const [selectedCity, setSelectedCity] = useState('');
	const [gender, setGender] = useState('');
	const [about, setAbout] = useState('');
	const [dateOfBirth, setDateOfBirth] = useState('');
	const [identityType, setIdentityType] = useState('');
	const [natId, setNatId] = useState('');
	const [generalSpecialty, setGeneralSpecialty] = useState('');
	const [accurateSpecialty, setAccurateSpecialty] = useState('');
	const [functionalCases, setFunctionalCase] = useState('');
	const [degree, setDegree] = useState('');
	const [companyName, setCompanyName] = useState('');
	const [lawyer_sections, setLawyerSections] = useState<Section[]>([]);
	const [latitude, setLatitude] = useState('');
	const [longitude, setLongitude] = useState('');
	useEffect(() => {
		console.log(profile);
		setName(profile?.name ? profile?.name : '');
		setMobile(
			`+${profile?.phone_code}${profile.mobile ? profile.mobile : profile.phone
			}`
		);
		setEmail(profile?.email ? profile?.email : '');
		setSelectedType(profile?.type ? profile.type.toString() : '');
		setSelectedNationality(
			profile?.nationality ? profile.nationality.id.toString() : ''
		);
		setSelectedCountry(
			profile?.country ? profile.country.id.toString() : ''
		);
		setLatitude(profile?.latitude);
		setLongitude(profile?.longitude);
		setSelectedRegion(profile?.region ? profile.region.id.toString() : '');
		setSelectedCity(profile?.city ? profile.city.id.toString() : '');
		setGender(
			profile?.['gender ']
				? profile?.['gender '].toString()
				: profile?.gender
					? profile?.gender
					: ''
		);
		if (profileType == UserTypes.LAWYER) {
			setFirstName(profile?.first_name ? profile.first_name : '');
			setSecondName(profile?.second_name ? profile.second_name : '');
			setThirdName(profile?.third_name ? profile.third_name : '');
			setFourthName(profile?.fourth_name ? profile.fourth_name : '');
			setSelectedType(profile?.type ? profile.type.toString() : '');
			setCompanyLicensesNo(
				profile?.company_lisences_no ? profile?.company_lisences_no : ''
			);
			setAbout(profile?.about ? profile.about : '');
			setDateOfBirth(profile?.birthday ? profile.birthday : '');
			setIdentityType(
				profile?.identity_type ? profile.identity_type.toString() : ''
			);
			setNatId(profile?.nat_id ? profile.nat_id : '');
			setGeneralSpecialty(
				profile?.general_specialty
					? profile.general_specialty.id.toString()
					: ''
			);
			// add accurate and functional
			setAccurateSpecialty(
				profile?.accurate_specialty
					? profile.accurate_specialty.id.toString()
					: ''
			);
			setFunctionalCase(
				profile?.functional_cases
					? profile.functional_cases.id.toString()
					: ''
			);
			setDegree(profile?.degree ? profile.degree.id.toString() : '');
			setCompanyName(profile?.company_name ? profile.company_name : '');
			setLawyerSections(profile?.sections ? profile.sections : []);
		}
	}, [profile]);
	const handleFileChange = (
		e: ChangeEvent<HTMLInputElement>,
		setSelectedFile: (arg0: any) => void
	) => {
		const file = e.target.files![0];
		setSelectedFile(file);
	};
	const [errors, setErrors] = useState({});
	const router = useRouter();
	const saveData = async () => {
		if (profileType == UserTypes.CLIENT) {
			try {
				const phoneNumber = parsePhoneNumber(mobile) as PhoneNumber;
				const { data, status } = await updateClientProfile({
					name,
					gender,
					// type: selectedType,
					phone_code: phoneNumber.countryCallingCode,
					mobile: phoneNumber.nationalNumber,
					email,
					country_id: selectedCountry,
					region_id: parseInt(selectedRegion),
					city_id: selectedCity,
					nationality_id: selectedNationality,
					longitude: longitude,
					latitude: latitude,
					activation_type: phoneCode == '966' ? 2 : 1,
				});
				if (status == 200) {
					setProfile(data.data.client);
					setErrors({});

					if (
						mobile != `+${profile?.phone_code}${profile.mobile}` ||
						email != profile?.email
					) {
						setCurrentStep(1);
					} else {
						router.push('/homePage/profile?success=true');
					}
				}
			} catch (err) {
				setErrors(err.response.data.data.errors);
			}
		} else {
			const formData = new FormData();
			if (degreeCertificate !== null) {
				formData.append('degree_certificate', degreeCertificate);
			}

			if (idFile != null) {
				formData.append('id_file', idFile);
			}

			if (logo != null) {
				formData.append('logo', logo);
			}
			if (profileImage != null) {
				formData.append('photo', profileImage);
			}
			if (sectionsToBeAdded) {
				sectionsToBeAdded.forEach((s, index) => {
					formData.append(
						`sections[${index}]`,
						s.section_id.toString()
					);
					formData.append(`licence_no[${index}]`, s.sectionLicenseNo);
					formData.append(
						`license_file[${index}]`,
						s.sectionLicenseFile
					);
				});
			}
			formData.append('first_name', firstName);
			formData.append('second_name', secondName);
			formData.append('third_name', thirdName || '');
			formData.append('fourthName', fourthName);
			const phoneNumber = parsePhoneNumber(mobile) as PhoneNumber;
			formData.append('phone_code', phoneNumber.countryCallingCode);
			formData.append('phone', phoneNumber.nationalNumber);
			formData.append('email', email);
			formData.append('about', about);
			formData.append('birth_year', dateOfBirth.split('-')[0]);
			formData.append('birth_month', dateOfBirth.split('-')[1]);
			formData.append('birth_day', dateOfBirth.split('-')[2]);
			formData.append('gender', gender);
			formData.append('degree', degree);
			formData.append('general_specialty', generalSpecialty);
			formData.append('accurate_specialty', accurateSpecialty);
			formData.append('nationality', selectedNationality);
			formData.append('country', selectedCountry);
			formData.append('city', selectedCity);
			formData.append('region', selectedRegion);
			formData.append('type', selectedType);
			formData.append('identity_type', identityType);
			formData.append('functional_cases', functionalCases);
			formData.append('nat_id', natId);
			formData.append('latitude', latitude);
			formData.append('longitude', longitude);
			if (selectedType == '4' || selectedType == '5') {
				formData.append('company_name', companyName);
			}
			if (selectedType == '1') {
				if (cv != null) {
					formData.append('cv', cv);
				}
			}
			if (selectedType == '2' || selectedType == '3') {
				formData.append('company_lisences_no', companyLicensesNo);
				if (companyLicensesFile != null) {
					formData.append(
						'company_lisences_file',
						companyLicensesFile
					);
				}
			}
			try {
				const { data, status } = await updateLawyerProfile(formData);
				if (status == 200) {
					router.push('/homePage/profile?success=true');
				} else if (status == 422) {
					console.log(data.data.errors);
					setErrors(data.data.errors);
				}
			} catch (err) {
				setErrors(err.response.data.data.errors);
			}
		}
	};
	const [mapsLink, setMapsLink] = useState('');
	useEffect(() => {
		if (latitude && longitude) {
			console.log(latitude, longitude);
			setMapsLink(
				'https://maps.google.com/maps?q=' +
				latitude +
				',' +
				longitude +
				'&hl=es;z=14&output=embed'
			);
		}
	}, [latitude, longitude]);
	useEffect(() => {
		if (countries.length > 0 && selectedCountry != '') {
			setRegions(
				//@ts-ignore
				countries.find(
					(country) => country.id.toString() == selectedCountry
				).regions
			);
			setCities([]);
			setSelectedRegion('');
			setSelectedCity('');
		}
	}, [selectedCountry]);
	useEffect(() => {
		if (
			countries.length > 0 &&
			selectedCountry != '' &&
			selectedRegion != ''
		) {
			setCities(
				//@ts-ignore

				countries
					.find((country) => country.id.toString() == selectedCountry)
					.regions.find(
						//@ts-ignore

						(region: { id: string }) => region.id == selectedRegion
					).cities
			);
			setSelectedCity('');
		} else if (
			countries.length > 0 &&
			selectedCountry != '' &&
			selectedRegion == ''
		) {
			setRegions([]);
			setSelectedCity('');
		}
	}, [selectedRegion]);
	function getLocation() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((position) => {
				setLatitude(position.coords.latitude);
				setLongitude(position.coords.longitude);
				setGetLocationButtonDisabled(true);
			});
		}
	}
	return (
		<ProtectedRoute>
			{currentStep == 0 ? (
				<main className="w-full flex gap-[25px] md:pr-20">
					<div className="hidden md:flex flex-col pl-30 pr-4 py-8 rounded-md text-[#00262F] shadow-md gap-12 h-auto max-h-fit">
						<Link
							href="/homePage/profile"
							className="flex flex-row gap-4 justify-start items-center"
						>
							<FaUser />
							<p>الملف الشخصي</p>
						</Link>
						<Link
							href="/homePage/profile/edit"
							className="flex flex-row gap-4 justify-start items-center text-gold"
						>
							<FaUserEdit />
							<p>تعديل الملف الشخصي</p>
						</Link>
						<div className="flex flex-row gap-4 justify-start items-center hover:cursor-pointer">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
							>
								<g clip-path="url(#clip0_848_11421)">
									<path
										d="M20.2924 24.0028H15.3738C14.9483 24.0028 14.5425 23.8228 14.2613 23.508L10.3484 19.1329C10.1102 18.8677 9.97683 18.527 9.97275 18.1729C9.96868 17.8189 10.0941 17.4752 10.3262 17.2048C10.5583 16.9343 10.8814 16.7552 11.2366 16.7001C11.5917 16.645 11.9551 16.7177 12.2603 16.9048L14.4169 18.2201V12.2509C14.4169 11.8487 14.5791 11.463 14.8679 11.1786C15.1567 10.8942 15.5484 10.7344 15.9568 10.7344C16.3652 10.7344 16.7568 10.8942 17.0456 11.1786C17.3344 11.463 17.4966 11.8487 17.4966 12.2509V16.0325L21.3824 16.5014C21.6469 16.5332 21.9012 16.6212 22.1278 16.7593C22.3544 16.8973 22.5479 17.0821 22.695 17.301C22.842 17.5198 22.939 17.7675 22.9794 18.0269C23.0198 18.2863 23.0025 18.5512 22.9288 18.8034L21.7179 22.9468C21.6286 23.2512 21.4412 23.5187 21.1841 23.7092C20.9271 23.8996 20.6141 24.0026 20.2924 24.0028Z"
										fill="#00262F"
									/>
									<path
										d="M9.98054 0C7.59875 0 5.31452 0.931815 3.63034 2.59046C1.94616 4.2491 1 6.4987 1 8.84437C1 13.2776 4.31592 16.9383 8.63655 17.5789C8.76456 16.9327 9.11773 16.3509 9.63505 15.934C10.1524 15.517 10.8013 15.2911 11.4698 15.2954C12.0096 15.2954 12.5373 15.444 12.9965 15.7236L13.0078 15.7301V12.2466C13.0088 11.4775 13.3195 10.7402 13.8717 10.1963C14.4239 9.65251 15.1726 9.34655 15.9535 9.34557C17.1625 9.34557 18.2019 10.0683 18.6546 11.0965C18.8467 10.3766 18.9601 9.62432 18.9601 8.84437C18.9611 3.95975 14.9404 0 9.98054 0ZM10.8231 12.6001V13.0321C10.8231 13.2524 10.7342 13.4637 10.5761 13.6195C10.4179 13.7753 10.2033 13.8628 9.9796 13.8628C9.75589 13.8628 9.54134 13.7753 9.38315 13.6195C9.22497 13.4637 9.1361 13.2524 9.1361 13.0321V12.8281C8.69413 12.8233 8.27059 12.653 7.95144 12.3518C7.78459 12.1942 7.65196 12.0049 7.56158 11.7953C7.47121 11.5857 7.42496 11.3602 7.42565 11.1325C7.42553 10.9122 7.51428 10.7009 7.67238 10.545C7.83048 10.3891 8.04498 10.3015 8.26869 10.3014C8.4924 10.3012 8.707 10.3886 8.86528 10.5443C9.02355 10.7 9.11254 10.9113 9.11267 11.1316C9.11267 11.1372 9.11267 11.1464 9.12391 11.1565C9.49318 11.1565 11.1549 11.0615 11.1736 10.3507C11.1746 10.312 11.1446 9.95661 9.78935 9.65294C7.92801 9.23666 7.02545 8.41702 7.10887 7.21709C7.15385 6.5599 7.51 5.54365 9.13516 5.08861V4.65479C9.13516 4.43447 9.22403 4.22317 9.38222 4.06738C9.54041 3.91159 9.75496 3.82407 9.97867 3.82407C10.2024 3.82407 10.4169 3.91159 10.5751 4.06738C10.7333 4.22317 10.8222 4.43447 10.8222 4.65479V4.86339C11.0403 4.86108 11.2568 4.90142 11.459 4.98206C11.6612 5.06271 11.8452 5.18206 12.0003 5.33321C12.3349 5.65165 12.5279 6.09747 12.5279 6.55621C12.5279 6.77653 12.4391 6.98782 12.2809 7.14361C12.1227 7.2994 11.9081 7.38693 11.6844 7.38693C11.4607 7.38693 11.2462 7.2994 11.088 7.14361C10.9298 6.98782 10.8409 6.77653 10.8409 6.55621C10.2064 6.53867 8.839 6.66051 8.79213 7.33062C8.7837 7.44784 8.90179 7.75152 10.1633 8.03396C11.9825 8.44194 12.8897 9.23573 12.8597 10.395C12.8457 10.9516 12.587 12.1054 10.8231 12.6001Z"
										fill="#00262F"
									/>
								</g>
								<defs>
									<clipPath id="clip0_848_11421">
										<rect
											width="24"
											height="24"
											fill="white"
										/>
									</clipPath>
								</defs>
							</svg>
							<p>الباقات والاشتراكات</p>
						</div>
						<div className="flex flex-row gap-4 justify-start items-center hover:cursor-pointer">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
							>
								<path
									d="M19.5 18C17.019 18 15 15.981 15 13.5C15 11.019 17.019 9 19.5 9H22V7C22 5.897 21.103 5 20 5H19V3C19 1.897 18.103 1 17 1H3C2.29263 1.00169 1.60864 1.25346 1.06898 1.71077C0.529314 2.16809 0.168736 2.8015 0.051 3.499C0.029 3.581 0 3.661 0 3.75V19C0 20.654 1.346 22 3 22H20C21.103 22 22 21.103 22 20V18H19.5ZM2 4C2 3.449 2.448 3 3 3H17V5H3C2.448 5 2 4.551 2 4Z"
									fill="#00262F"
								/>
								<path
									d="M23.25 10.5H19.5C17.846 10.5 16.5 11.846 16.5 13.5C16.5 15.154 17.846 16.5 19.5 16.5H23.25C23.4489 16.5 23.6397 16.421 23.7803 16.2803C23.921 16.1397 24 15.9489 24 15.75V11.25C24 11.0511 23.921 10.8603 23.7803 10.7197C23.6397 10.579 23.4489 10.5 23.25 10.5ZM19.5 14.5C19.2348 14.5 18.9804 14.3946 18.7929 14.2071C18.6054 14.0196 18.5 13.7652 18.5 13.5C18.5 13.2348 18.6054 12.9804 18.7929 12.7929C18.9804 12.6054 19.2348 12.5 19.5 12.5C19.7652 12.5 20.0196 12.6054 20.2071 12.7929C20.3946 12.9804 20.5 13.2348 20.5 13.5C20.5 13.7652 20.3946 14.0196 20.2071 14.2071C20.0196 14.3946 19.7652 14.5 19.5 14.5Z"
									fill="#00262F"
								/>
							</svg>
							<p>الرصيد والنقاط</p>
						</div>
						<div className="flex flex-row gap-4 justify-start items-center hover:cursor-pointer">
							<FaHeart />
							<p>اقسام المفضلة</p>
						</div>
						<div className="flex flex-row gap-4 justify-start items-center hover:cursor-pointer">
							<FaPhone />
							<p>راسل يمتاز</p>
						</div>
						<div className="flex flex-row gap-4 justify-start items-center hover:cursor-pointer">
							<FaGear />
							<p>الاعدادات</p>
						</div>
					</div>
					<div>
						<div
							className="grid grid-cols-1 gap-9"
							style={{ direction: 'rtl' }}
						>
							{profileType == UserTypes.CLIENT && (
								<div className="flex flex-col gap-9">
									{/* <!-- Contact Form --> */}
									<div className="rounded-lg p-2 border border-stroke bg-white shadow-default ">
										<div className="border-b border-stroke py-4 px-6">
											<h3 className="font-medium text-black ">
												المعلومات الشخصية
											</h3>
										</div>
										<div className="p-7">
											<div className="mb-4 flex flex-col gap-6 xl:flex-row">
												<div className="w-full xl:w-1/2">
													<label className="mb-2 block text-black ">
														الاسم
													</label>
													<input
														type="text"
														placeholder="الاسم"
														className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
														value={name}
														onChange={(e) =>
															setName(
																e.target.value
															)
														}
													/>
													{errors.name && (
														<p className="text-red-600">
															{errors.name.join(
																'\n'
															)}
														</p>
													)}
												</div>

												<div className="w-full xl:w-1/2">
													<label className="mb-2 block text-black ">
														رقم الجوال
													</label>
													<div className="flex">
														<select
															value={phoneCode}
															onChange={(e) =>
																setPhoneCode(
																	e.target
																		.value
																)
															}
															className="w-1/2 rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter "
														>
															{countries.map(
																(country) => (
																	<option
																		key={`${country.phone_code}_${country.id}`}
																		value={
																			country.phone_code
																		}
																	>{`${country.name} (${country.phone_code})`}</option>
																)
															)}
														</select>
														<input
															type="number"
															placeholder="رقم الجوال"
															value={mobile}
															onChange={(e) =>
																setMobile(
																	e.target
																		.value
																)
															}
															className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter "
														/>
													</div>
													{errors.mobile && (
														<p className="text-red-600">
															{errors.mobile.join(
																'\n'
															)}
														</p>
													)}
												</div>
											</div>

											<div className="mb-4">
												<label className="mb-2 block text-black ">
													البريد الالكتروني
													<span className="text-meta-1">
														*
													</span>
												</label>
												<input
													type="email"
													placeholder="Enter your email address"
													value={email}
													onChange={(e) =>
														setEmail(e.target.value)
													}
													className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter "
												/>
												{errors.email && (
													<p className="text-red-600">
														{errors.email.join(
															'\n'
														)}
													</p>
												)}
											</div>
											{/* <div className="mb-4">
								<SelectGroup
									options={types}
									title="النوع"
									selectedOption={selectedType}
									setSelectedOption={setSelectedType}
								/>
								{errors.type && (
									<p className="text-red-600">
										{errors.type}
									</p>
								)}
							</div> */}
											<div className="mb-4 flex flex-col gap-6 xl:flex-row">
												<div className="w-full">
													<SelectGroup
														options={nationalities}
														title="الجنسية"
														selectedOption={
															selectedNationality
														}
														setSelectedOption={
															setSelectedNationality
														}
													/>
													{errors.nationality_id && (
														<p className="text-red-600">
															{errors.nationality_id.join(
																'\n'
															)}
														</p>
													)}
												</div>
												<div className="w-full">
													<SelectGroup
														options={countries}
														title="الدولة"
														selectedOption={
															selectedCountry
														}
														setSelectedOption={
															setSelectedCountry
														}
													/>
													{errors.country_id && (
														<p className="text-red-600">
															{errors.country_id.join(
																'\n'
															)}
														</p>
													)}
												</div>
												<div className="w-full">
													<SelectGroup
														options={regions}
														title="المنطقة"
														selectedOption={
															selectedRegion
														}
														setSelectedOption={
															setSelectedRegion
														}
													/>
													{errors.region_id && (
														<p className="text-red-600">
															{errors.region_id.join(
																'\n'
															)}
														</p>
													)}
												</div>
											</div>
											<div className="mb-4 flex flex-col gap-6 xl:flex-row">
												<div className="w-full">
													<SelectGroup
														options={cities}
														title="المدينة"
														selectedOption={
															selectedCity
														}
														setSelectedOption={
															setSelectedCity
														}
													/>
													{errors.city_id && (
														<p className="text-red-600">
															{errors.city_id.join(
																'\n'
															)}
														</p>
													)}
												</div>
												<div className="w-full">
													<SelectGroup
														options={[
															{
																id: 'Male',
																name: 'ذكر',
															},
															{
																id: 'Female',
																name: 'انثى',
															},
														]}
														title="الجنس"
														selectedOption={gender}
														setSelectedOption={
															setGender
														}
													/>
													{errors.gender && (
														<p className="text-red-600">
															{errors.gender.join(
																'\n'
															)}
														</p>
													)}
												</div>
											</div>
											<div className="mb-4 flex flex-col gap-6 xl:flex-row">
												<div className="w-full xl:w-1/2">
													<label className="mb-2 block text-black ">
														خط الطول :
													</label>
													<input
														type="text"
														disabled={true}
														placeholder="خط الطول"
														className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter "
														value={
															profile?.latitude
														}
													/>
													{errors.latitude && (
														<p className="text-red-600">
															{errors.latitude.join(
																'\n'
															)}
														</p>
													)}
												</div>

												<div className="w-full xl:w-1/2">
													<label className="mb-2 block text-black ">
														خط العرض :{' '}
													</label>
													<input
														type="text"
														disabled={true}
														placeholder="خط العرض"
														className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter "
														value={
															profile?.longitude
														}
													/>
													{errors.longitude && (
														<p className="text-red-600">
															{errors.longitude.join(
																'\n'
															)}
														</p>
													)}
												</div>
											</div>
											<div className="mb-4 flex flex-col gap-6 xl:flex-row">
												<div className="w-full">
													<button
														disabled={
															getLocationButtonDisabled
														}
														onClick={getLocation}
														className="bg-blue group flex disabled:justify-center justify-between items-center  relative font-medium w-full  text-white  rounded-lg p-[15px] text-[18px] disabled:bg-green-500"
													>
														<p>
															{getLocationButtonDisabled
																? 'تم اختيار الموقع بنجاح'
																: 'اختر الموقع'}
														</p>
														<FaLocationArrow className="block group-disabled:hidden" />
													</button>
												</div>
											</div>
											{/* <div className="mb-4 w-full h-150">
                  <iframe className="w-full h-full" src={mapsLink}></iframe>
                </div> */}
										</div>
									</div>
								</div>
							)}
							{profileType == UserTypes.LAWYER && (
								<div className="flex flex-col gap-9">
									<div className="rounded-lg p-2 border border-stroke bg-white shadow-default ">
										<div className="border-b border-stroke py-4 px-6 ">
											<h3 className="font-medium text-black ">
												الشاشة الاولى
											</h3>
										</div>
										<div className="p-6">
											<div className="mb-4 flex flex-col gap-6 xl:flex-row">
												<div className="w-full xl:w-1/2">
													<label className="mb-2 block text-black ">
														الاسم الاول
													</label>
													<input
														type="text"
														placeholder="الاسم"
														className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter "
														value={firstName}
														onChange={(e) =>
															setFirstName(
																e.target.value
															)
														}
													/>
													{errors.first_name && (
														<p className="text-red">
															{errors.first_name}
														</p>
													)}
												</div>
												<div className="w-full xl:w-1/2">
													<label className="mb-2 block text-black ">
														الاسم الثاني
													</label>
													<input
														type="text"
														placeholder="الاسم"
														className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter "
														value={secondName}
														onChange={(e) =>
															setSecondName(
																e.target.value
															)
														}
													/>
													{errors.sname && (
														<p className="text-red">
															{errors.sname}
														</p>
													)}
												</div>
												<div className="w-full xl:w-1/2">
													<label className="mb-2 block text-black ">
														الاسم الثالث{' '}
													</label>
													<input
														type="text"
														placeholder="الاسم"
														className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter "
														value={thirdName}
														onChange={(e) =>
															setThirdName(
																e.target.value
															)
														}
													/>
													{errors.third_name && (
														<p className="text-red">
															{errors.third_name}
														</p>
													)}
												</div>
												<div className="w-full xl:w-1/2">
													<label className="mb-2 block text-black ">
														الاسم الرابع
													</label>
													<input
														type="text"
														placeholder="الاسم"
														className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter "
														value={fourthName}
														onChange={(e) =>
															setFourthName(
																e.target.value
															)
														}
													/>
													{errors.fourthname && (
														<p className="text-red">
															{errors.fourthname}
														</p>
													)}
												</div>
											</div>

											<div className="mb-4 flex flex-col gap-6 xl:flex-row">
												<div className="w-full xl:w-1/2">
													<label className="mb-2 block text-black ">
														رقم الجوال
													</label>
													<div className="flex">
														<select
															value={phoneCode}
															onChange={(e) =>
																setPhoneCode(
																	e.target
																		.value
																)
															}
															className="w-1/2 rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter "
														>
															{countries.map(
																(country) => (
																	<option
																		key={
																			country.id
																		}
																		value={
																			country.phone_code
																		}
																	>{`${country.name} (${country.phone_code})`}</option>
																)
															)}
														</select>
														<input
															type="number"
															placeholder="رقم الجوال"
															value={mobile}
															onChange={(e) =>
																setMobile(
																	e.target
																		.value
																)
															}
															className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter "
														/>
													</div>
													{errors.phone && (
														<p className="text-red">
															{errors.phone}
														</p>
													)}
												</div>
												<div className="w-full xl:w-1/2">
													<label className="mb-2 block text-black ">
														البريد الالكتروني
														<span className="text-meta-1">
															*
														</span>
													</label>
													<input
														type="email"
														placeholder="Enter your email address"
														value={email}
														onChange={(e) =>
															setEmail(
																e.target.value
															)
														}
														className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter "
													/>
													{errors.email && (
														<p className="text-red">
															{errors.email}
														</p>
													)}
												</div>
											</div>
										</div>
									</div>
									<div className="rounded-lg p-2 border border-stroke bg-white shadow-default ">
										<div className="border-b border-stroke py-4 px-6.5 ">
											<h3 className="font-medium text-black ">
												الشاشة الثانية
											</h3>
										</div>
										<div className="p-6.5">
											<div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
												<div className="w-full xl:w-1/2">
													<SelectGroup
														options={types}
														title="النوع"
														selectedOption={
															selectedType
														}
														setSelectedOption={
															setSelectedType
														}
													/>
													{errors.type && (
														<p className="text-red">
															{errors.type}
														</p>
													)}
												</div>
											</div>
											<div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
												{selectedType == '5' ||
													selectedType == '4' ? (
													<div className="w-full xl:w-1/2">
														<label className="mb-2.5 block text-black ">
															اسم ومعلومات الجهة :{' '}
														</label>
														<input
															type="text"
															placeholder="اسم ومعلومات الجهة"
															className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
															value={companyName}
															onChange={(e) =>
																setCompanyName(
																	e.target
																		.value
																)
															}
														/>
														{errors.company_name && (
															<p className="text-red">
																{
																	errors.company_name
																}
															</p>
														)}
													</div>
												) : selectedType == '2' ||
													selectedType == '3' ? (
													<>
														<div className="w-full xl:w-1/2">
															<label className="mb-2.5 block text-black ">
																رقم التجاري :{' '}
															</label>
															<input
																type="number"
																className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
																value={
																	companyLicensesNo
																}
																onChange={(e) =>
																	setCompanyLicensesNo(
																		e.target
																			.value
																	)
																}
															/>
															{errors.company_lisences_no && (
																<p className="text-red">
																	{
																		errors.company_lisences_no
																	}
																</p>
															)}
														</div>
														<div className="w-full xl:w-1/2">
															<label>
																{' '}
																ملف الترخيص :
															</label>
															<input
																type="file"
																name="id_file"
																id="id_file"
																accept=".png ,.jpg ,.jpeg ,.PNG ,.JPG, .JPEG, .pdf"
																onChange={(e) =>
																	handleFileChange(
																		e,
																		setCompanyLicensesFile
																	)
																}
															/>
															{profile?.company_lisences_file ? (
																<a
																	href={
																		profile?.company_lisences_file
																	}
																	target="_blank"
																	className="justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
																>
																	عرض الملف
																</a>
															) : null}
															{errors.company_lisences_file && (
																<p className="text-red">
																	{
																		errors.company_lisences_file
																	}
																</p>
															)}
														</div>
													</>
												) : (
													<div className="w-full flex xl:w-1/2">
														<div className="w-3/4 flex flex-col gap-2">
															<label>
																{' '}
																ملف السيرة
																الذاتية :
															</label>
															<input
																type="file"
																name="id_file"
																id="id_file"
																accept=".png ,.jpg ,.jpeg ,.PNG ,.JPG, .JPEG, .pdf"
																onChange={(e) =>
																	handleFileChange(
																		e,
																		setCVFile
																	)
																}
															/>
														</div>
														{profile?.cv ? (
															<a
																href={
																	profile?.cv
																}
																target="_blank"
																className="text-center justify-center items-center flex rounded bg-gold p-3 font-medium text-white hover:bg-opacity-90"
															>
																عرض الملف
															</a>
														) : null}
														{errors.cv && (
															<p className="text-red">
																{errors.cv}
															</p>
														)}
													</div>
												)}
											</div>

											<div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
												<div className="w-full xl:w-1/2">
													<label className="mb-2.5 block text-black ">
														تعريف مختصر :{' '}
													</label>
													<textarea
														className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
														rows={5}
														value={about}
														onChange={(e) =>
															setAbout(
																e.target.value
															)
														}
													/>
													{errors.about && (
														<p className="text-red">
															{errors.about}
														</p>
													)}
												</div>
											</div>
											<div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
												<div className="w-full xl:w-1/2">
													<DatePicker
														uniqueKey={'DOB'}
														title="تاريخ الميلاد"
														selectedDate={
															dateOfBirth
														}
														setSelectedDate={
															setDateOfBirth
														}
													/>
													{errors.birth_date && (
														<p className="text-red">
															{errors.birth_date}
														</p>
													)}
												</div>
												<div className="w-full xl:w-1/2">
													<SelectGroup
														options={[
															{
																id: 'Male',
																name: 'ذكر',
															},
															{
																id: 'Female',
																name: 'انثى',
															},
														]}
														title="الجنس"
														selectedOption={gender}
														setSelectedOption={
															setGender
														}
													/>
													{errors.gender && (
														<p className="text-red">
															{errors.gender}
														</p>
													)}
												</div>
											</div>
										</div>
									</div>
									<div className="rounded-sm border border-stroke bg-white shadow-default">
										<div className="border-b border-stroke py-4 px-6.5 ">
											<h3 className="font-medium text-black ">
												الشاشة الثالثة
											</h3>
										</div>
										<div className="p-6.5">
											<div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
												<div className="w-full">
													<SelectGroup
														options={nationalities}
														title="الجنسية"
														selectedOption={
															selectedNationality
														}
														setSelectedOption={
															setSelectedNationality
														}
													/>
													{errors.nationality && (
														<p className="text-red">
															{errors.nationality}
														</p>
													)}
												</div>
												<div className="w-full">
													<SelectGroup
														options={countries}
														title="الدولة"
														selectedOption={
															selectedCountry
														}
														setSelectedOption={
															setSelectedCountry
														}
													/>
													{errors.country_id && (
														<p className="text-red">
															{errors.country_id}
														</p>
													)}
												</div>
												<div className="w-full">
													<SelectGroup
														options={regions}
														title="المنطقة"
														selectedOption={
															selectedRegion
														}
														setSelectedOption={
															setSelectedRegion
														}
													/>
													{errors.region && (
														<p className="text-red">
															{errors.region}
														</p>
													)}
												</div>
												<div className="w-full">
													<SelectGroup
														options={cities}
														title="المدينة"
														selectedOption={
															selectedCity
														}
														setSelectedOption={
															setSelectedCity
														}
													/>
													{errors.city && (
														<p className="text-red">
															{errors.city}
														</p>
													)}
												</div>
											</div>

											<div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
												<div className="w-full xl:w-1/2">
													<label className="mb-2.5 block text-black ">
														خط الطول :
													</label>
													<input
														type="text"
														disabled={true}
														placeholder="خط الطول"
														className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
														value={latitude}
													/>
													{errors.latitude && (
														<p className="text-red">
															{errors.latitude}
														</p>
													)}
												</div>

												<div className="w-full xl:w-1/2">
													<label className="mb-2.5 block text-black ">
														خط العرض :{' '}
													</label>
													<input
														type="text"
														disabled={true}
														placeholder="خط العرض"
														className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
														value={longitude}
													/>
													{errors.longitude && (
														<p className="text-red">
															{errors.longitude}
														</p>
													)}
												</div>
											</div>
											<div className="mb-4 flex flex-col gap-6 xl:flex-row">
												<div className="w-full">
													<button
														disabled={
															getLocationButtonDisabled
														}
														onClick={getLocation}
														className="bg-blue group flex disabled:justify-center justify-between items-center  relative font-medium w-full  text-white  rounded-lg p-[15px] text-[18px] disabled:bg-green-500"
													>
														<p>
															{getLocationButtonDisabled
																? 'تم تحديث الموقع بنجاح'
																: 'تحديث الموقع'}
														</p>
														<FaLocationArrow className="block group-disabled:hidden" />
													</button>
												</div>
											</div>
											{/* <div className="mb-4.5 w-full h-150">
											<iframe
												className="w-full h-full"
												src={mapsLink}
											></iframe>
										</div> */}
										</div>
									</div>
									<div className="rounded-sm border border-stroke bg-white shadow-default">
										<div className="border-b border-stroke py-4 px-6.5 ">
											<h3 className="font-medium text-black ">
												الشاشة الرابعة
											</h3>
										</div>
										<div className="p-6.5">
											<div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
												<div className="w-full">
													<SelectGroup
														options={[
															{
																id: 1,
																name: 'هوية وطنية',
															},
															{
																id: 2,
																name: 'جواز السفر',
															},
															{
																id: 3,
																name: 'هوية مقيم',
															},
														]}
														title={'نوع الهوية'}
														selectedOption={
															identityType
														}
														setSelectedOption={
															setIdentityType
														}
													/>
													{errors.identity_type && (
														<p className="text-red">
															{
																errors.identity_type
															}
														</p>
													)}
												</div>
												<div className="w-full">
													<label className="mb-2.5 block text-black ">
														الرقم :
													</label>
													<input
														type={
															identityType == '2'
																? 'text'
																: 'number'
														}
														maxLength={9}
														onInput={(e) => {
															if (
																identityType !=
																2
															) {
																e.currentTarget
																	.value
																	.length > 10
																	? (e.currentTarget.value =
																		e.currentTarget.value.slice(
																			0,
																			10
																		))
																	: e
																		.currentTarget
																		.value;
															}
														}}
														placeholder="أدخل الرقم ..."
														className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter "
														value={natId}
														onChange={(e) =>
															setNatId(
																e.target.value
															)
														}
													/>
													{errors.nat_id && (
														<p className="text-red">
															{errors.nat_id}
														</p>
													)}
												</div>
											</div>
											<div className="mb-4.5 flex">
												<div className="flex flex-col gap-2 w-3/4">
													<label> ملف الهوية :</label>
													<input
														type="file"
														name="id_file"
														id="id_file"
														accept=".png ,.jpg ,.jpeg ,.PNG ,.JPG, .JPEG, .pdf"
														onChange={(e) =>
															handleFileChange(
																e,
																setIdFile
															)
														}
													/>
												</div>
												{profile?.id_file ? (
													<a
														href={profile?.id_file}
														target="_blank"
														className="rounded text-center justify-center items-center flex bg-gold p-3 font-medium text-white hover:bg-opacity-90"
													>
														عرض الملف
													</a>
												) : null}
												{errors.id_file && (
													<p className="text-red">
														{errors.id_file}
													</p>
												)}
											</div>
											<div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
												<div className="w-full">
													<SelectGroup
														options={
															GeneralSpecialty
														}
														title={'نوع الهوية'}
														selectedOption={
															generalSpecialty
														}
														setSelectedOption={
															setGeneralSpecialty
														}
													/>
													{errors.general_specialty && (
														<p className="text-red">
															{
																errors.general_specialty
															}
														</p>
													)}
												</div>
												<div className="w-full">
													<SelectGroup
														options={
															AccurateSpecialty
														}
														title={'التخصص الدقيق'}
														selectedOption={
															accurateSpecialty
														}
														setSelectedOption={
															setAccurateSpecialty
														}
													/>
													{errors.accurate_specialty && (
														<p className="text-red">
															{
																errors.accurate_specialty
															}
														</p>
													)}
												</div>
												<div className="w-full">
													<SelectGroup
														options={
															functional_cases
														}
														title={
															'الحالة الوظيفية الخاصة (لا تظهر ويتم التعامل معها بسرية تامة)'
														}
														selectedOption={
															functionalCases
														}
														setSelectedOption={
															setFunctionalCases
														}
													/>
													{errors.functional_cases && (
														<p className="text-red">
															{
																errors.functional_cases
															}
														</p>
													)}
												</div>
											</div>
											<div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
												<div className="w-full">
													<SelectGroup
														options={degrees}
														title={'الدرجة العلمية'}
														selectedOption={degree}
														setSelectedOption={
															setDegree
														}
													/>
													{errors.degree && (
														<p className="text-red">
															{errors.degree}
														</p>
													)}
												</div>
												<div className="w-full">
													<label>
														{' '}
														الشهادة العلمية{' '}
													</label>
													<div className="flex flex-col gap-2">
														<div className="flex gap-2">
															{degree != '' &&
																profile?.degree_certificate ? (
																<>
																	<a
																		href={
																			profile.degree_certificate
																		}
																		target="_blank"
																		className="text-center justify-center items-center flex rounded bg-gold p-3 font-medium text-white hover:bg-opacity-90"
																	>
																		عرض
																		الشهادة
																	</a>
																	<a
																		href={
																			profile?.degree_certificate
																		}
																		download={`${profile?.name}_degree_certificate`}
																		className="text-center justify-center items-center flex rounded bg-gold p-3 font-medium text-white hover:bg-opacity-90 hover:cursor-pointer"
																	>
																		تنزيل
																	</a>
																</>
															) : null}
															<label
																htmlFor="degree_certificate-upload"
																className="text-center justify-center items-center flex rounded bg-gold p-3 font-medium text-white hover:bg-opacity-90 hover:cursor-pointer"
															>
																رفع
															</label>
															<input
																type="file"
																id="degree_certificate-upload"
																hidden
																accept=".png ,.jpg ,.jpeg ,.PNG ,.JPG, .JPEG, .pdf"
																name="degree_certificate"
																onChange={(e) =>
																	handleFileChange(
																		e,
																		setDegreeCertificate
																	)
																}
															/>
														</div>
														<p className="mb-0">
															يسمح فقط بنوع : .pdf
															,.png,.jpeg.
														</p>
													</div>
													{errors.degree_certificate && (
														<p className="text-red">
															{
																errors.degree_certificate
															}
														</p>
													)}
												</div>
											</div>
											<div className="mb-4.5 overflow-x-auto">
												<table
													className="w-full table-auto bg-white shadow-md rounded-lg borded border-black "
													style={{ direction: 'rtl' }}
												>
													<thead>
														<tr className="bg-gray-200 text-gray-700">
															<th
																scope="col"
																className="px-4 py-2 border border-gray-300 h-full"
															>
																المهنة
															</th>
															<th
																scope="col"
																className="px-4 py-2 border border-gray-300 h-full"
															>
																المهنة تحتاج
																ترخيص
															</th>
															<th
																scope="col"
																className="px-4 py-2 border border-gray-300 h-full"
															>
																رقم الترخيص
															</th>
															<th
																scope="col"
																className="px-4 py-2 border border-gray-300 h-full"
															>
																ملف الترخيص
															</th>
															{/* <th
													scope="col"
													className="px-4 py-2 border border-gray-300 h-full"
												>
													عمليات
												</th> */}
														</tr>
													</thead>
													<tbody>
														{lawyer_sections.map(
															(section) => (
																<tr
																	key={
																		section.id
																	}
																	className="bg-gray-100"
																>
																	{section.section ? (
																		<td className="text-center px-4 py-2 border border-gray-300 h-full">
																			{
																				section
																					.section
																					.title
																			}
																		</td>
																	) : (
																		'غير معروف'
																	)}
																	{section.section &&
																		section
																			.section
																			.need_license ==
																		1 ? (
																		<td className="text-center px-4 py-2 border border-gray-300 h-full">
																			تحتاج
																			ترخيص
																		</td>
																	) : (
																		<td className="text-center px-4 py-2 border border-gray-300 h-full">
																			لا
																			تحتاج
																			ترخيص
																		</td>
																	)}
																	<td className="text-center px-4 py-2 border border-gray-300 h-full">
																		{
																			section.lawyer_license_no
																		}
																	</td>
																	<td className="text-center px-4 py-2 border border-gray-300 h-full">
																		{section.lawyer_license_file ? (
																			<a
																				className={`flex w-full justify-center rounded bg-gold p-3 font-medium text-white hover:bg-opacity-90`}
																				href={
																					section.lawyer_license_file
																				}
																				target="_blank"
																			>
																				عرض
																				الملف
																			</a>
																		) : (
																			<div
																				className={`flex w-full justify-center rounded bg-gray p-3 font-medium text-white hover:bg-opacity-90`}
																			>
																				لا
																				يوجد
																				ملف
																			</div>
																		)}
																	</td>
																	{/* <td className="text-center px-4 py-6 border-l border-b border-gray-300 flex items-center h-full justify-center">
														<FaTrash className="text-red-500 hover:cursor-pointer" />
														
													</td> */}
																</tr>
															)
														)}
													</tbody>
												</table>
												{sectionsToBeAdded.length > 0 &&
													sectionsToBeAdded.map(
														(section) => (
															<div
																key={
																	section.section_id
																}
																className="flex items-center gap-6 mt-6.5 flex-col md:flex-row "
															>
																<div className="w-1/2">
																	<SelectGroup
																		options={
																			sections
																		}
																		title={
																			'الحالة الوظيفية'
																		}
																		selectedOption={
																			section.section_id
																		}
																		disabled={
																			true
																		}
																	/>
																</div>
																{sections.find(
																	(sec) =>
																		sec.id.toString() ==
																		section.section_id
																)
																	?.need_license ==
																	1 && (
																		<div className="flex flex-col md:flex-row  items-center gap-6">
																			<div className="flex flex-col w-1/2">
																				<label className="mb-2.5">
																					الترخيص
																				</label>
																				<input
																					type="number"
																					placeholder="الترخيص"
																					className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter "
																					value={
																						section.sectionLicenseNo
																					}
																					disabled={
																						true
																					}
																				/>
																			</div>
																			<div className="flex flex-col w-1/2">
																				<label className="mb-2.5">
																					ملف
																					الترخيص
																				</label>
																				<p>
																					تم
																					رفع
																					الملف
																				</p>
																			</div>
																		</div>
																	)}
																<button
																	className={`bg-red-500 p-2 mt-3.5 text-white`}
																	onClick={() => {
																		setSectionsToBeAdded(
																			(
																				prev
																			) =>
																				prev.filter(
																					(
																						s
																					) =>
																						s.section_id !=
																						section.section_id
																				)
																		);
																		setAvailableSections(
																			(
																				prev
																			) => [
																					...prev,
																					sections.find(
																						(
																							sec
																						) =>
																							sec.id.toString() ==
																							section.section_id
																					),
																				]
																		);
																	}}
																>
																	<FaTrash />
																</button>
															</div>
														)
													)}
												<div className="flex items-center gap-6 mt-6.5 flex-col md:flex-row ">
													<div className="w-1/2">
														<SelectGroup
															options={
																avilableSections
															}
															title={
																'المهنة (يمكن اضافة اكثر من واحدة)'
															}
															selectedOption={
																selectedSection
															}
															setSelectedOption={
																setSelectedSection
															}
														/>
													</div>
													{avilableSections.find(
														(section) =>
															section.id.toString() ==
															selectedSection
													)?.need_license == 1 && (
															<div className="flex flex-col md:flex-row  items-center gap-6">
																<div className="flex flex-col w-1/2">
																	<label className="mb-2.5">
																		الترخيص
																	</label>
																	<input
																		type="number"
																		placeholder="الترخيص"
																		className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter "
																		value={
																			sectionLicenseNo
																		}
																		onChange={(
																			e
																		) => {
																			setSectionLicenseNo(
																				e
																					.target
																					.value
																			);
																		}}
																	/>
																</div>
																<div className="flex flex-col w-1/2">
																	<label className="mb-2.5">
																		ملف الترخيص
																	</label>
																	<input
																		type="file"
																		accept=".png ,.jpg ,.jpeg ,.PNG ,.JPG, .JPEG, .pdf"
																		onChange={(
																			e
																		) =>
																			handleFileChange(
																				e,
																				setSectionLicenseFile
																			)
																		}
																	/>
																</div>
															</div>
														)}
													<button
														disabled={
															selectedSection ==
															'' ||
															(avilableSections.find(
																(section) =>
																	section.id.toString() ==
																	selectedSection
															)?.need_license ==
																1 &&
																(sectionLicenseNo.trim() ==
																	'' ||
																	sectionLicenseFile ==
																	null))
														}
														className={`bg-gold p-2 mt-3.5 text-white`}
														onClick={() => {
															setSectionsToBeAdded(
																(prev) => [
																	...prev,
																	{
																		section_id:
																			selectedSection,
																		sectionLicenseNo:
																			sectionLicenseNo,
																		sectionLicenseFile,
																	},
																]
															);
															setAvailableSections(
																(prev) =>
																	prev.filter(
																		(s) =>
																			s.id.toString() !==
																			selectedSection
																	)
															);
															setSelectedSection(
																''
															);
															setSectionLicenseFile(
																null
															);
															setSectionLicenseNo(
																''
															);
														}}
													>
														<FaPlus />
													</button>
												</div>
												{errors.sections && (
													<p className="text-red">
														{errors.sections}
													</p>
												)}
											</div>
										</div>
										<div className="rounded-sm border border-stroke bg-white shadow-default flex flex-col">
											<div className="border-b border-stroke py-4 px-6.5 ">
												<h3 className="font-medium text-black">
													الشاشة الخامسة
												</h3>
											</div>
											<div className="flex flex-col xl:flex-row gap-6 p-6.5">
												<div className="w-full flex flex-col justify-center items-center gap-2">
													<label>الشعار</label>
													<img
														src={profile?.logo}
														alt="logo"
														className="w-50"
													/>
													<input
														type="file"
														accept=".png ,.jpg ,.jpeg ,.PNG ,.JPG, .JPEG, .pdf"
														onChange={(e) =>
															handleFileChange(
																e,
																setLogo
															)
														}
													/>
													<p>
														يسمح فقط بنوع : png,
														jpg, jpeg.
													</p>
													{errors.logo && (
														<p className="text-red">
															{errors.logo}
														</p>
													)}
												</div>
												<div className="w-full flex flex-col justify-center items-center gap-2">
													<label>
														الصورة الشخصية
													</label>
													<img
														src={profile?.photo}
														alt="photo"
														className="w-50"
													/>
													<input
														type="file"
														accept=".png ,.jpg ,.jpeg ,.PNG ,.JPG, .JPEG, .pdf"
														onChange={(e) =>
															handleFileChange(
																e,
																setProfileImage
															)
														}
													/>
													<p>
														يسمح فقط بنوع : png,
														jpg, jpeg.
													</p>
													{errors.photo && (
														<p className="text-red">
															{errors.photo}
														</p>
													)}
												</div>
											</div>
										</div>
									</div>
								</div>
							)}
							<div className="flex justify-center gap-6">
								<button
									onClick={saveData}
									className="flex w-full md:w-1/2 justify-center rounded bg-gold p-3 font-medium text-white hover:bg-opacity-90"
								>
									حفظ الملف
								</button>
							</div>
						</div>
					</div>
				</main>
			) : (
				<div className="flex items-center justify-center w-full">
					<div className="flex gap-4 flex-col items-center justify-center w-1/2">
						<p className="font-bold text-3xl">تأكيد الحساب</p>
						{errors.otp_code && (
							<div className="bg-red-400 flex w-full p-4 text-white rounded-lg">
								الرمز فير صحيح
							</div>
						)}
						<OTPForm
							onComplete={() => {
								mutateCheckOtp({
									client_id: profile?.id,
									otp_code: OTP.join(''),
								});
							}}
							OTP={OTP}
							setOTP={setOTP}
							isPending={sendOtpIsPending}
						/>
					</div>
				</div>
			)}
		</ProtectedRoute>
	);
}

export default EditProfileForm;
