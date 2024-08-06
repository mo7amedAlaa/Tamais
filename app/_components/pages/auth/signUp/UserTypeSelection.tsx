'use client';
import { UserTypes } from '@/app/types/enums';
import Link from 'next/link';
import React from 'react';
import { FaRegUser } from 'react-icons/fa';
import { TbHammer } from 'react-icons/tb';
import UserTypeSelectionBox from './UserTypeSelectionBox';
import { useRouter } from 'next/navigation';

function UserTypeSelection({ setCurrentScreen }: { setCurrentScreen: any }) {
	const router = useRouter();
	return (
		<div className="flex flex-col w-full gap-2 items-center">
			<UserTypeSelectionBox
				title={'طالب الخدمة'}
				type={UserTypes.CLIENT}
				setCurrentScreen={setCurrentScreen}
				fillColor="fill-[#B2C6CB]"
			/>
			<div className="flex w-full items-center justify-center">
				<UserTypeSelectionBox
					title={'مقدم خدمة'}
					type={UserTypes.LAWYER}
					setCurrentScreen={setCurrentScreen}
					fillColor="fill-gold"
				/>
			</div>
		</div>
	);
}

export default UserTypeSelection;
