import Image from 'next/image';

export default function UploadFile({
	handleChange,
	name,
	text,
	error,
	className,
	label,
	value,
	imageHeight = 'h-12',
}: {
	handleChange: any;
	name: string;
	text: string;
	error?: string;
	className?: string;
	value: any;
	label?: string;
	imageHeight?: string;
}) {
	return (
		<div className="flex flex-col gap-[5px] w-full">
			<input
				id={name}
				name={name}
				type="file"
				onChange={handleChange}
				className="hidden"
			/>
			{(label || label == ' ') && (
				<label
					className={`text-[16px] text-[#696F79] ${
						label == ' ' && 'text-transparent'
					}`}
				>
					{label == ' ' ? 't' : label}
				</label>
			)}
			<label
				htmlFor={name}
				className={`w-full flex flex-col hover:cursor-pointer py-10 justify-center items-center border border-[#DDB762] border-dashed rounded-lg bg-[#E4D2A94D] ${className} ${
					error && 'border-red-500 !border-solid'
				}`}
			>
				<Image
					src="/UploadFileIcon.svg"
					alt="icon"
					width={150}
					height="50"
					className={`relative object-contain w-auto ${imageHeight}`}
				/>
				<p className="text-[#DDB762]">{text}</p>
			</label>
			{error && <span className="text-red-500 text-sm">{error}</span>}
		</div>
	);
}
