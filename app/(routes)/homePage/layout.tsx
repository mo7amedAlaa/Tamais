import { Cairo, Inter } from 'next/font/google';
import { Almarai } from 'next/font/google';
import { Toaster } from 'react-hot-toast';

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
		<div className={`${cairo.className}  overflow-hidden text-black`}>
			<Header />
			{children}
			{/* <Footer /> */}
		</div>
	);
}
