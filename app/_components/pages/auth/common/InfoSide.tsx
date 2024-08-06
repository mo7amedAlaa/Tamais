import RotatedArrowLeft from '@/app/_components/ui/RotatedArrowLeft';
import RotatedBottomRightArrow from '@/app/_components/ui/RotatedBottomRightArrow';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

function InfoSide() {
	return (
		<div className="text-white bg-[#00262F] h-full lg:flex hidden flex-col items-center mx-auto w-full fixed lg:relative">
			<div className="relative py-[70px] w-[80%] flex flex-col items-center gap-[25px] justify-center my-auto mx-auto">
				<RotatedArrowLeft className="absolute top-0 left-0" />
				<RotatedBottomRightArrow className="absolute bottom-0 right-0" />
				<Link href="/home">
					<Image
						src={'/mainLogo.svg'}
						width={367}
						height={261}
						alt="logo"
					/>
				</Link>
				<h1 className=" font-400 text-[18px] text-center">
					منصة يمتاز الإلكترونية هي منصتك المثالية
					<br /> للحصول على حلول قانونية شاملة بكل سهولة
					<br /> وسرعة وأمان.
				</h1>
			</div>
		</div>
	);
}

export default InfoSide;
