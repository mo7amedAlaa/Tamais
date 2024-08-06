'use client';
import React from 'react';
import Select, { components } from 'react-select';

const MultiSelectDropdown = ({
	label,
	options,
	selectedOptions,
	handleChange,
	name,
	error,
}: {
	label: string;
	options: any;
	selectedOptions: any;
	handleChange: any;
	name: string;
	error?: string;
}) => {
	options = options.map((option: any) => {
		return {
			value: option.id,
			label: option?.title || option?.name,
		};
	});

	const customStyles = {
		control: (provided: any) => ({
			...provided,
			border: '1px solid #ccc',
			borderRadius: '4px',
			minHeight: '36px',
			boxShadow: 'none',
		}),
		menu: (base: any) => ({
			...base,
			zIndex: 999,
		}),
	};
	console.log(options);
	return (
		<div className="flex flex-col w-full gap-[5px]">
			{label && (
				<label className={`text-[16px] text-[#696F79]`}>{label}</label>
			)}
			<Select
				name={name}
				options={options}
				value={options.filter((option: any) =>
					selectedOptions.some((s: any) => s.id == option.value)
				)}
				onChange={handleChange}
				isMulti
				styles={customStyles}
				closeMenuOnSelect={false}
				classNamePrefix="react-select"
				className="react-select-container"
				components={{
					Option: ({ children, ...props }) => (
						<components.Option {...props}>
							<div>{children}</div>
						</components.Option>
					),
				}}
			/>
			{error && <span className="text-red-500 text-sm">{error}</span>}
		</div>
	);
};

export default MultiSelectDropdown;
