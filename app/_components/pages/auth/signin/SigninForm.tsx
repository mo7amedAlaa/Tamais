"use client";
import {
  ClientSigninResponse,
  LawyerSigninResponse,
} from "@/app/_api/interfaces/SigninResponses";
import { clientSIgnin, lawyerSignin } from "@/app/_api/queries/auth.query";
import MainButton from "@/app/_components/ui/MainButton";
import TextInput from "@/app/_components/ui/TextInput";
import { UserTypes } from "@/app/types/enums";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import React, { useState } from "react";
import Cookies from "js-cookie";
import { ACCESS_TOKEN, PROFILE_TYPE } from "@/app/_helpers/config/constants";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

interface Error {
  response: {
    data: {
      message: string;
    };
  };
}
function SigninForm({
  type,
  setError,
  setIsSuccessOtp,
  isSuccessOtp,
}: {
  type: UserTypes | "";
  setError: any;
  setIsSuccessOtp: any;
  isSuccessOtp: any;
}) {
  const router = useRouter();

  const {
    mutate: clientMutate,
    isPending: isClientPending,
    isSuccess: isClientSuccess,
  } = useMutation({
    mutationFn: clientSIgnin,
    onSuccess: (res: ClientSigninResponse) => {
      Cookies.set(ACCESS_TOKEN, res.data.client.token);
      Cookies.set(PROFILE_TYPE, "client");
      localStorage.setItem(ACCESS_TOKEN, res.data.client.token);
      localStorage.setItem(PROFILE_TYPE, "client");
      router.replace("/homePage/profile");
    },
    onError: (err: Error) => {
      setError(err?.response?.data?.message);
    },
  });
  const {
    mutate: lawyerMutate,
    isPending: isLawyerPending,
    isSuccess: isLawyerSuccess,
  } = useMutation({
    mutationFn: lawyerSignin,
    onSuccess: (res: LawyerSigninResponse) => {
      Cookies.set(ACCESS_TOKEN, res.data.lawyer.token);
      Cookies.set(PROFILE_TYPE, "lawyer");
      localStorage.setItem(ACCESS_TOKEN, res.data.lawyer.token);
      localStorage.setItem(PROFILE_TYPE, "lawyer");
      router.replace("/homePage/profile");
    },
    onError: (err: Error) => {
      setError(err?.response?.data?.message);
    },
  });
  const onSubmit = (e: any) => {
    e.preventDefault();
    if (type == "") {
      toast.error("يرجى اختيار نوع الحساب");
      return;
    }
    if (isSuccessOtp) {
      setIsSuccessOtp(null);
    }
    if (type === UserTypes.CLIENT) {
      clientMutate({
        credential1: e.target.email.value,
        password: e.target.password.value,
      });
    } else {
      lawyerMutate({
        credential1: e.target.email.value,
        password: e.target.password.value,
      });
    }
  };
  return (
    <form onSubmit={onSubmit} className="w-full flex flex-col gap-[25px]">
      <TextInput
        required={true}
        name="email"
        type="email"
        placeholder="الهاتف أو البريد الإلكتروني"
      />
      <TextInput
        required={true}
        name="password"
        type="password"
        placeholder="كلمة المرور"
      />
      <Link
        href={`/auth/userTypeSelection`}
        className="flex flex-row-reverse text-gold"
      >
        نسيت كلمه المرور ؟
      </Link>
      <MainButton
        type="submit"
        isLoading={
          type == UserTypes.CLIENT
            ? isClientPending || isClientSuccess
            : isLawyerPending || isLawyerSuccess
        }
      >
        تسجيل الدخول
      </MainButton>
    </form>
  );
}

export default SigninForm;
