import dateicon from "@/public/Icons/date.svg";
import degreeicon from "@/public/Icons/degreeOfImport.svg";
import eyesicon from "@/public/Icons/eyes.svg";
import priceicon from "@/public/Icons/price.svg";
import timeicon from "@/public/Icons/time.svg";
import Image from "next/image";
import React from "react";
interface RequestServiceCard {
  status: string;
  title: string;
  date?: string;
  time?: string;
  price: string;
  senderName?: string;
  senderImage: string;
  importance?: string;
}

const RequestServiceCard: React.FC<RequestServiceCard> = ({
  status,
  title,
  price,
  date,
  time,
  senderName,
  senderImage,
  importance,
}) => {
  return (
    <div className="p-6 w-full bg-[#FFFFFF] rounded-[12px] shadow-lg text-[12px] leading-[22.49px] ">
      <div className="mt-2 flex justify-between items-center font-[700]  text-right">
        <span className="text-blue-500 font-bold flex gap-3 text-[#00262F]">
          <Image src={eyesicon} alt="eyesicon" width={20} />
          {title}
        </span>
        <span
          className={status == "مكتملة" ? "text-[#48BD69]" : "text-[#E52F4F]"}
        >
          {status}
        </span>
      </div>

      <div className="mt-4 flex flex-col  text-[#00262F]  font-[600] gap-2">
        <div className="flex justify-between ">
          <span className="flex gap-3 ">
            {" "}
            <Image src={dateicon} alt="date-icon" />
            التاريخ{" "}
          </span>
          <span className="text-[#A6A4A4]">{date}</span>
        </div>
        <div className="flex justify-between">
          <span className="flex gap-3 ">
            {" "}
            <Image src={timeicon} alt="date-icon" />
            الوقت{" "}
          </span>
          <span className="text-[#A6A4A4]">{time}</span>
        </div>
        <div className="flex justify-between ">
          <span className="flex gap-3 ">
            {" "}
            <Image src={degreeicon} alt="degreeicon " />
            درجة الأهمية
          </span>

          <span className="text-[#A6A4A4]">{importance}</span>
        </div>
        <div className="flex justify-between">
          <span className="flex gap-3 ">
            {" "}
            <Image src={priceicon} alt="priceicon " />
            السعر
          </span>
          <span className="text-[#A6A4A4]">{price} رس</span>
        </div>
      </div>
      <div className="bg-[#E9ECF2] w-full h-[1px] my-4"></div>
      <div className="mt-6 flex items-center gap-3 text-[12px] leading-[16px] text-[#00262F]  font-[600]">
        <Image
          src={senderImage}
          alt="المرسل"
          className="w-6 h-6 rounded-full"
          width={24}
          height={24}
        />
        <span className="mx-2">{senderName}</span>
      </div>
    </div>
  );
};

export default RequestServiceCard;
