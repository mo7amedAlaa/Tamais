import { Almarai, Cairo, Inter } from 'next/font/google';

import Footer from '@/app/_components/pages/home/layout/footer/Footer';
import Header from '@/app/_components/ui/Header';
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
		<div className={`${cairo.className}  overflow-hidden text-black  bg-whit min-h-screen bg-gray-100 flex flex-col`}>
			<Header />
			<main className="flex-1 p-6 mt-12 ">{children}</main>
			<Footer />
		</div>
	);
}
