 
import Footer from '@/app/_components/pages/home/layout/footer/Footer';
import Header from '@/app/_components/ui/Header';
import LandingHeader from '@/app/_components/ui/LandingHeader';
import { Almarai, Cairo, Inter } from 'next/font/google';
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
			className={`${cairo.className} bg-white overflow-hidden text-black min-h-screen bg-gray-100 flex flex-col`}
		>
    <Header />
      <main className="flex-1 p-6 mt-22">{children}</main>
      <Footer />
    </div>
			
			 
		 
	);
}
