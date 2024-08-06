"use client";
import React, { useState } from "react";
import { FaCircleCheck } from "react-icons/fa6";
import MultiSelectDropdown from "./MultiSelectDropdown";
import { ForthFormProps } from "@/app/_api/interfaces/Profile";

const ForthForm = ({
  updateFields,
  selectLogoFile,
  selectImageFile,
  setSelectImageFile,
  setSelectLogoFile,
}: ForthFormProps) => {
  const handleDeleteFile = (
    fileInputId: string,
    setState: React.Dispatch<React.SetStateAction<boolean>>,
  ) => {
    const fileInput = document.getElementById(fileInputId);

    if (fileInput instanceof HTMLInputElement) {
      fileInput.value = "";
    }
    setState(false);
  };

  return (
    <div className="w-full flex flex-col gap-4 mb-4">
      <label className="flex flex-col cursor-pointer items-center w-full p-6 mx-auto mt-2 text-center bg-white border border-[#8692A6] outline-[text-gold] rounded-xl">
        <input
          type="file"
          className="hidden"
          name="imageFile"
          onChange={updateFields}
        />
        {selectImageFile ? (
          <>
            <div className="text-[20px] text-[#696F79] p-8 flex items-center gap-4">
              تم ارفاق الملف بنجاح
              <span className="text-green-500">
                <FaCircleCheck size="25px" />
              </span>
            </div>
            <button
              onClick={() => {
                handleDeleteFile("imageFile", setSelectImageFile);
              }}
              className="text-[#696F79] hover:text-red-500"
            >
              حذف الملف
            </button>
          </>
        ) : (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-12 h-12 text-[#9D9D9E]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
              />
            </svg>
            <h2 className="mt-1 font-medium tracking-wide text-[14px] text-[#9D9D9E]">
              ارفاق الصورة الشخصية (اختياري)
            </h2>
          </>
        )}
      </label>

      <label className="flex flex-col cursor-pointer items-center w-full p-6 mx-auto mt-2 text-center bg-white border border-[#8692A6] outline-[text-gold] rounded-xl">
        <input
          type="file"
          className="hidden"
          name="logoFile"
          onChange={updateFields}
        />
        {selectLogoFile ? (
          <>
            <div className="text-[20px] text-[#696F79] p-8 flex items-center gap-4">
              تم ارفاق الملف بنجاح
              <span className="text-green-500">
                <FaCircleCheck size="25px" />
              </span>
            </div>
            <button
              onClick={() => {
                handleDeleteFile("logoFile", setSelectLogoFile);
              }}
              className="text-[#696F79] hover:text-red-500"
            >
              حذف الملف
            </button>
          </>
        ) : (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-12 h-12 text-[#9D9D9E]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
              />
            </svg>
            <h2 className="mt-1 font-medium tracking-wide text-[14px] text-[#9D9D9E]">
              ارفاق الشعار (الزامي للشركات)
            </h2>
          </>
        )}
      </label>
    </div>
  );
};

export default ForthForm;
