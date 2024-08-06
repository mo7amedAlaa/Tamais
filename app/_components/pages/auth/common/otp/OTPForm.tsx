'use client';
import React, { useState } from 'react';
import OTPInput from './OTPInput';
import MainButton from '@/app/_components/ui/MainButton';

function OTPForm({
	onComplete,
	OTP,
	setOTP,
	isPending,
}: {
	onComplete: any;
	OTP: any;
	setOTP: any;
	isPending: boolean;
}) {
	return (
		<div
			className="flex flex-col gap-[30px] w-full justify-center items-center"
			style={{ direction: 'ltr' }}
		>
			<OTPInput
				setOTP={setOTP}
				OTP={OTP}
				length={4}
				onComplete={onComplete}
			/>
			<MainButton
				type="button"
				isLoading={isPending}
				onClick={onComplete}
			>
				تأكيد الرمز
			</MainButton>
		</div>
	);
}

export default OTPForm;
