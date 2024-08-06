import { Cairo, Inter } from 'next/font/google';
import { Almarai } from 'next/font/google';
import Footer from '@/app/_components/pages/home/layout/footer/Footer';
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
			<Footer />
		</div>
	);
}
