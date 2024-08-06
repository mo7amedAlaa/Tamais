import React, { useRef, useState } from 'react';

// declare type for the props

type InputProps = {
	length?: number;
	onComplete: (pin: string) => void;
	OTP: string[];
	setOTP: (OTP: string[]) => void;
};

const OTPInput = ({ length = 4, onComplete, OTP, setOTP }: InputProps) => {
	const inputRef = useRef<HTMLInputElement[]>(Array(length).fill(null));

	const handleTextChange = (input: string, index: number) => {
		const newPin = [...OTP];
		newPin[index] = input;
		setOTP(newPin);

		if (input.length === 1) {
			// If the current field is filled, focus on the next field
			if (index < length - 1) {
				inputRef.current[index + 1]?.focus();
			}
		} else if (input.length === 0 && index > 0) {
			// If the current field is emptied, focus on the previous field
			inputRef.current[index - 1]?.focus();
		}

		if (newPin.every((digit) => digit !== '')) {
			onComplete(newPin.join(''));
		}
	};

	return (
		<div className="flex justify-center items-center gap-2 md:gap-6 w-full">
			{Array.from({ length }, (_, index) => (
				<input
					key={index}
					type="text"
					maxLength={1}
					value={OTP[index]}
					onChange={(e) => handleTextChange(e.target.value, index)}
					ref={(ref: any) => (inputRef.current[index] = ref)}
					className="max-w-[68px] bg-light-gray border-none h-[58px] border-2 border-gray-300 rounded-md text-center font-bold text-2xl"
					autoFocus={index === 0}
				/>
			))}
		</div>
	);
};

export default OTPInput;
