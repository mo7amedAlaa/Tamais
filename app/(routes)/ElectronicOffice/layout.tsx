'use client'
import Footer from '@/app/_components/pages/home/layout/footer/Footer';
import Header from '@/app/_components/ui/Header';
import { PROFILE_TYPE } from '@/app/_helpers/config/constants';
import ProtectedRoute from '@/app/_helpers/middleware/ProtectedRoute';
import { Almarai, Cairo, Inter } from 'next/font/google';
import { useEffect, useState } from 'react';
const ilmarai = Almarai({ weight: '400', subsets: ['arabic'] });
const inter = Inter({ subsets: ['latin'] });
const cairo = Cairo({
	weight: ['400', '500', '600', '700'],
	subsets: ['arabic'],
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const [userType, setUserType] = useState('');
	useEffect(() => {
		setUserType(localStorage.getItem(PROFILE_TYPE) as string);
	}, []);


	return (
		<>
			<ProtectedRoute>
				{userType != 'lawyer' ? <div className='flex items-center justify-center font-semibold text-red-700 text-lg'>Sorry, This Ppage Avaliable only For Lawyer</div> :
					<div
						className={`${cairo.className} bg-white overflow-hidden text-black min-h-screen bg-gray-100 flex flex-col`}
					>
						<Header />
						<main className="flex-1 p-6 mt-22">{children}</main>
						<Footer />
					</div>
				}
			</ProtectedRoute>
		</>

	);
}
