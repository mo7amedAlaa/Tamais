'use client';
import { UserProfileResponse } from '@/app/_api/interfaces/UserProfileResponse';
import {
	clientActivate,
	confirmOtp,
	mergedConfirmOtpOnChange,
	mergedResendOtpOnChange,
} from '@/app/_api/queries/auth.query';
import {
	ClientForgetPassFirstRequest,
	ClientForgetPasswordVerificationCode,
	LawyerForgetPasswordVerificationCode,
} from '@/app/_api/queries/forgotPassword.query';
import InfoSide from '@/app/_components/pages/auth/common/InfoSide';
import OTPForm from '@/app/_components/pages/auth/forgotPassword/otp/OTPForm';
import useUserProfile from '@/app/_helpers/hooks/useUserProfile';
import { UserTypes } from '@/app/types/enums';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { Suspense, useEffect, useState } from 'react';
import { FaCheck } from 'react-icons/fa';

import { FaAngleLeft } from 'react-icons/fa';

function PageSuspended() {
	const [OTP, setOTP] = useState<string[]>(Array(4).fill(''));
	const { data: userProfile, isLoading, isError } = useUserProfile();
	const [timer, setTimer] = useState(60);
	const [notification, setNotification] = useState('');

	const router = useRouter();
	useEffect(() => {
		if (userProfile?.confirmationType == null) {
			router.push('/homePage');
		}
	}, [router, userProfile]);
	useEffect(() => {
		let interval: NodeJS.Timeout | null = null;
		if (timer > 0) {
			interval = setInterval(() => {
				setTimer((prevTimer) => prevTimer - 1);
			}, 1000);
		}
		return () => {
			if (interval) {
				clearInterval(interval);
			}
		};
	}, [timer]);
	const queryClient = useQueryClient();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const openModal = () => {
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	const otpString: string = OTP.join('');

	const { mutate: clientOTP, isPending: isClientPending } = useMutation({
		mutationFn: () =>
			mergedConfirmOtpOnChange({
				otp: otpString,
			}),
		onSuccess: (data) => {
			if (data.status) {
				queryClient.invalidateQueries({
					queryKey: ['profile'],
				});
				openModal();
			}
		},
		onError: (err) => console.log(err),
	});
	const { mutate: resendOtp, isPending: isResendPending } = useMutation({
		mutationFn: () => mergedResendOtpOnChange(),
		onSuccess: (data) => {
			if (data.status) {
				setTimer(60); // Reset the timer
				setNotification('تم إعادة إرسال رمز التحقق');
				setTimeout(() => setNotification(''), 3000);
			}
		},
		onError: (err) => console.log(err),
	});

	const onSubmit = (e: any) => {
		e.preventDefault();
		clientOTP();
	};
	const handleResendOtp = () => {
		resendOtp();
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
								تم إرسال رمز التحقق
							</p>
							<OTPForm OTP={OTP} setOTP={setOTP} />
							<button
								type="submit"
								className="text-white flex justify-center items-center bg-[#DDB762] hover:bg-[#eed090] font-bold py-4 px-4 rounded mt-8"
							>
								{' '}
								{isClientPending ? (
									<div className="w-6 h-6 border-4 border-white border-t-[#DDB762] rounded-full animate-spin"></div>
								) : (
									'تاكيد الرمز'
								)}
							</button>
						</form>
						<button
							onClick={handleResendOtp}
							className={`${
								timer > 0 ? 'text-gray' : 'text-gold'
							} flex justify-center items-center bg-gray-500 hover:bg-gray-700 font-bold py-4 px-4 rounded mt-4`}
							disabled={timer > 0}
						>
							{isResendPending ? (
								<div className="w-6 h-6 border-4 border-white border-t-gray-500 rounded-full animate-spin"></div>
							) : (
								`إعادة إرسال رمز التحقق (${timer})`
							)}
						</button>
						{notification && (
							<div className="mt-4 text-center text-green-500">
								{notification}
							</div>
						)}
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
							href={`/homePage`}
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
	const { data: userProfile, isLoading, isError } = useUserProfile();

	const router = useRouter();
	useEffect(() => {
		if ((!isLoading && isError) || (!isLoading && !userProfile)) {
			router.push('/auth/signin');
		}
	}, [isLoading, isError, router, userProfile]);

	if (isLoading) {
		return <div>Loading...</div>;
	}
	return (
		<Suspense>
			<PageSuspended />
		</Suspense>
	);
}

export default Page;
