// Import necessary dependencies
'use client';
import React, { useRef, ChangeEvent, useEffect } from 'react';
import { useParams } from 'next/navigation';

interface TextInputProps {
	className?: string;
	rest?: any;
	value?: string | number;
	defaultValue?: string | number;
	required?: boolean;
	type:
		| 'checkbox'
		| 'time'
		| 'email'
		| 'text'
		| 'file'
		| 'tel'
		| 'date'
		| 'number'
		| 'datetime-local'
		| 'password'
		| 'textarea';
	name: string;
	placeholder?: string;
	label?: string;
	icon?: React.ReactNode;
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
	onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
	disabled?: boolean;
	multiple?: boolean;
	error?: string;
	maxLength?: number;
	pattern?: string;
	max?: string;
}

function TextInput({
	className,
	rest,
	value,
	defaultValue,
	required = false,
	type,
	placeholder,
	name,
	label,
	icon,
	onChange,
	onClick,
	disabled,
	multiple,
	error,
	maxLength,
	pattern,
	max,
}: TextInputProps) {
	const hiddenFileInput = useRef<HTMLInputElement | null>(null);

	const handleClick = () => {
		if (hiddenFileInput.current) {
			hiddenFileInput.current.click();
		}
	};

	return (
		<div className="flex flex-col w-full gap-[5px]">
			{(label || label == ' ') && (
				<label
					className={`text-[16px] text-[#696F79] ${
						label == ' ' && 'text-transparent'
					}`}
				>
					{label == ' ' ? 't' : label}
					{required && <span className="text-red"> *</span>}
				</label>
			)}
			<div className="relative">
				{type !== 'file' ? (
					type == 'textarea' ? (
						<textarea
							disabled={disabled}
							onClick={onClick}
							{...rest}
							onChange={onChange}
							multiple={multiple}
							value={value}
							defaultValue={defaultValue}
							required={required}
							onInvalid={(F) =>
								F.currentTarget.setCustomValidity(
									'هذا الحقل مطلوب'
								)
							}
							onInput={(F) =>
								F.currentTarget.setCustomValidity('')
							}
							name={name}
							placeholder={placeholder}
							className={`text-[16px] w-full  ${
								icon
									? 'py-[12px] px-[30px]'
									: 'px-[12px] py-[12px]'
							} border border-gray rounded-md bg-[#F9F9F9] focus:ring-0 dark:focus:ring-0 dark:focus:outline-darkPrimary focus:outline-primary ${className} ${
								error ? 'border-red-500' : ''
							}`}
						/>
					) : (
						<input
							disabled={disabled}
							onClick={onClick}
							{...rest}
							onChange={onChange}
							multiple={multiple}
							value={value}
							defaultValue={defaultValue}
							required={required}
							onInvalid={(F) =>
								F.currentTarget.setCustomValidity(
									'هذا الحقل مطلوب'
								)
							}
							onInput={(F) =>
								F.currentTarget.setCustomValidity('')
							}
							type={type}
							min={type === 'number' && 0}
							maxLength={maxLength ? maxLength : false}
							name={name}
							placeholder={placeholder}
							pattern={pattern ? pattern : false}
							max={max ? max : false}
							className={`text-[16px] w-full  ${
								icon
									? 'py-[12px] px-[30px]'
									: 'px-[12px] py-[12px]'
							} border border-gray rounded-md bg-[#F9F9F9] focus:ring-0 dark:focus:ring-0 dark:focus:outline-darkPrimary focus:outline-primary ${className} ${
								error ? 'border-red-500' : ''
							}`}
						/>
					)
				) : (
					<div>
						<button
							type="button"
							className={`border rounded-lg p-[13px] w-full `}
							onClick={handleClick}
						>
							<h1 className="rounded-md border p-[5px] w-fit dark:border-grey">
								chooseFile
							</h1>
						</button>
						<input
							type="file"
							onChange={(e) => {
								if (onChange) {
									onChange(e);
								}
							}}
							ref={hiddenFileInput}
							style={{ display: 'none' }}
							multiple={multiple}
						/>
					</div>
				)}
				{icon && (
					<div className="absolute top-[14px] left-[6px]">{icon}</div>
				)}
			</div>
			{error && <span className="text-red-500 text-sm">{error}</span>}
		</div>
	);
}

export default TextInput;
