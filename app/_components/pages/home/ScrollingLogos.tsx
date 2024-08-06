export default function ScrollingLogos({
	title,
	logos,
}: {
	title: string;
	logos: string[];
}) {
	return (
		<div className="bg-[#00262F08] my-20 py-8 flex flex-col gap-8 items-center justify-center px-0 lg:px-8">
			<p className="font-bold text-[#00262F] lg:text-xl">{title}</p>
			<div
				style={{ direction: 'ltr' }}
				className="flex w-full overflow-hidden"
			>
				<div className="flex lg:justify-between gap-12 lg:gap-0 w-full px-4 animate-loop-scroll lg:animate-none">
					{logos.map((logo, index) => (
						<img key={index} src={logo} className="max-w-none" />
					))}
				</div>
			</div>
		</div>
	);
}
