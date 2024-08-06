"use client";
import React, { useState } from "react";
import OTPInput from "./OTPInput";

type OTPKeyProps = {
  OTP: string[];
  setOTP: (newOTP: string[]) => void;
};

function OTPForm({ OTP, setOTP }: OTPKeyProps) {
  return (
    <div
      dir="ltr"
      className="flex w-full mx-auto justify-center items-center mt-14"
    >
      <OTPInput setOTP={setOTP} OTP={OTP} length={4} onComplete={() => {}} />
    </div>
  );
}

export default OTPForm;
