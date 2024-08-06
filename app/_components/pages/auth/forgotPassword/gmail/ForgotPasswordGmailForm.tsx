"use client";
import {
  ClientForgetPassFirstRequest,
  LawyerForgetPassFirstRequest,
} from "@/app/_api/queries/forgotPassword.query";

import { UserTypes } from "@/app/types/enums";
import { useMutation } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

import React, { useState } from "react";

function ForgotPasswordGmailForm() {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  console.log(email);

  const userType = searchParams.get("userType");
  console.log(userType);

  const {
    mutate: lawyerMutate,
    isPending: isLawyerPending,
    isSuccess: isLawyerSuccess,
  } = useMutation({
    mutationFn: () => LawyerForgetPassFirstRequest(email),
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (err) => console.log(err),
  });

  const {
    mutate: clientMutate,
    isPending: isClientPending,
    isSuccess: isClientSuccess,
  } = useMutation({
    mutationFn: () => ClientForgetPassFirstRequest(email),
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (err) => console.log(err),
  });

  const handleInputChange = (e: any) => {
    setEmail(e.target.value);
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    if (userType == UserTypes.CLIENT) {
      clientMutate();
    } else {
      lawyerMutate();
    }
  };

  if (isLawyerSuccess || isClientSuccess) {
    window.location.href = `/auth/OTP?userType=${userType}&email=${email}`;
    return null;
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-[40px] w-full">
      <input
        type="email"
        name="email"
        required={true}
        placeholder="الهاتف أو البريد الإلكتروني"
        value={email}
        className="w-full text-[#696F79] px-2 py-4 border border-[#696F79] rounded outline-[#DDB762]"
        onChange={handleInputChange}
      />

      <button
        type="submit"
        className="text-white  text-center flex justify-center items-center  bg-[#DDB762] hover:bg-[#eed090] font-bold py-4 px-4 rounded"
      >
        {" "}
        {isLawyerPending || isClientPending ? (
          <div className="w-6 h-6 border-4 border-white border-t-[#DDB762] rounded-full animate-spin"></div>
        ) : (
          "تاكيد الرمز"
        )}
      </button>
    </form>
  );
}

export default ForgotPasswordGmailForm;
