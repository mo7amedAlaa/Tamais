import { UserProfileResponse } from '@/app/_api/interfaces/UserProfileResponse';
import Image from 'next/image';
import { FaUser } from 'react-icons/fa6';

export default function LawyerCard({
	lawyer,
}: {
	lawyer: UserProfileResponse;
}) {
	return (
		<div
			className={`flex w-full shadow-md rounded-lg p-4 gap-4 ${
				lawyer.special && 'border border-solid border-[#DDB762]'
			}`}
		>
			<Image
				src={lawyer.photo as string}
				height={150}
				width={150}
				className="w-12 h-12 rounded-full"
				alt="Lawyer photo"
			/>
			<div className="flex flex-col">
				<div className="flex flex-row-reverse gap-2 items-center justify-end">
					{lawyer.digital_guide_subscription == 1 && (
						<Image
							src="/verifiedIcon.svg"
							height="150"
							width="150"
							className="w-6 h-6"
							alt="verifiedIcon"
						/>
					)}

					<p className="text-[#00262F] text-lg">{lawyer.name}</p>
				</div>
				<div className="flex gap-2 items-center">
					<Image
						src="/FlagIcon.svg"
						height="150"
						width="150"
						className="w-4 h-4"
						alt="FlagIcon"
					/>
					<p className="text-[#A6A4A4]">{lawyer.country?.name}</p>
				</div>
				<div className="flex gap-2 items-center">
					<Image
						src="/locationIcon.svg"
						height="150"
						width="150"
						className="w-4 h-4"
						alt="locationIcon"
					/>
					<p className="text-[#A6A4A4]">{lawyer.city?.title}</p>
				</div>
			</div>
			{lawyer.rates_avg && (
				<div className="flex flex-row-reverse bg-[#F9EDD3] p-2">
					<Image
						src="/Star.svg"
						height="150"
						width="150"
						className="w-4 h-4"
						alt="Star"
					/>
					<p>{lawyer.rates_avg}</p>
				</div>
			)}
		</div>
	);
}
