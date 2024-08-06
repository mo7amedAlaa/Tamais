import { UserProfileResponse } from '@/app/_api/interfaces/UserProfileResponse';
import Image from 'next/image';
import Link from 'next/link';

export default function LawyerDataCard({
	lawyer,
}: {
	lawyer: UserProfileResponse;
}) {
	return (
		<div className="flex w-full flex-col items-center gap-4">
			<div className="w-full flex flex-col rounded-md py-8 gap-4 shadow-md items-center">
				<div className="flex flex-col lg:flex-row justify-start lg:px-8 items-center w-full gap-4">
					<Image
						width={150}
						height={50}
						className="w-18 h-18 rounded-full object-cover "
						src={lawyer?.photo as string}
						alt="Logo"
					/>
					<div className="flex flex-col gap-2">
						<div className="flex gap-4">
							<p className="font-bold">{lawyer?.name}</p>
							{lawyer.digital_guide_subscription == 1 && (
								<Image
									src="/verifiedIcon.svg"
									height="150"
									width="150"
									className="w-6 h-6"
									alt="verifiedIcon"
								/>
							)}
						</div>

						<div className="flex flex-row gap-2">
							<p className="text-[#A6A4A4]">البلد/المدينه :</p>
							<p className="font-semibold">
								{lawyer?.country?.name} - {lawyer?.region?.name}
							</p>
						</div>
						<div className="flex flex-row gap-2">
							<p className="text-[#A6A4A4]">المؤهل :</p>
							<p className="font-semibold">
								{lawyer?.degree.title}
							</p>
						</div>
					</div>
					{lawyer.rates_avg && (
						<div className="flex flex-row-reverse lg:mr-auto lg:mb-auto bg-[#F9EDD3] p-2">
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
				<div className="flex flex-col px-12 w-full gap-2 half-a-border-on-top-gray py-4">
					<p className="text-[#A6A4A4]">نبذه</p>
					<p>{lawyer?.about}</p>
				</div>
			</div>
			<div className="w-full flex flex-col rounded-md py-8 gap-4 shadow-md px-8">
				<p>المهن</p>
				<div className="flex flex-wrap w-full lg:w-2/3 gap-4">
					{lawyer?.sections.map((item, index) => (
						<div
							key={index}
							className={`py-2 px-4 rounded-md shadow-md text-center text-white ${
								index % 2 === 0
									? 'bg-[#658D96]'
									: 'bg-[#E4D2A9]'
							}`}
						>
							{item.section.title}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
