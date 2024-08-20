'use client';
import { ACCESS_TOKEN, PROFILE_TYPE } from '@/app/_helpers/config/constants';
import useUserProfile from '@/app/_helpers/hooks/useUserProfile';
import { useQueryClient } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FaBalanceScale, FaRegBell, FaUser, FaUsers } from 'react-icons/fa';
import { FaChevronDown, FaChevronUp, FaRegHeart } from 'react-icons/fa6';
import { GoHomeFill } from 'react-icons/go';
import { GrLanguage } from "react-icons/gr";
import { IoBook } from 'react-icons/io5';
import { LuLogOut } from 'react-icons/lu';
import { MdAccountBalanceWallet, MdSlowMotionVideo } from 'react-icons/md';

const Header = () => {
	const [isOpen, setIsOpen] = React.useState(false);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const { data, isLoading, isError } = useUserProfile();
	const router = useRouter();
	const queryClient = useQueryClient();
	const toggleDropdown = () => {
		setIsDropdownOpen(!isDropdownOpen);
	};
	const [userType, setUserType] = useState<string>('');

	useEffect(() => {
		const storedUserType = localStorage.getItem(PROFILE_TYPE);
		setUserType(storedUserType || '');
	}, [userType]);
	function signOut() {
		localStorage.removeItem(PROFILE_TYPE);
		localStorage.removeItem(ACCESS_TOKEN);
		queryClient.clear();
		Cookies.remove(PROFILE_TYPE);
		Cookies.remove(ACCESS_TOKEN);
		router.push('/auth/signin');
	}
	return (
		<nav className=" absolute  [background:radial-gradient(50%_50%_at_50%_50%,_#033d4a,_#00262f)] w-full  z-40 shadow ">
			<div className="container px-6 py-4 mx-auto">
				<div className="lg:flex lg:items-center lg:justify-between">
					<div className="flex items-center justify-between">
						<Link href="/home">
							<Image
								width={150}
								height={50}
								className="w-auto h-10"
								src="/mainLogo.svg"
								alt="Logo"
							/>
						</Link>

						{/* Mobile menu button */}
						<div className="flex lg:hidden">
							<button
								onClick={() => setIsOpen(!isOpen)}
								type="button"
								className="text-white focus:outline-none focus:text-gray-600 "
								aria-label="toggle menu"
							>
								{!isOpen ? (
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="w-6 h-6"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										strokeWidth="2"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M4 8h16M4 16h16"
										/>
									</svg>
								) : (
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="w-6 h-6"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										strokeWidth="2"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M6 18L18 6M6 6l12 12"
										/>
									</svg>
								)}
							</button>
						</div>
					</div>

					{/* Mobile Menu open: "block", Menu closed: "hidden" */}
					<div
						className={`${isOpen ? 'opacity-100 translate-x-0' : 'hidden'
							}  inset-x-0 z-20 px-6 py-4 transition-all duration-300 ease-in-out mt-5 bg-transparent text-white lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:bg-transparent lg:w-auto lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center`}
					>
						<div className="flex text-black lg:text-[#DEDEDE] flex-col -mx-6 lg:flex-row lg:items-center lg:mx-8">
							<Link
								href="/homePage"
								className="px-3 py-2 flex items-center hover:text-[#658D96] hover:underline-offset-[3px]  gap-2 mx-3 mt-2 text-white transition-colors duration-300 transform rounded-md lg:mt-0 "
							>
								<GoHomeFill /> الرئيسية
							</Link>

							<Link
								href="#"
								className="px-3 py-2 flex items-center hover:text-[#658D96] hover:underline-offset-[3px]  gap-2 mx-3 mt-2 text-white transition-colors duration-300 transform rounded-md lg:mt-0 "
							>
								<FaUser size="13px" /> صفحتي
							</Link>
							<Link
								href="/homePage/sections"
								className="px-3 py-2 flex items-center hover:text-[#658D96] hover:underline-offset-[3px]  gap-2 mx-3 mt-2 text-white transition-colors duration-300 transform rounded-md lg:mt-0 "
							>
								<FaUsers /> الدليل الرقمي
							</Link>
							<Link
								href="/homePage/profile"
								className="px-3 py-2 flex items-center hover:text-[#658D96] hover:underline-offset-[3px]  gap-2 mx-3 mt-2 text-white transition-colors duration-300 transform rounded-md lg:mt-0 "
							>
								<MdAccountBalanceWallet /> حسابي
							</Link>
						</div>
					</div>

					<div className=" hidden text-white gap-5 lg:flex items-center mt-4 lg:mt-0">
						<button
							type="button"
							className="flex items-center focus:outline-none"
							aria-label="toggle profile dropdown"
							onClick={toggleDropdown}
						>
							<span className="ml-2 ">
								{isDropdownOpen ? (
									<FaChevronUp />
								) : (
									<FaChevronDown />
								)}
							</span>
							<div className="w-8 h-8 overflow-hidden rounded-full">
								<Image
									src={
										(data?.image as string) ||
										(data?.photo as string)
									}
									className="object-cover w-full h-full"
									width={50}
									height={150}
									alt="avatar"
								/>
							</div>
						</button>

						<div className='cursor-pointer '>
							<FaRegBell size="23px" />
						</div>
						<div className='cursor-pointer '>
							<FaRegHeart size="23px" />
						</div>
						<div className='cursor-pointer '>
							<GrLanguage size="23px" />
						</div>

						{isDropdownOpen && (
							<div className="absolute top-15 left-20 bg-white text-black mt-2 p-2 rounded shadow-lg">
								<Link
									href="/homePage/profile"
									className="flex items-center p-3 -mt-2 text-sm text-gray-600 transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
								>
									<Image
										className="flex-shrink-0 object-cover mx-1 rounded-full w-9 h-9"
										src={
											(data?.image as string) ||
											(data?.photo as string)
										}
										alt="avatar"
										width={50}
										height={50}
									/>
									<div className="mx-1">
										<h1 className="text-sm font-semibold ">
											{data?.name as string}
										</h1>
										<p className="text-sm text-gray ">
											{data?.email as string}
										</p>
									</div>
								</Link>

								<hr className="border-slate-100" />
								{
									userType === 'lawyer' && <Link
										href="/ElectronicOffice"
										className="px-3 py-2 flex items-center text-[#405B61] text-[12px] font-[600] hover:text-[#658D96] hover:underline-offset-[3px]  gap-2 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 "
									>
										<FaBalanceScale size="18px" /> المكتب
										الالكتروني
									</Link>
								}
								{
									userType === 'client' && <Link
										href="/homePage/request_office"
										className="px-3 py-2 flex items-center text-[#405B61] text-[12px] font-[600] hover:text-[#658D96] hover:underline-offset-[3px]  gap-2 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 "
									>
										<FaBalanceScale size="18px" />
										مكتب الطلبات
									</Link>
								}

								<Link
									href="#"
									className="px-3 py-2 flex items-center hover:text-[#658D96] text-[#405B61] text-[12px] font-[600] hover:underline-offset-[3px]  gap-2 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 "
								>
									<MdSlowMotionVideo size="18px" /> منصة
									التدريب
								</Link>
								<Link
									href="#"
									className="px-3 py-2 flex items-center hover:text-[#658D96] text-[#405B61] text-[12px] font-[600] hover:underline-offset-[3px]  gap-2 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 "
								>
									<IoBook size="18px" /> المكتبة والانظمة
								</Link>
								<hr className="border-slate-100" />
								<div
									onClick={signOut}
									className="px-3 py-4 flex items-center hover:text-[#658D96] hover:cursor-pointer hover:underline-offset-[3px] text-[#405B61] text-[12px] font-[600]  gap-2 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 "
								>
									<LuLogOut size="18px" /> تسجيل الخروج
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Header;
