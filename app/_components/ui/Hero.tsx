"use client";
import React from "react";

const Hero = () => {
  return (
    <section
      className="relative w-full h-[70vh] flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url(/homeLayout.png)" }}
    >
      <div className="absolute inset-0 bg-black opacity-40"></div>

      <div className="relative mx-auto w-full py-60 ">
        <form className=" w-[80%] sm:w-[70%] md:w-[50%] mx-auto mt-0 md:mt-22 flex gap-3 justify-center items-center">
          <div className="relative w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="gray"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="ابحث خدمات & استشارات & مواعيد"
              className="w-full bg-[#F4F4F4] py-3 pl-12 pr-4 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-gold"
            />
          </div>
          <button className="bg-gold text-white py-3 px-8 font-semibold rounded-md">
            {" "}
            ابحث{" "}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Hero;
