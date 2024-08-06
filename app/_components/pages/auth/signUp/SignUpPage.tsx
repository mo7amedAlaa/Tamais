'use client';
import { UserTypes } from '@/app/types/enums';
import React, { useEffect, useState } from 'react';
import UserTypeMenuSection from './UserTypeSelection';
import SigninForm from './SigninForm';
import SigninButtonSection from './SignUpButtonSection';
import { FaAngleLeft, FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';
import SignUpButtonSection from './SignUpButtonSection';
import UserTypeSelection from './UserTypeSelection';
import ClientSignup from './ClientSignup';
import OTPForm from '../forgotPassword/otp/OTPForm';
import OTPPage from './OTPPage';
import LawyerSignup from './LawyerSignup';
import { useMutation } from '@tanstack/react-query';
import { clientActivate } from '@/app/_api/queries/auth.query';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export enum Screens {
	CLIENT = 'client',
	PROVIDER = 'provider',
	CONFIRM_OTP = 'confirmOtp',
}
function SignUpPage() {
	const router = useRouter();
	const [currentScreen, setCurrentScreen] = useState<Screens>();
	const [OTP, setOTP] = useState<string[]>(Array(4).fill(''));
	const { mutate, isPending, isSuccess } = useMutation({
		mutationFn: clientActivate,
		onSuccess: (res: any) => {
			if (res.code == 200) {
				toast.success('تم تأكيد رمز الحساب');
				router.replace('/auth/signin?success=true&successType=true');
			}
		},
	});
	useEffect(() => {
		if (OTP.every((digit) => digit != '')) {
			checkOtp();
		}
	}, [OTP]);
	async function checkOtp() {
		console.log(OTP.join(''));
		mutate({
			client_id: localStorage.getItem('client_id'),
			otp_code: OTP.join(''),
		});
	}
	return (
		<div className="flex flex-col items-center w-[60%] justify-center mx-auto gap-[25px]">
			{!currentScreen && (
				<div className="flex flex-col py-24 w-full items-center justify-center gap-6 h-[100vh]">
					<Link
						href="/home"
						className="self-end flex items-center gap-3"
					>
						<span>الرئيسية</span>
						<FaAngleLeft />
					</Link>
					<h1 className="font-bold text-[30px]">انضم إلينا</h1>
					<p className="text-gray">اختر نوع الحساب الذى تود إنشاءه</p>
					<UserTypeSelection setCurrentScreen={setCurrentScreen} />
					<SignUpButtonSection />
				</div>
			)}
			{currentScreen == Screens.CLIENT && (
				<div className="flex flex-col w-full items-center justify-center gap-6 min-h-[100vh]">
					<ClientSignup
						className={''}
						setCurrentScreen={setCurrentScreen}
					/>
					<SignUpButtonSection />
				</div>
			)}
			{currentScreen == Screens.PROVIDER && (
				<div className="flex flex-col w-full items-center justify-center gap-6 min-h-[100vh]">
					<LawyerSignup
						className={''}
						setCurrentScreen={setCurrentScreen}
					/>
					<SignUpButtonSection />
				</div>
			)}

			{currentScreen == Screens.CONFIRM_OTP && (
				<OTPPage
					checkOtp={checkOtp}
					isPending={isPending}
					OTP={OTP}
					setOTP={setOTP}
				/>
			)}
		</div>
	);
}

export default SignUpPage;
