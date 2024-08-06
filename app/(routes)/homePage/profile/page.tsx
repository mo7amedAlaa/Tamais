'use client';
import { UserProfileResponse } from '@/app/_api/interfaces/UserProfileResponse';
import CompaniesSectionSwiper from '@/app/_components/pages/home/CompaniesSectionSwiper';
import HelperSystemsSection from '@/app/_components/pages/home/HelperSystemsSection';
import NewCommerceSection from '@/app/_components/pages/home/NewCommerceSection';
import SectionWithoutGoldCard from '@/app/_components/pages/home/SectionWithoutGoldCard';
import Header from '@/app/_components/pages/home/header/Header';
import ServicesSection from '@/app/_components/pages/home/servicesSection/ServicesSection';
import NotificationPanel from '@/app/_components/pages/profile/NotificationPanel';
import { PROFILE_TYPE } from '@/app/_helpers/config/constants';
import ProtectedRoute from '@/app/_helpers/middleware/ProtectedRoute';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaFacebook, FaLinkedin, FaUserEdit } from 'react-icons/fa';
import {
	FaClipboard,
	FaClipboardList,
	FaGear,
	FaHeart,
	FaPhone,
	FaUser,
	FaXTwitter,
} from 'react-icons/fa6';

export default function Home() {
	const router = useRouter();
	const { data: userProfile, isLoading } = useQuery<UserProfileResponse>({
		queryKey: ['profile'],
	});
	const [userType, setUserType] = useState('');
	const queryParams = useSearchParams();
	const isSuccess = queryParams.get('success');
	console.log(userProfile);
	useEffect(() => {
		setUserType(localStorage.getItem(PROFILE_TYPE) as string);
	}, []);
	if (isLoading) {
		return <div>Loading...</div>;
	} else {
		return (
			<ProtectedRoute>
				<NotificationPanel
					userProfile={userProfile}
					isLoading={isLoading}
				/>
				{isSuccess == 'true' ? (
					<div className="flex w-full items-center justify-center bg-green-500 text-white p-4">
						<p>تم تعديل الملف بنجاح</p>
					</div>
				) : null}
				<main className="w-full flex gap-[25px] py-12 md:pr-20">
					<div className="hidden md:flex flex-col pl-30 pr-4 py-8 rounded-md text-[#00262F] shadow-md gap-12 h-auto max-h-fit">
						<Link
							href="/homePage/profile"
							className="flex flex-row gap-4 justify-start items-center text-gold"
						>
							<FaUser />
							<p>الملف الشخصي</p>
						</Link>
						<Link
							href="/homePage/profile/edit"
							className="flex flex-row gap-4 justify-start items-center"
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
					<div className="flex md:w-1/2 flex-col py-8 rounded-md shadow-md items-center gap-4">
						<div className="flex flex-col justify-center items-center w-full gap-4">
							<Image
								width={150}
								height={50}
								className="w-24 h-24 rounded-full object-cover "
								src={
									(userProfile?.image as string) ||
									(userProfile?.photo as string)
								}
								alt="Logo"
							/>
							<p className="font-bold">{userProfile?.name}</p>

							{userType == 'lawyer' && (
								<div className="flex flex-wrap w-2/3 gap-4 justify-center">
									{userProfile?.sections.map(
										(item, index) => (
											<div
												key={index}
												className={`py-2 px-4 rounded-md shadow-md text-center text-white ${
													index % 2 === 0
														? 'bg-[#658D96]'
														: 'bg-[#E4D2A9]'
												}`}
											>
												{item.section.title}
											</div>
										)
									)}
								</div>
							)}
						</div>
						{userType == 'lawyer' && (
							<div className="flex flex-col px-12 w-full gap-4 half-a-border-on-top py-4">
								<p>{userProfile?.about}</p>
							</div>
						)}
						<div className="flex flex-col w-full px-12 gap-6 pt-6 half-a-border-on-top">
							<div className="flex flex-row gap-2 text-lg">
								<p className="text-[#A6A4A4]">الدولة :</p>
								<p className="font-semibold">
									{userProfile?.country?.name}
								</p>
							</div>
							<div className="flex flex-row gap-2 text-lg">
								<p className="text-[#A6A4A4]">المدينة :</p>
								<p className="font-semibold">
									{userProfile?.region?.name}
								</p>
							</div>
							<div className="flex flex-row gap-2 text-lg">
								<p className="text-[#A6A4A4]">الجنسية :</p>
								<p className="font-semibold">
									{userProfile?.nationality?.name}
								</p>
							</div>
							<div className="flex flex-row gap-2 text-lg">
								<p className="text-[#A6A4A4]">
									البريد الإلكتروني :
								</p>
								<p className="font-semibold">
									{userProfile?.email}
								</p>
							</div>
						</div>
					</div>
				</main>
			</ProtectedRoute>
		);
	}
}
