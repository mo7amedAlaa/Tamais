import { Section2 } from '@/app/_api/interfaces/UserProfileResponse';
import React, { useEffect, useState } from 'react';

const SelectGroup = ({
	options,
	title,
	selectedOption,
	setSelectedOption,
	placeholder = 'Select an option',
	disabled = false,
	error,
	name,
}: {
	options:
		| Section2[]
		| { id: number | string; name?: string; title?: string }[];
	title: string;
	selectedOption?: string;
	setSelectedOption?: (e: any) => void;
	disabled?: boolean;
	placeholder?: string;
	error?: string;
	name?: string;
}) => {
	const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);
	const allOptions: {
		text: string;
		value: string;
	}[] = [];
	allOptions.unshift({
		text: placeholder,
		value: '',
	});
	options.forEach((option) => {
		allOptions.push({
			text: (option.title as string) || (option.name as string),
			value: option.id.toString(),
		});
	});

	const changeTextColor = () => {
		setIsOptionSelected(true);
	};

	return (
		<div className="mb-4.5" style={{ direction: 'rtl' }}>
			<label className="mb-2.5 block text-[#696F79] ">{title}</label>

			<div className="relative z-20 bg-[#F9F9F9] ">
				<select
					value={selectedOption ? selectedOption : ''}
					disabled={disabled}
					onChange={(e) => {
						if (setSelectedOption) {
							setSelectedOption(e.target.value);
						}
						changeTextColor();
					}}
					name={name}
					className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary ${
						isOptionSelected ? 'text-black ' : 'text-gray'
					} ${error ? 'border-red-500' : ''}`}
				>
					{allOptions.map((option) => (
						<option
							key={`${option.text}_${option.value}`}
							value={option.value}
							disabled={option.value == '' ? true : false}
							className="text-body disabled:text-gray"
						>
							{option.text}
						</option>
					))}
				</select>

				<span className="absolute top-1/2 left-4 z-30 -translate-y-1/2">
					<svg
						className="fill-current"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<g opacity="0.8">
							<path
								fillRule="evenodd"
								clipRule="evenodd"
								d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
								fill="#A3A4A5"
							></path>
						</g>
					</svg>
				</span>
			</div>
			{error && <span className="text-red-500 text-sm">{error}</span>}
		</div>
	);
};

export default SelectGroup;
