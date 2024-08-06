'use client';
import { UserTypes } from '@/app/types/enums';
import React, { useEffect, useState } from 'react';
import UserTypeMenuSection from './UserTypeMenuSection';
import SigninForm from './SigninForm';
import SigninButtonSection from './SigninButtonSection';
import { FaAngleLeft, FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import useUserProfile from '@/app/_helpers/hooks/useUserProfile';
import { ACCESS_TOKEN } from '@/app/_helpers/config/constants';

function SigninPage() {
	const [userType, setUserType] = useState<UserTypes | ''>('');
	const { data, isLoading, isError } = useUserProfile();
	const searchParams = useSearchParams();
	const [successType, setSuccessType] = useState(
		searchParams.get('successType')
	);
	const [isSuccessOtp, setIsSuccessOtp] = useState(
		searchParams.get('success')
	);
	const [error, setError] = useState('');
	const [accessToken, setAccessToken] = useState('');
	useEffect(() => {
		setAccessToken(window.localStorage.getItem(ACCESS_TOKEN) || '');
	}, []);
	const router = useRouter();
	useEffect(() => {
		if (isError) {
			return;
		}
		if (!isLoading && data) {
			console.log(data);
			if (data.accepted == 3) {
				router.push('/homePage/profile/edit');
			} else {
				router.push('/homePage');
			}
		}
	}, [isLoading, isError, router, data]);

	if (accessToken) {
		return <div>Loading...</div>;
	}
	return (
		<div className="flex flex-col items-center w-[50%] justify-center mx-auto gap-[25px]">
			<Link href="/home" className="self-end flex items-center gap-3">
				<span>الرثيسية</span>
				<FaAngleLeft />
			</Link>
			<h1 className="font-bold text-[30px]">تسجيل الدخول</h1>
			{isSuccessOtp && (
				<div className="flex w-full border border-solid border-green-400 bg-green-200 p-4 rounded">
					{!successType
						? 'تم تفعيل الحساب بنجاح'
						: 'تم بعث رابط التفعيل الخاص بحسابكم على بريدكم الإلكتروني المسجل لدينا.'}
				</div>
			)}
			{error && (
				<div className="flex w-full border border-solid border-red-400 bg-red-200 p-4 rounded">
					{error}
				</div>
			)}
			<UserTypeMenuSection
				userType={userType}
				setUsertype={setUserType}
			/>
			<SigninForm
				isSuccessOtp={isSuccessOtp}
				setIsSuccessOtp={setIsSuccessOtp}
				type={userType}
				setError={setError}
			/>
			<SigninButtonSection />
		</div>
	);
}

export default SigninPage;
