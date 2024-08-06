import { UserTypes } from '@/app/types/enums';
import Image from 'next/image';
import { SetStateAction } from 'react';
import { BsPentagon } from 'react-icons/bs';
import { FaArrowLeft, FaCaretLeft, FaGavel, FaUser } from 'react-icons/fa';
import { Screens } from './SignUpPage';
//@ts-ignore

const Pentagon = ({ size, type, fillColor }) => {
	const radius = size / 2;
	const angle = (Math.PI * 2) / 5; // Angle between points

	// Calculate the coordinates of each point of the pentagon
	const points = Array.from({ length: 5 }).map((_, index) => ({
		x: radius + radius * Math.sin(index * angle),
		y: radius - radius * Math.cos(index * angle),
	}));

	return (
		<svg
			width={size}
			height={size}
			viewBox={`0 0 ${size} ${size}`}
			className={fillColor}
			// fill={'gold'}
			xmlns="http://www.w3.org/2000/svg"
			style={{ position: 'relative' }}
		>
			<polygon
				points={points.map((p) => `${p.x},${p.y}`).join(' ')}
				className="z-0"
			/>

			{/* <Image
				src="/Icons/Gavel.svg"
				width={26}
				height={26}
				alt="icon"
				style={{
					position: 'absolute',
					top: `${radius - 13}px`,
					left: `${radius - 13}px`,
				}}
			/> */}
			{type == UserTypes.LAWYER ? (
				<FaGavel
					className="text-white text-[26px]"
					x={radius - 12}
					y={radius - 12}
				/>
			) : (
				<FaUser
					className="text-white text-[26px]"
					x={radius - 12}
					y={radius - 12}
				/>
			)}
		</svg>
	);
};
function UserTypeSelectionBox({
	title,
	type,
	setCurrentScreen,
	fillColor,
}: {
	title: string;
	type: string;
	setCurrentScreen: any;
	fillColor: string;
}) {
	return (
		<div
			onClick={(e) =>
				setCurrentScreen(
					type == UserTypes.CLIENT ? Screens.CLIENT : Screens.PROVIDER
				)
			}
			className="flex hover:cursor-pointer p-4 gap-2 border border-white hover:border-[#f4e9ce] rounded-lg drop-shadow-2 w-5/6 items-center justify-center bg-white hover:bg-[#f4e9ce]"
		>
			<Pentagon fillColor={fillColor} size={66} type={type} />
			<div className="flex flex-col w-3/4">
				<p className="text-blue font-bold">{title}</p>
				{/* <p>{description}</p> */}
			</div>
			<FaArrowLeft className="text-[#A6A4A4]" />
		</div>
	);
}

export default UserTypeSelectionBox;
