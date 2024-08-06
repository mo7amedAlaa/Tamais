import Link from 'next/link';

export function Card({
	title,
	image,
	description,
	background,
	link,
}: {
	title: string;
	image: string;
	description: string;
	background?: string;
	link?: string;
}) {
	return (
		<Link
			href={link ? link : '#'}
			className="shadow-md rounded-md flex flex-col py-6 px-4 gap-4"
		>
			<div className="flex flex-row items-center font-bold text-[#00262F] gap-4">
				<div className={`${background} text-white p-3 rounded-md`}>
					<img src={image} alt="card-icon" />
				</div>
				<p>{title}</p>
			</div>
			<p className="font-semibold text-sm leading-6">{description}</p>
		</Link>
	);
}
