import React from 'react';
import { IoDocumentText } from 'react-icons/io5';
import { FaUsers } from 'react-icons/fa';
import Link from 'next/link';
import { ImHammer2 } from 'react-icons/im';
import { IoLogoYoutube } from 'react-icons/io';
import { FaUserPlus } from 'react-icons/fa';
import { PiCirclesFourFill } from 'react-icons/pi';
import { FaArrowLeftLong } from 'react-icons/fa6';

const Feature = () => {
	return (
		<div className=" relative w-full p-10 md:p-20 mb-10">
			<p className="text-[#00262F] text-[24px] p-5 font-[700]">
				البوابات{' '}
			</p>
			<div className="grid gap-7 mb-8 md:grid-cols-2 lg:grid-cols-3">
				<div className="p-10 w-full duration-300 transform bg-white  rounded shadow-md hover:-translate-y-2 cursor-pointer ">
					<div className="flex items-center text-white justify-center w-12 h-12 mb-4 rounded-lg  bg-gold">
						<IoDocumentText size="30px" />
					</div>
					<h6 className="mb-2 leading-5 font-[700] text-[18px] text-[#000000] ">
						نافذة الاستشارات
					</h6>
					<p className="font-[600] text-[14px] text-[#525050] ">
						استشارات قانونية متخصصة لمساعدتك في حل قضاياك بكفاءة
						ودقة، تواصل معنا الآن للحصول على الدعم القانوني الذي
						تحتاجه
					</p>

					<div className="text-gray mt-6 w-full flex items-end">
						<span className="mr-auto">
							<FaArrowLeftLong />
						</span>
					</div>
				</div>
				<Link
					href="/sub-services"
					className="p-10 duration-300 transform bg-white  rounded shadow-md hover:-translate-y-2 cursor-pointer"
				>
					<div className="flex items-center text-white justify-center w-12 h-12 mb-4 rounded-lg  bg-[#00262F]">
						<PiCirclesFourFill size="30px" />
					</div>
					<h6 className="mb-2 leading-5 font-[700] text-[18px] text-[#000000]">
						بوابة الخدمات
					</h6>
					<p className="font-[600] text-[14px] text-[#525050]">
						استشارات قانونية متخصصة لمساعدتك في حل قضاياك بكفاءة
						ودقة، تواصل معنا الآن للحصول على الدعم القانوني الذي
						تحتاجه
					</p>
					<div className="text-gray mt-6 w-full flex items-end">
						<span className="mr-auto">
							<FaArrowLeftLong />
						</span>
					</div>
				</Link>
				<div className="p-10 duration-300 transform bg-white  rounded shadow-md hover:-translate-y-2 cursor-pointer">
					<div className="flex items-center text-white justify-center w-12 h-12 mb-4 rounded-lg  bg-gold">
						<FaUserPlus size="25px" />
					</div>
					<h6 className="mb-2 font-[700] text-[18px] text-[#000000] leading-5">
						هيئة المستشارين
					</h6>
					<p className="font-[600] text-[14px] text-[#525050]">
						استشارات قانونية متخصصة لمساعدتك في حل قضاياك بكفاءة
						ودقة، تواصل معنا الآن للحصول على الدعم القانوني الذي
						تحتاجه
					</p>
					<div className="text-gray mt-6 w-full flex items-end">
						<span className="mr-auto">
							<FaArrowLeftLong />
						</span>
					</div>
				</div>
				<div className="p-10 duration-300 transform bg-white  rounded shadow-md hover:-translate-y-2 cursor-pointer">
					<div className="flex items-center text-white justify-center w-12 h-12 mb-4 rounded-lg  bg-[#00262F]">
						<IoLogoYoutube size="25px" />
					</div>
					<h6 className="mb-2 font-[700] text-[18px] text-[#000000] leading-5">
						منصة التدريب
					</h6>
					<p className="font-[600] text-[14px] text-[#525050]">
						استشارات قانونية متخصصة لمساعدتك في حل قضاياك بكفاءة
						ودقة، تواصل معنا الآن للحصول على الدعم القانوني الذي
						تحتاجه
					</p>
					<div className="text-gray mt-6 w-full flex items-end">
						<span className="mr-auto">
							<FaArrowLeftLong />
						</span>
					</div>
				</div>
				<Link
					href="/homePage/sections"
					className="p-10 duration-300 transform bg-white  rounded shadow-md hover:-translate-y-2 cursor-pointer"
				>
					<div className="flex items-center text-white justify-center w-12 h-12 mb-4 rounded-lg  bg-gold">
						<FaUsers size="30px" />
					</div>
					<h6 className="mb-2 font-[700] text-[18px] text-[#000000] leading-5">
						الدليل الرقمي
					</h6>
					<p className="font-[600] text-[14px] text-[#525050]">
						استشارات قانونية متخصصة لمساعدتك في حل قضاياك بكفاءة
						ودقة، تواصل معنا الآن للحصول على الدعم القانوني الذي
						تحتاجه
					</p>
					<div className="text-gray mt-6 w-full flex items-end">
						<span className="mr-auto">
							<FaArrowLeftLong />
						</span>
					</div>
				</Link>
				<div className="p-10 duration-300 transform bg-white  rounded shadow-md hover:-translate-y-2 cursor-pointer">
					<div className="flex items-center text-white justify-center w-12 h-12 mb-4 rounded-lg  bg-[#00262F]">
						<ImHammer2 size="30px" />
					</div>
					<h6 className="mb-2 font-[700] text-[18px] text-[#000000] leading-5">
						الدليل العدلي
					</h6>
					<p className="font-[600] text-[14px] text-[#525050]">
						استشارات قانونية متخصصة لمساعدتك في حل قضاياك بكفاءة
						ودقة، تواصل معنا الآن للحصول على الدعم القانوني الذي
						تحتاجه
					</p>
					<div className="text-gray mt-6 w-full flex items-end">
						<span className="mr-auto">
							<FaArrowLeftLong />
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Feature;
