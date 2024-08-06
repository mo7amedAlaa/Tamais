import React, { useRef, useState } from "react";

// declare type for the props

type InputProps = {
  length?: number;
  onComplete: (pin: string) => void;
  OTP: string[];
  setOTP: (OTP: string[]) => void;
};

const OTPInput = ({ length = 4, onComplete, OTP, setOTP }: InputProps) => {
  // if you're not using Typescript, simply do const inputRef = useRef()

  const inputRef = useRef<HTMLInputElement[]>(Array(length).fill(null));

  // if you're not using Typescript, do useState()

  const handleTextChange = (input: string, index: number) => {
    const newPin = [...OTP];
    newPin[index] = input;
    setOTP(newPin);

    // check if the user has entered the first digit, if yes, automatically focus on the next input field and so on.

    if (input.length === 1 && index < length - 1) {
      inputRef.current[index + 1]?.focus();
    }

    if (input.length === 0 && index > 0) {
      inputRef.current[index - 1]?.focus();
    }
  };

  // return the inputs component

  return (
    <div className={`grid grid-cols-4 gap-5 `}>
      {Array.from({ length }, (_, index) => (
        <input
          key={index}
          type="text"
          maxLength={1}
          value={OTP[index]}
          onChange={(e) => handleTextChange(e.target.value, index)}
          ref={(ref: any) => (inputRef.current[index] = ref)}
          className={`w-[68px] h-[58px] outline-none text-[#696F79] border border-gray-300 rounded-md text-center font-bold text-2xl focus:border-yellow-500`}
          style={{ marginRight: index === length - 1 ? "0" : "10px" }}
          autoFocus={index === 0}
        />
      ))}
    </div>
  );
};

export default OTPInput;
