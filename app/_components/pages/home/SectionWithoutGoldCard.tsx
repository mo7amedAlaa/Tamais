import React from "react";
import { FaPen } from "react-icons/fa";
import Card from "../../ui/Card";
import ParagraphTextExample from "../../ui/ParagraphTextExample";
import Image from "next/image";

function SectionWithoutGoldCard({ headText }: { headText?: string }) {
  return (
    <div className="flex flex-col gap-[20px]">
      <h1 className=" font-bold text-[30px]">{headText}</h1>
      <div className=" grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[25px]">
        <Card className="text-center">
          <div className=" text-gold rounded-full p-[20px] bg-white shadow-md">
            <Image src={"/Icons/PenBox.svg"} width={22} height={22} alt="" />
          </div>
          <h1 className="font-medium text-[18px]">دليل الأنظمة السعودية</h1>
          {/* <ParagraphTextExample /> */}
        </Card>

        <Card>
          <div className=" text-gold rounded-full p-[20px] bg-white shadow-md">
            <Image src={"/Icons/User.svg"} width={22} height={22} alt="" />
          </div>
          <h1 className=" font-medium text-[18px]">المدونات القضائية</h1>
          {/* <ParagraphTextExample /> */}
        </Card>
        <Card>
          <div className=" text-gold rounded-full p-[20px] bg-white shadow-md">
            <Image src={"/Icons/Receipt.svg"} width={22} height={22} alt="" />
          </div>
          <h1 className=" font-medium text-[18px]">الموسوعات الفقهية</h1>
          {/* <ParagraphTextExample /> */}
        </Card>
        <Card>
          <div className=" text-gold rounded-full p-[20px] bg-white shadow-md">
            <Image src={"/Icons/Category.svg"} width={22} height={22} alt="" />
          </div>
          <h1 className=" font-medium text-[18px]">المكتبات المتخصصة</h1>
          {/* <ParagraphTextExample /> */}
        </Card>
      </div>
    </div>
  );
}

export default SectionWithoutGoldCard;
