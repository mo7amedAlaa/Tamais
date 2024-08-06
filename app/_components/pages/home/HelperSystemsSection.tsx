import React from "react";
import { FaPen } from "react-icons/fa";
import { PiMicrosoftTeamsLogoFill } from "react-icons/pi";
import Card from "../../ui/Card";
import Image from "next/image";

function HelperSystemsSection({ headText }: { headText?: string }) {
  return (
    <div className="flex flex-col gap-[20px]">
      <h1 className=" font-bold text-[30px]">{headText}</h1>
      <div className=" grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[25px] ">
        <Card className="bg-blue grid grid-cols-1 sm:grid-cols-1 p-[20px] h-[190px] md:h-[20rem]">
          <div className=" bg-blue text-gold w-full h-full rounded-lg p-[15px] flex flex-col items-center justify-center gap-[10px]">
            <div className=" bg-white p-[15px] rounded-full w-[80px] h-[80px] relative flex items-center justify-center mx-auto">
              <Image
                src={"/nagez.png"}
                className=" rounded-full"
                width={80}
                height={80}
                alt=""
              />
            </div>
            <h1 className=" font-medium text-[18px]">ناجز</h1>
          </div>
          {/* <div className=' bg-blue text-gold rounded-lg p-[15px] flex flex-col items-center justify-center gap-[10px]'>
                            <div className=' bg-white p-[15px] rounded-full w-[80px] h-[80px] relative flex items-center justify-center mx-auto'>
                           <Image src={'/mo3en.png'} className=' rounded-full' width={80} height={80} alt=''/>
                        </div>
                        <h1 className=' font-medium text-[18px]'>معين</h1>
                    </div>
                    <div className=' bg-blue text-gold rounded-lg p-[15px] flex flex-col items-center justify-center gap-[10px]'>
                            <div className=' bg-white p-[15px] rounded-full w-[80px] h-[80px] relative flex items-center justify-center mx-auto'>
                           <Image src={'/absher.png'} className=' rounded-full' width={80} height={80} alt=''/>
                        </div>
                        <h1 className=' font-medium text-[18px]'>أبشر</h1>
                    </div>
                    <div className=' bg-blue text-gold rounded-lg p-[15px] flex flex-col items-center justify-center gap-[10px]'>
                            <div className=' bg-white p-[15px] rounded-full w-[80px] h-[80px] relative flex items-center justify-center mx-auto'>
                           <Image src={'/nafez.png'} className=' rounded-full' width={80} height={80} alt=''/>
                        </div>
                        <h1 className=' font-medium text-[18px]'>نفاذ</h1>
                    </div> */}
        </Card>

        <Card className="bg-blue grid grid-cols-1 sm:grid-cols-1 p-[20px] h-[190px] md:h-[20rem]">
          <div className=" bg-blue text-gold w-full h-full rounded-lg p-[15px] flex flex-col items-center justify-center gap-[10px]">
            <div className=" bg-white p-[15px] rounded-full w-[80px] h-[80px] relative flex items-center justify-center mx-auto">
              <Image
                src={"/mo3en.png"}
                className=" rounded-full"
                width={80}
                height={80}
                alt=""
              />
            </div>
            <h1 className=" font-medium text-[18px]">معين</h1>
          </div>
        </Card>
        <Card className="bg-blue grid grid-cols-1 sm:grid-cols-1 gap-[10px] p-[20px] h-[190px] md:h-[20rem]">
          <div className=" bg-blue text-gold w-full h-full rounded-lg p-[15px] flex flex-col items-center justify-center gap-[10px]">
            <div className=" bg-white p-[15px] rounded-full w-[80px] h-[80px] relative flex items-center justify-center mx-auto">
              <Image
                src={"/absher.png"}
                className=" rounded-full"
                width={80}
                height={80}
                alt=""
              />
            </div>
            <h1 className=" font-medium text-[18px]">أبشر</h1>
          </div>
        </Card>
        <Card className="bg-blue grid grid-cols-1 sm:grid-cols-1 gap-[10px] p-[20px] h-[190px] md:h-[20rem]">
          <div className=" bg-blue text-gold w-full h-full rounded-lg p-[15px] flex flex-col items-center justify-center gap-[10px]">
            <div className=" bg-white p-[15px] rounded-full w-[80px] h-[80px] relative flex items-center justify-center mx-auto">
              <Image
                src={"/nafez.png"}
                className=" rounded-full"
                width={80}
                height={80}
                alt=""
              />
            </div>
            <h1 className=" font-medium text-[18px]">نفاذ</h1>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default HelperSystemsSection;
