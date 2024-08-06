import Card from "@/app/_components/ui/Card";
import GoldCard from "@/app/_components/ui/GoldCard";
import ParagraphTextExample from "@/app/_components/ui/ParagraphTextExample";
import Image from "next/image";
import React from "react";
import {
  FaFile,
  FaFileAlt,
  FaFileArchive,
  FaPen,
  FaPhone,
  FaPhoneAlt,
  FaPlay,
  FaPlayCircle,
  FaVideo,
} from "react-icons/fa";

function ServicesSection({ headText }: { headText?: string }) {
  return (
    <div className="flex flex-col gap-[20px]">
      <h1 className=" font-bold text-[30px]">{headText}</h1>
      <div className=" grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[25px]">
        <GoldCard>
          <div
            className=" rounded-full p-[20px]"
            style={{
              background:
                "linear-gradient(136.97deg, #DDB762 3.34%, #000000 225.23%)",
            }}
          >
            <Image src={"/Icons/Gov.svg"} width={22} height={22} alt="" />
          </div>
          <h1 className=" font-medium text-[18px]">خدمات الحوكمة</h1>
          {/* <ParagraphTextExample /> */}
        </GoldCard>
        <Card>
          <div className=" text-gold rounded-full p-[20px] bg-white shadow-md">
            <Image src={"/Icons/Company.svg"} width={22} height={22} alt="" />
          </div>
          <h1 className=" font-medium text-[18px]">خدمات الشركات</h1>
          {/* <ParagraphTextExample /> */}
        </Card>
        <Card>
          <div className=" text-gold rounded-full p-[20px] bg-white shadow-md">
            <Image
              src={"/Icons/people-team.svg"}
              width={22}
              height={22}
              alt=""
            />
          </div>
          <h1 className=" font-medium text-[18px]">خدمات الأفراد</h1>
          {/* <ParagraphTextExample /> */}
        </Card>
        <Card>
          <div className=" text-gold rounded-full p-[20px] bg-white shadow-md">
            <Image src={"/Icons/Category.svg"} width={22} height={22} alt="" />
          </div>
          <h1 className=" font-medium text-[18px]">خدمات أخرى</h1>
          {/* <ParagraphTextExample /> */}
        </Card>
      </div>
    </div>
  );
}

export default ServicesSection;
