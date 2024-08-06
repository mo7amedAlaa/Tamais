'use client';
import { useEffect, useState } from 'react';
import OTPForm from '../common/otp/OTPForm';
import { useMutation } from '@tanstack/react-query';
import { clientActivate } from '@/app/_api/queries/auth.query';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

function OTPPage({
	checkOtp,
	OTP,
	setOTP,
	isPending,
}: {
	checkOtp: any;
	OTP: any;
	setOTP: any;
	isPending: any;
}) {
	const router = useRouter();

	async function reSendOtp() {}

	return (
		<div className="flex flex-col items-center w-[60%] justify-center mx-auto gap-[25px] h-[100vh]">
			<h1 className="font-bold text-[30px]">تأكيد رمز التحقق</h1>
			<OTPForm
				onComplete={checkOtp}
				OTP={OTP}
				setOTP={setOTP}
				isPending={isPending}
			/>
			{/* <p className="text-gray">لم يصلك رمز تحقق؟</p> */}
			{/* <p onClick={reSendOtp} className="text-gold hover:cursor-pointer">
				رمز تحقق جديد
			</p> */}
		</div>
	);
}

export default OTPPage;
