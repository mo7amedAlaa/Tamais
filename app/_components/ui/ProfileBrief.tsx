import React from "react";
import { FaEarthEurope } from "react-icons/fa6";
import { MdOutlineMailOutline } from "react-icons/md";
import { MdOutlineContactMail } from "react-icons/md";

const LawyerBrief = ({ profile }: { profile: any }) => {
  return (
    <div className="rounded-xl bg-slate-50 max-w-[30rem] shadow-lg p-8 sm:p-8 flex flex-col items-start">
      <p className="text-[#A3A4A5] text-[20px] mb-3 font-bold  p-3 border-b-2 border-b-gold">
        المعلومات الشخصية
      </p>

      <div className=" w-full flex flex-col gap-6 mt-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-[#A3A4A5] font-semibold">
            <span className="text-gold">
              <FaEarthEurope size="20px" />
            </span>
            الدولة
          </div>
          <div className="font-semibold">{profile?.country?.name}</div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-[#A3A4A5] font-semibold">
            <span className="text-gold">
              <FaEarthEurope size="20px" />
            </span>
            المدينة
          </div>
          <div className="font-semibold"> {profile?.city?.title} </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-[#A3A4A5] font-semibold">
            <span className="text-gold">
              <MdOutlineContactMail size="20px" />
            </span>
            الجنسية
          </div>
          <div className="font-semibold">{profile?.nationality?.name}</div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-[#A3A4A5] font-semibold">
            <span className="text-gold">
              <MdOutlineMailOutline size="20px" />
            </span>
            البريد الالكتروني
          </div>
          <div className="font-semibold">{profile?.email}</div>
        </div>
      </div>
    </div>
  );
};

export default LawyerBrief;
