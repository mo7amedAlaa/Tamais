'use client';
import { UserTypes } from '@/app/types/enums';
import React, { useEffect, useState } from 'react';
import { FaAngleLeft, FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import useUserProfile from '@/app/_helpers/hooks/useUserProfile';
import { ACCESS_TOKEN } from '@/app/_helpers/config/constants';
import { useMutation } from '@tanstack/react-query';
import { confirmOtp } from '@/app/_api/queries/auth.query';
import { AxiosError } from 'axios';

function ConfirmOtpPage() {
	const [userType, setUserType] = useState<UserTypes | ''>('');
	const searchParams = useSearchParams();
	const [otp] = useState(searchParams.get('otp'));
	const [clientId] = useState(searchParams.get('clientId'));
	const { mutate, isSuccess, isPending } = useMutation({
		mutationFn: confirmOtp,
		onSuccess: (res) => {
			console.log(res);
			if (res.data.code == 400) {
				setError(res.data.message);
			} else if (res.data.code == 200) {
				setTimeout(() => {
					router.replace('/auth/signin');
				}, 5000);
			}
		},
		onError: (err: AxiosError) => {
			//@ts-ignore
			setError(err.response.data.message);
		},
	});
	const [error, setError] = useState('');
	useEffect(() => {
		mutate({
			otp_code: otp,
			client_id: clientId,
		});
	}, []);
	const router = useRouter();
	return (
		<div className="flex flex-col items-center w-full px-100 justify-center gap-[25px]">
			{isPending && (
				<div className="flex w-full border border-solid border-yellow-300 bg-yellow-200 justify-center items-center py-16 rounded">
					<div role="status">
						<svg
							aria-hidden="true"
							className="w-8 h-8 text-gray-200 animate-spin"
							viewBox="0 0 100 101"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
								fill="currentColor"
							/>
							<path
								d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
								fill="#21C3DB"
							/>
						</svg>
						<span className="sr-only">Loading...</span>
					</div>
				</div>
			)}
			{isSuccess && (
				<div className="flex w-full border border-solid border-green-400 bg-green-200 p-4 rounded">
					<p className="flex flex-col gap-4">
						تهانينا لكم .. <br />
						لقد تم تأكيد البريد الاكتروني بنجاح.
						<br />
						سيتم تحويلكم الى تسجيل الدخول خلال 5 ثواني
						<br />
						<div className="flex gap-1">
							اذا لم يتم التحويل يمكنك
							<span className="underline">
								<Link href="/auth/signin">
									الضغط هنا للتحويل
								</Link>
							</span>
						</div>
					</p>
				</div>
			)}
			{error && (
				<div className="flex w-full border border-solid border-red-400 bg-red-200 p-4 rounded">
					{error}
				</div>
			)}
		</div>
	);
}

export default ConfirmOtpPage;
