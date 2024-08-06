"use client";

import { useState } from "react";
import { FaCircleCheck } from "react-icons/fa6";
import { useLawyerTypes } from "@/app/_helpers/hooks/useLawyerGeneralData";
import { FirstFormProps } from "@/app/_api/interfaces/Profile";

const FirstForm = ({
  discription,
  day,
  month,
  year,
  gender,
  lawyerType,
  companyName,
  companyId,
  updateFields,
  selectUserCvFile,
  setSelectUserCvFile,
  selectCompanyLicensesFile,
  setSelectCompanyLicensesFile,
  needLicencesFile,
  needLicencesNum,
  needCompanyName,
}: FirstFormProps) => {
  const handleDeleteLicenseFile = () => {
    const fileInput = document.getElementById(
      "companyLicensesFile",
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }

    setSelectCompanyLicensesFile(false);
  };

  const handleDeleteUserCVFile = () => {
    const fileInput = document.getElementById("userCVFile") as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }

    setSelectUserCvFile(false);
  };

  const { lawyerTypes } = useLawyerTypes();

  return (
    <div className="flex flex-col gap-4">
      <select
        name="lawyerType"
        value={lawyerType}
        onChange={updateFields}
        className="w-full px-2 py-1 outline-[#DDB762] text-[#696F79] border border-gray-300 rounded"
      >
        <option disabled value="">
          نوع الجهه
        </option>
        {lawyerTypes?.data?.types?.map((type) => (
          <option key={type.id} value={type.id}>
            {type.name}
          </option>
        ))}
      </select>

      {lawyerType &&
        lawyerTypes?.data?.types?.find((d) => d.id === parseInt(lawyerType))
          ?.id === 1 && (
          <label className="flex flex-col cursor-pointer items-center w-full p-6 mx-auto mt-2 text-center bg-white border border-[#8692A6] outline-[text-gold] rounded-xl">
            <input
              id="userCVFile"
              type="file"
              className="hidden"
              name="userCVFile"
              onChange={updateFields}
            />
            {selectUserCvFile ? (
              <>
                <div className="text-[20px] text-[#696F79] p-8 flex items-center gap-4">
                  تم ارفاق الملف بنجاح
                  <span className="text-green-500">
                    <FaCircleCheck size="25px" />
                  </span>
                </div>
                <button
                  onClick={handleDeleteUserCVFile}
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
                  ارفاق السيرة الذاتية
                </h2>
              </>
            )}
          </label>
        )}

      {lawyerType &&
        lawyerTypes?.data?.types?.find((d) => d.id === parseInt(lawyerType))
          ?.need_company_name === 1 && (
          <input
            name="companyName"
            value={companyName}
            onChange={updateFields}
            placeholder="اسم الجهه"
            className="w-full text-[#696F79] px-2 py-2 border border-gray-300 rounded outline-[#DDB762]"
            required
          />
        )}

      {lawyerType &&
        lawyerTypes?.data?.types?.find((d) => d.id === parseInt(lawyerType))
          ?.need_company_licence_no === 1 && (
          <input
            name="companyId"
            value={companyId}
            onChange={updateFields}
            placeholder="رقم التسجيل التجاري"
            className="w-full text-[#696F79] px-2 py-2 border border-gray-300 rounded outline-[#DDB762]"
            required
          />
        )}

      {lawyerType &&
        lawyerTypes?.data?.types?.find((d) => d.id === parseInt(lawyerType))
          ?.need_company_licence_file === 1 && (
          <label className="flex flex-col cursor-pointer items-center w-full p-6 mx-auto mt-2 text-center bg-white border border-[#8692A6] outline-[text-gold] rounded-xl">
            <input
              id=""
              type="file"
              className="hidden"
              name="companyLicensesFile"
              onChange={updateFields}
            />
            {selectCompanyLicensesFile ? (
              <>
                <div className="text-[20px] text-[#696F79] p-8 flex items-center gap-4">
                  تم ارفاق الملف بنجاح
                  <span className="text-green-500">
                    <FaCircleCheck size="25px" />
                  </span>
                </div>
                <button
                  onClick={handleDeleteLicenseFile}
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
                  ارفاق نسخة السجل التجاري (الزامي)
                </h2>
              </>
            )}
          </label>
        )}

      <textarea
        name="discription"
        value={discription}
        placeholder="نبذه مختصرة"
        onChange={updateFields}
        className="w-full h-[8rem] text-[#696F79] px-2 py-2 border border-gray-300 rounded outline-[#DDB762]"
        required
      />

      <div className="flex gap-4">
        <select
          name="day"
          value={day}
          onChange={updateFields}
          className="w-full px-2 py-1 outline-[#DDB762] text-[#696F79] border border-gray-300 rounded"
          required
          style={{ appearance: "menulist" }}
        >
          <option disabled value="">
            اليوم
          </option>

          {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
            <option key={day} value={day.toString()}>
              {day}
            </option>
          ))}
        </select>

        <select
          name="month"
          value={month}
          onChange={updateFields}
          className="w-full px-2 py-1 outline-[#DDB762] text-[#696F79] border border-gray-300 rounded"
          required
        >
          <option disabled value="">
            الشهر
          </option>

          {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
            <option key={month} value={month.toString()}>
              {month}
            </option>
          ))}
        </select>

        <select
          name="year"
          value={year}
          onChange={updateFields}
          className="w-full px-2 py-1 outline-[#DDB762] text-[#696F79] border border-gray-300 rounded"
          required
        >
          <option disabled value="">
            السنة
          </option>

          {Array.from(
            { length: 90 },
            (_, i) => new Date().getFullYear() - i,
          ).map((year) => (
            <option key={year} value={year.toString()}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-4 mb-4">
        <select
          name="gender"
          value={gender}
          onChange={updateFields}
          className="w-full px-2 py-1 outline-[#DDB762] text-[#696F79] border border-gray-300 rounded"
          required
        >
          <option disabled value="">
            الجنس
          </option>
          <option value="Male">ذكر</option>
          <option value="Female">انثي</option>
        </select>
      </div>
    </div>
  );
};

export default FirstForm;
