"use client";
import { UserTypes } from "@/app/types/enums";
import Link from "next/link";
import React from "react";
import { FaRegUser } from "react-icons/fa";
import { TbHammer } from "react-icons/tb";

function UserTypeMenuSection({
  userType,
  setUsertype,
}: {
  userType: any;
  setUsertype: any;
}) {
  return (
    // <div className=' border-b-[2px] border-gray w-[90%] pb-[12px] justify-center  relative grid grid-cols-2 items-center '>
    //     <Link href={'/auth/signin/client'} className=' flex items-center gap-[5px] justify-center w-full'>
    //         <FaRegUser color={userType==UserTypes.CLIENT?'var(--gold)':'gray'}/>
    //         <p className={`${userType==UserTypes.CLIENT?'text-blue':'text-gray'} font-medium`}>عميل</p>
    //     </Link>
    //     <Link href={'/auth/signin/lawyer'} className=' flex items-center gap-[5px] justify-center mx-auto'>
    //         <TbHammer color={userType==UserTypes.LAWYER?'var(--gold)':'gray'}/>
    //         <p className={`${userType==UserTypes.LAWYER?'text-blue':'text-gray'} font-medium`}>مقدم الخدمه</p>
    //     </Link>
    //     <div className={`absolute w-[50%] h-[3px] bg-blue bottom-[-2px] rounded-md ${userType==UserTypes.CLIENT?'right-0':'left-0'}`}></div>
    // </div>
    <select
      onChange={(e) => setUsertype(e.target.value)}
      value={userType}
      className="border-gray border rounded-md focus:ring-0 dark:focus:ring-0 dark:focus:outline-darkPrimary focus:outline-primary w-full p-2"
    >
      <option value="" disabled={true}>
        اختر نوع الحساب
      </option>
      <option value="client">عميل</option>
      <option value="lawyer">مقدم خدمة</option>
    </select>
  );
}

export default UserTypeMenuSection;
