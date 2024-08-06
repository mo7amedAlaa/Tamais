'use client';
import {
	ClientForgetPassFirstRequest,
	ClientForgetPasswordVerificationCode,
	LawyerForgetPasswordVerificationCode,
} from '@/app/_api/queries/forgotPassword.query';
import InfoSide from '@/app/_components/pages/auth/common/InfoSide';
import OTPForm from '@/app/_components/pages/auth/forgotPassword/otp/OTPForm';
import { UserTypes } from '@/app/types/enums';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { Suspense, useState } from 'react';
import { FaCheck } from 'react-icons/fa';

import { FaAngleLeft } from 'react-icons/fa';

function PageSuspended() {
	const [OTP, setOTP] = useState<string[]>(Array(4).fill(''));
	const [isModalOpen, setIsModalOpen] = useState(false);
	const searchParams = useSearchParams();
	const userType = searchParams.get('userType');
	const email = searchParams.get('email');
	const openModal = () => {
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	const otpString: string = OTP.join('');
	console.log(otpString);

	const { mutate: lawyerOTP, isPending: isLawyerPending } = useMutation({
		mutationFn: () =>
			LawyerForgetPasswordVerificationCode(
				otpString,
				searchParams.get('email') as string
			),
		onSuccess: (data) => {
			console.log(data);
			if (data.status) {
				openModal();
			}
		},
		onError: (err) => console.log(err),
	});

	const { mutate: clientOTP, isPending: isClientPending } = useMutation({
		mutationFn: () =>
			ClientForgetPasswordVerificationCode(
				otpString,
				searchParams.get('email') as string
			),
		onSuccess: (data) => {
			console.log(data);
			if (data.status) {
				openModal();
			}
		},
		onError: (err) => console.log(err),
	});

	const onSubmit = (e: any) => {
		e.preventDefault();
		if (userType == UserTypes.CLIENT) {
			clientOTP();
		} else {
			lawyerOTP();
		}
	};

	return (
		<div className="absolute h-full w-full grid lg:grid-cols-2 grid-cols-1 grid-row-12">
			<div className="row-span-12">
				<div className="flex flex-col items-center w-[90%] md:w-[80%] justify-center mx-auto gap-[25px] py-6">
					<div className="w-[90%] flex flex-col mx-auto mt-20">
						<form
							onSubmit={onSubmit}
							className="w-full h-full flex flex-col"
						>
							<h1 className=" font-bold text-center text-[30px] mb-5 ">
								تاكيد رمز التحقق
							</h1>
							<p className=" text-gray text-[16px] text-center font-medium ">
								تم إرسال رمز التحقق علي البريد الالكتروني الخاص
								بك
							</p>
							<OTPForm OTP={OTP} setOTP={setOTP} />
							<button
								type="submit"
								className="text-white flex justify-center items-center bg-[#DDB762] hover:bg-[#eed090] font-bold py-4 px-4 rounded mt-8"
							>
								{' '}
								{isLawyerPending || isClientPending ? (
									<div className="w-6 h-6 border-4 border-white border-t-[#DDB762] rounded-full animate-spin"></div>
								) : (
									'تاكيد الرمز'
								)}
							</button>
						</form>
					</div>
				</div>
			</div>
			{isModalOpen && (
				<div className="fixed z-20 inset-0 flex items-center justify-center">
					<div className="absolute inset-0 bg-black opacity-50"></div>
					<div className="relative bg-white w-[70%] h-[50%] max-w-md  p-8 sm:w-[343px] sm:h-[310px] md:p-8 flex flex-col justify-around items-center rounded shadow-lg font-semibold text-center">
						<div className="text-white bg-green-500 p-4 rounded-lg">
							<FaCheck size="30px" />
						</div>
						<p>تم تأكيد الرمز التحقق بنجاح</p>
						<Link
							href={`/auth/newPassword?userType=${userType}&otp=${otpString}&email=${email}`}
							onClick={closeModal}
							className="text-white w-full bg-[#DDB762] hover:bg-[#eed090] font-bold py-2 px-4 rounded"
						>
							التالي
						</Link>
					</div>
				</div>
			)}
			<div className="row-span-12">
				<InfoSide />
			</div>
		</div>
	);
}

function Page() {
	return (
		<Suspense>
			<PageSuspended />
		</Suspense>
	);
}

export default Page;
