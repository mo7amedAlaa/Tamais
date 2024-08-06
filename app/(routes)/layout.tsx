import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Almarai, Cairo } from 'next/font/google';
import './globals.css';
import { ReactQueryProvider } from '../_helpers/providers/ReactQueryProvider';
import { Toaster } from 'react-hot-toast';
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
		<html dir="rtl" lang="en">
			<head>
				<title>Ymtaz</title>

				<link rel="icon" href="/favicon.ico" sizes="any" />
			</head>

			<body
				className={`${cairo.className} bg-white overflow-x-hidden text-black`}
			>
				<ReactQueryProvider>
					<Toaster position="top-center" reverseOrder={false} />
					{children}
				</ReactQueryProvider>
			</body>
		</html>
	);
}
