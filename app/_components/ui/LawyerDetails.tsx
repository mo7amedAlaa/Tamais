"use client";
import React, { useState } from "react";
import { BsFillPatchCheckFill } from "react-icons/bs";
import { GiQueenCrown } from "react-icons/gi";
import DeleteModel from "./DeleteModel";

const LawyerDetails = ({ profile }: { profile: any }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className=" rounded-xl  bg-white  shadow-lg p-8 sm:p-8">
      <div className="relative flex-shrink-0">
        <span className="absolute top-0 right-2 text-[#5fa4e4]">
          <BsFillPatchCheckFill size="17px" />
        </span>
        <img
          src="1.jpg"
          alt=""
          className="w-24 h-24 rounded-full object-cover "
        />
      </div>

      <p className="mt-0.5 text-lg font-[700] text-[#2C4768]">
        {" "}
        {profile?.name}{" "}
      </p>
      <div className="flex flex-row items-center gap-2 mb-2 mt-1">
        <span className="text-[#A3A4A5] text-sm font-bold"> محامي قانوني </span>
        <span className="text-yellow-400">
          <GiQueenCrown />
        </span>
      </div>

      <p className="text-[#A3A4A5] text-[20px] mb-3 font-bold">
        النبذة التعريفية{" "}
      </p>
      <span className="text-[#47494b] font-semibold ">
        استشاري القانون عبد العزيز عبد الرحمن الربعي وهو محام مرخص في المملكة
        العربية السعودية، يحمل درجة البكالوريوس في القانون. يتمتع بخبرة تبلغ
        سنتين في مجال ممارسة القانون
      </span>

      <p className="text-[#A3A4A5] text-[16px] mt-3 mb-3 font-bold"> المهن </p>
      <div className="mt-6">
        <span className="text-[#7e8083] font-semibold bg-[#fffbc3] py-3 px-4 rounded-lg mb-3">
          محامي
        </span>
      </div>
      <button
        onClick={handleDeleteClick}
        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mt-10 focus:outline-none focus:shadow-outline"
      >
        مسح الحساب
      </button>

      <DeleteModel
        closeModal={closeModal}
        isModalOpen={isModalOpen}
        id={profile.id}
      />
    </div>
  );
};

export default LawyerDetails;
