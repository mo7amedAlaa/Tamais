'use client'
import Footer from '@/app/_components/pages/home/layout/footer/Footer';
import Header from '@/app/_components/ui/Header';
import { PROFILE_TYPE } from '@/app/_helpers/config/constants';
import ProtectedRoute from '@/app/_helpers/middleware/ProtectedRoute';
import { motion } from 'framer-motion';
import { Almarai, Cairo, Inter } from 'next/font/google';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);

const almarai = Almarai({ weight: '400', subsets: ['arabic'] });
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
	const [userType, setUserType] = useState<string>('');

	useEffect(() => {
		const storedUserType = localStorage.getItem(PROFILE_TYPE);
		setUserType(storedUserType || '');
	}, []);

	useEffect(() => {
		if (userType && userType !== 'lawyer') {
			MySwal.fire({
				icon: 'error',
				title: 'Access Denied',
				text: 'Sorry, this page is only available for lawyers.',
				customClass: {
					title: 'text-red-700',
					text: 'text-gray-800'
				},
				confirmButtonColor: '#3085d6',
				confirmButtonText: 'OK'
			});
		}
	}, [userType]);

	return (
		<ProtectedRoute>
			{userType !== 'lawyer' ? (
				<motion.div
					className='flex items-center justify-center font-semibold text-red-700 text-lg min-h-screen'
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5 }}
				>
					<div>
						Sorry, This Page is Only Available for Lawyers
					</div>
				</motion.div>
			) : (
				<div
					className={`${cairo.className} bg-white overflow-hidden text-black min-h-screen bg-gray-100 flex flex-col`}
				>
					<Header />
					<main className="flex-1 p-6 mt-22">{children}</main>
					<Footer />
				</div>
			)}
		</ProtectedRoute>
	);
}
