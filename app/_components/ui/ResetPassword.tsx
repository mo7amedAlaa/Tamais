"use client";

import {
  ClientPasswordReset,
  LawyerPasswordReset,
} from "@/app/_api/queries/forgotPassword.query";
import { UserTypes } from "@/app/types/enums";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const searchParams = useSearchParams();
  const userType = searchParams.get("userType");
  console.log(userType);
  const router = useRouter();
  const otp = searchParams.get("otp") as string;

  const {
    mutate: lawyerReset,
    isPending: isLawyerPending,
    isSuccess: isLawyerSuccess,
  } = useMutation({
    mutationFn: () => LawyerPasswordReset(newPassword, confirmPassword, otp),
    onSuccess: (data) => {
      console.log(data);
      router.push("/auth/signin");
    },
    onError: (err) => console.log(err),
  });

  const {
    mutate: clientReset,
    isPending: isClientPending,
    isSuccess: isClientSuccess,
  } = useMutation({
    mutationFn: () => ClientPasswordReset(newPassword, confirmPassword, otp),
    onSuccess: (data) => {
      console.log(data);
      router.push("/auth/signin");
    },
    onError: (err) => console.log(err),
  });

  const onSubmit = (e: any) => {
    e.preventDefault();
    if (userType == UserTypes.CLIENT) {
      clientReset();
    } else {
      lawyerReset();
    }
  };

  const handleNewPasswordChange = (e: any) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e: any) => {
    setConfirmPassword(e.target.value);
  };

  return (
    <div>
      <form className="w-full flex flex-col gap-10 mt-4">
        <div className="flex flex-col gap-3 w-full">
          <input
            type="password"
            placeholder="كلمة المرور الجديدة"
            value={newPassword}
            onChange={handleNewPasswordChange}
            className="w-full text-[#696F79] px-2 py-4 border border-[#696F79] rounded outline-[#DDB762]"
          />
          <input
            type="password"
            placeholder="تاكيد كلمة المرور الجديدة"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            className="w-full text-[#696F79] px-2 py-4 border border-[#696F79] rounded outline-[#DDB762]"
          />
        </div>

        <div className="flex flex-col gap-6 w-full">
          <button
            onClick={onSubmit}
            type="submit"
            className="text-white flex justify-center items-center bg-[#DDB762] hover:bg-[#eed090] font-bold py-4 px-4 rounded mt-8"
          >
            {" "}
            {isLawyerPending || isClientPending ? (
              <div className="w-6 h-6 border-4 border-white border-t-[#DDB762] rounded-full animate-spin"></div>
            ) : (
              "تاكيد "
            )}
          </button>

          <Link
            href="/auth/signin"
            className="text-black flex justify-center border border-[#696F79] font-bold py-4 px-4 rounded"
            type="button"
          >
            تسجيل الدخول
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
