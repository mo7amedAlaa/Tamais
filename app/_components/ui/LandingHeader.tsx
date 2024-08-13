'use client';
import { ACCESS_TOKEN, PROFILE_TYPE } from '@/app/_helpers/config/constants';
import useUserProfile from '@/app/_helpers/hooks/useUserProfile';
import { useQueryClient } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { FaBalanceScale, FaBars, FaChevronDown, FaChevronUp, FaRegBell } from 'react-icons/fa';
import { IoBook } from 'react-icons/io5';
import { LuLogOut } from 'react-icons/lu';
import { MdSlowMotionVideo } from 'react-icons/md';

const LandingHeader = () => {
	const [isOpen, setIsOpen] = React.useState(false);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const { data } = useUserProfile();
	const router = useRouter();
	const queryClient = useQueryClient();

	const toggleDropdown = () => {
		setIsDropdownOpen(!isDropdownOpen);
	};

	function signOut() {
		localStorage.removeItem(PROFILE_TYPE);
		localStorage.removeItem(ACCESS_TOKEN);
		queryClient.clear();
		Cookies.remove(PROFILE_TYPE);
		Cookies.remove(ACCESS_TOKEN);
		router.push('/auth/signin');
	}

	const scrollToSection = (id: string) => {
		const section = document.getElementById(id);
		if (section) {
			section.scrollIntoView({ behavior: 'smooth' });
		}
	};

	return (
		<nav className="absolute bg-gradient-to-br from-[#033d4a] to-[#00262f] w-full z-40 shadow">
			<div className="container px-6 py-4 mx-auto">
				<div className="lg:flex lg:items-center lg:justify-between">
					<div className="flex items-center justify-between">
						<a href="/">
							<Image
								width={150}
								height={50}
								className="w-auto h-10"
								src="/mainLogo.svg"
								alt="Logo"
							/>
						</a>

						<div className="flex lg:hidden">
							<button
								onClick={() => setIsOpen(!isOpen)}
								type="button"
								className="text-white focus:outline-none"
								aria-label="toggle menu"
							>
								{!isOpen ? (
									<FaBars className="text-xl" />
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

					<div
						className={`fixed inset-x-0 z-20 px-6 py-4 transition-all duration-300 ease-in-out mt-5 bg-transparent lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:bg-transparent lg:w-auto lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
					>
						<div className="flex text-white flex-col -mx-6 lg:flex-row lg:items-center lg:mx-8">
							<div
								onClick={() => scrollToSection("about-us")}
								className="px-3 py-2 flex items-center hover:text-[#658D96] hover:underline-offset-[3px] gap-2 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 cursor-pointer"
							>
								من نحن
							</div>

							<div
								onClick={() => scrollToSection("main")}
								className="px-3 py-2 flex items-center hover:text-[#658D96] hover:underline-offset-[3px] gap-2 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 cursor-pointer"
							>
								الرئيسية
							</div>
							<div
								onClick={() => scrollToSection('plans')}
								className="px-3 py-2 flex items-center hover:text-[#658D96] hover:underline-offset-[3px] gap-2 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 cursor-pointer"
							>
								الباقات الاشتراكات
							</div>
							<Link
								href="/contact-us"
								className="px-3 py-2 flex items-center hover:text-[#658D96] hover:underline-offset-[3px] gap-2 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0"
							>
								اتصل بنا
							</Link>
						</div>
					</div>

					<div className="hidden text-white gap-5 lg:flex items-center mt-4 lg:mt-0">
						{data ? (
							<>
								<button
									type="button"
									className="flex items-center focus:outline-none"
									aria-label="toggle profile dropdown"
									onClick={toggleDropdown}
								>
									<span className="ml-2">
										{isDropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
									</span>
									<div className="w-8 h-8 overflow-hidden rounded-full">
										<Image
											src={(data?.image as string) || (data?.photo as string)}
											className="object-cover w-full h-full"
											width={50}
											height={50}
											alt="avatar"
										/>
									</div>
								</button>

								<div>
									<FaRegBell size="23px" />
								</div>

								{isDropdownOpen && (
									<div className="absolute top-15 left-20 bg-white text-black mt-2 p-2 rounded shadow-lg">
										<Link
											href="/homePage/profile"
											className="flex items-center p-3 -mt-2 text-sm text-gray-600 transition-colors duration-300 transform hover:bg-gray-100"
										>
											<Image
												className="flex-shrink-0 object-cover mx-1 rounded-full w-9 h-9"
												src={(data?.image as string) || (data?.photo as string)}
												alt="avatar"
												width={50}
												height={50}
											/>
											<div className="mx-1">
												<h1 className="text-sm font-semibold">{data?.name as string}</h1>
												<p className="text-sm text-gray">{data?.email as string}</p>
											</div>
										</Link>

										<hr className="border-slate-100" />
										<Link
											href="#"
											className="px-3 py-2 flex items-center text-[#405B61] text-[12px] font-[600] hover:text-[#658D96] gap-2 mx-3 mt-2 transition-colors duration-300 transform rounded-md"
										>
											<FaBalanceScale size="18px" /> المكتب الالكتروني
										</Link>
										<Link
											href="#"
											className="px-3 py-2 flex items-center text-[#405B61] text-[12px] font-[600] hover:text-[#658D96] gap-2 mx-3 mt-2 transition-colors duration-300 transform rounded-md"
										>
											<MdSlowMotionVideo size="18px" /> منصة التدريب
										</Link>
										<Link
											href="#"
											className="px-3 py-2 flex items-center text-[#405B61] text-[12px] font-[600] hover:text-[#658D96] gap-2 mx-3 mt-2 transition-colors duration-300 transform rounded-md"
										>
											<IoBook size="18px" /> المكتبة والانظمة
										</Link>
										<hr className="border-slate-100" />
										<div
											onClick={signOut}
											className="px-3 py-4 flex items-center hover:text-[#658D96] cursor-pointer text-[#405B61] text-[12px] font-[600] gap-2 mx-3 mt-2 transition-colors duration-300 transform rounded-md"
										>
											<LuLogOut size="18px" /> تسجيل الخروج
										</div>
									</div>
								)}
							</>
						) : (
							<></>
						)}
					</div>
				</div>
			</div>
		</nav>
	);
};

export default LandingHeader;
