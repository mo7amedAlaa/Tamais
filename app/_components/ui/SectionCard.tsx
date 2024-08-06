import { FaUser } from 'react-icons/fa6';

export default function SectionCard({
	topColor,
	title,
	numberOfPeople,
}: {
	topColor: string;
	title: string;
	numberOfPeople: string;
}) {
	return (
		<div className="flex flex-col w-full justify-center items-center shadow-md rounded-lg pb-8">
			<div className={`${topColor} h-2 w-full rounded-t-lg`}></div>
			<div className="flex flex-col justify-center items-center mt-8 gap-2">
				<FaUser className="text-2xl text-[#DDB762]" />
				<p className="font-bold text-[#00262F]">{title}</p>
				<p className="py-1 px-3 bg-[#E4D2A9] rounded-lg text-[#B0965B] text-sm">
					{numberOfPeople}
				</p>
			</div>
		</div>
	);
}
