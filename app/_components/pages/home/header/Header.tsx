import Image from "next/image";
import React from "react";
import {
  FaFacebook,
  FaLinkedin,
  FaSnapchatSquare,
  FaTelegram,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import HeaderRightSection from "./HeaderRightSection";

function Header() {
  return (
    <div className="mt-[60px] pt-[80px] px-[10px] md:px-[50px] w-full bg-blue text-white flex flex-col-reverse md:flex-col gap-[25px]">
      <div
        dir="ltr"
        className="flex items-center justify-center md:justify-start mb-5 md:mb-0 gap-[15px]  "
      >
        <FaSnapchatSquare className=" cursor-pointer" size={22} />
        <FaLinkedin className=" cursor-pointer" size={22} />
        <FaXTwitter className=" cursor-pointer" size={22} />
        <FaTiktok className=" cursor-pointer" size={22} />
        <FaYoutube className=" cursor-pointer" size={22} />
        <FaTelegram className=" cursor-pointer" size={22} />
      </div>
      <div className="flex justify-between w-full">
        <HeaderRightSection />
        <div className="hidden lg:flex">
          <Image
            src={"/headerImage.png"}
            width={650}
            height={650}
            alt="header"
          />
        </div>
      </div>
    </div>
  );
}

export default Header;
