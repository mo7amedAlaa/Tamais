import MainButton from '@/app/_components/ui/MainButton';
import Link from 'next/link';
import React from 'react';
import { FcGoogle } from 'react-icons/fc';
function SignUpButtonSection() {
	return (
		<div className="flex flex-col gap-[25px] w-full">
			{/* <div className="flex items-center  w-full">
				<div className=" w-full h-[1px] bg-gray"></div>
				<h1 className=" w-full text-center text-sm text-blue">
					{' '}
					التسجيل عبر
				</h1>
				<div className=" w-full h-[1px] bg-gray"></div>
			</div>
			<MainButton
				type="button"
				className="flex bg-white shadow-md text-cente  justify-center text-black relative items-center flex-row-reverse"
			>
				<FcGoogle size={30} className=" absolute left-8" />
				<h1 className=" text-center ">الدخول عبر جوجل</h1>
			</MainButton> */}

			<div className="flex flex-row justify-center items-center gap-2">
				<p> لديّك حساب؟</p>
				<Link
					href={'/auth/signin'}
					className=" text-gold text-center underline "
				>
					تسجيل الدخول
				</Link>
			</div>
		</div>
	);
}

export default SignUpButtonSection;
