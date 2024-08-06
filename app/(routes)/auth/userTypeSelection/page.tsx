import InfoSide from "@/app/_components/pages/auth/common/InfoSide";
import UserSelection from "@/app/_components/ui/UserSelection";
import Link from "next/link";
import React from "react";

import { FaAngleLeft } from "react-icons/fa";
function Page() {
  return (
    <div className="absolute h-full w-full grid lg:grid-cols-2 grid-cols-1 grid-row-12">
      <div className="row-span-12">
        <div className="flex flex-col items-center w-[90%] md:w-[80%] justify-center mx-auto gap-[25px] py-6">
          <Link
            href="/auth/signin"
            className="w-full self-end flex justify-end items-center gap-3"
          >
            <span>الرجوع</span>
            <FaAngleLeft />
          </Link>

          <div className="w-[90%] flex flex-col mx-auto mt-10">
            <div className="w-full h-full flex flex-col">
              <h1 className=" font-bold text-center text-[30px] mb-7 ">
                نوع الحساب
              </h1>
              <p className=" text-gray text-[16px] text-center font-medium mb-8">
                اختر نوع الحساب الذي تود تغير كلمة المرور به{" "}
              </p>
              <UserSelection />
            </div>
          </div>
        </div>
      </div>
      <div className="row-span-12">
        <InfoSide />
      </div>
    </div>
  );
}

export default Page;
