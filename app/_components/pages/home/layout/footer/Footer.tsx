import Image from "next/image";
import React from "react";
import {
  FaFacebook,
  FaLinkedin,
  FaSnapchat,
  FaSnapchatSquare,
  FaTelegram,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa";
import {
  FaEnvelope,
  FaLocationPin,
  FaPhone,
  FaXTwitter,
} from "react-icons/fa6";
import { HiOutlineMail } from "react-icons/hi";
import { LuAlarmClock, LuPhone } from "react-icons/lu";
import { SlLocationPin } from "react-icons/sl";

function Footer() {
  return (
    <div className="flex flex-col gap-[10px] [background:radial-gradient(50%_50%_at_50%_50%,_#033d4a,_#00262f)] pt-[40px] px-[40px] text-white">
      <div className="flex-col flex gap-[60px] pb-[40px] ">
        <div className=" flex md:flex-row flex-col items-center md:items-start text-center md:text-start gap-[60px] md:gap-[20px] md:justify-between md:px-30">
          <div className="flex flex-col items-center md:items-start gap-[30px]">
            <Image src={"/mainLogo.svg"} width={130} height={100} alt="" />
            <p className="text-[16px] md:text-[20px] text-white">
              يمتاز هي علامة تجارية مسجلة تعنى بتقديم الحلول التقنية
              <br /> والوسائل الإلكترونية المتعلقة بالخدمات والاستشارات
              القانونية،
              <br /> وتقدم من قبل نخبة من المحامين والمحاميات المرخصين رسمياً
              <br /> من وزارة العدل السعودية.
            </p>
            <div className="flex items-center gap-[25px] justify-start text-white opacity-50">
              <FaTelegram className="cursor-pointer" size={30} />
              <FaYoutube className="cursor-pointer" size={30} />
              <FaTiktok className="cursor-pointer" size={30} />
              <FaXTwitter className="cursor-pointer" size={30} />
              <FaLinkedin className="cursor-pointer" size={30} />
              <FaSnapchatSquare className=" cursor-pointer" size={30} />
            </div>
          </div>
          <div className="grid gap-[15px] grid-cols-1 text-[18px] justify-items-center md:justify-items-start">
            <p className="text-gold font-semibold text-xl">روابط سريعة</p>
            <p className="text-md font-light">من نحن</p>
            <p className="text-md font-light">النشره البريدية</p>
            <p className="text-md font-light">خدماتنا</p>
            <p className="text-md font-light">الباقات والإشتراكات</p>
            <p className="text-md font-light">لماذا يمتاز</p>
          </div>
          <div className="grid gap-[15px] grid-cols-1 text-[18px] justify-items-center md:justify-items-start">
            <p className="text-gold font-semibold text-xl">التواصل</p>
            <div className="flex items-center gap-[15px]">
              <FaPhone className="text-gold" size={22} />
              <h1>0534337090</h1>
            </div>
            <div className="flex items-center gap-[15px]">
              <FaLocationPin className="text-gold" size={22} />
              <h1>المملكة العربية السعودية</h1>
            </div>
            <div className="flex items-center gap-[15px]">
              <FaEnvelope className="text-gold" size={22} />
              <h1>ymtaz@ymtaz.sa</h1>
            </div>
          </div>
        </div>
      </div>
      <h1 className="text-center py-[10px]">
        جميع الحقوق محفوظة لشركة أركان الطيف للاتصالات وتقنية المعلومات © 2024
      </h1>
    </div>
  );
}

export default Footer;
