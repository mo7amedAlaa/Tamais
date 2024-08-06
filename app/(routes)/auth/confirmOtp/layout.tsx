import type { Metadata } from 'next';
import { Cairo, Inter } from 'next/font/google';
import { Almarai } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import Navbar from '@/app/_components/pages/home/layout/navbar/Navbar';
import Footer from '@/app/_components/pages/home/layout/footer/Footer';
import Header from '@/app/_components/ui/Header';
import LandingHeader from '@/app/_components/ui/LandingHeader';
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
	return (
		<div
			className={`${cairo.className} bg-white overflow-hidden text-black`}
		>
			<LandingHeader />
			{children}
		</div>
	);
}
