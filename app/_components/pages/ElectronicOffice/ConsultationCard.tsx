import date from '@/public/Icons/date.svg';
import price from '@/public/Icons/price.svg';
import star from '@/public/Icons/star.svg';
import time from '@/public/Icons/time.svg';
import Image from 'next/image';
import React from 'react';
import { IoEyeSharp } from "react-icons/io5";
import MainButton from '../../ui/MainButton';


const ConsultationCard: React.FC = () => {
  return (
    <div className="max-w-full rounded-lg shadow-lg p-6 bg-white  my-1  lg:my-10 max-h-[400px]   ">
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-1 items-center justify-start text-[14px] font-[600] text-[#00262F]  "> <span className='w-[20px] h-[20px] text-[#DDB762]'><IoEyeSharp className='w-full h-full' /></span>استشارة مرئية</div>
        <MainButton className='w-[90px] text-[12px] h-[27px] py-[5.37px] px-[16.89px]  '>قيدالدراسة</MainButton>

      </div>
      <div className=" flex   rounded-md w-full h-[100px] max-w-md gap-2 items-center  ">
        <div className="flex   flex-col  pb-2 mb-2  flex-1  justify-center  gap-2  ">
          <div className='flex items-center justify-between flex-1'>
            <div className="text-sm text-gray-600 flex items-center text-[10px] font-[600] leading-[18.74px] gap-2">  <Image src={date} alt="date icon" /> التاريخ</div>
            <div className="text-[10px] font-[600] leading-[18.74px] text-[#A6A4A4] ">6/12/2024</div>
          </div>
          <div className='flex items-center justify-between flex-1'>
            <div className="text-sm text-gray-600 flex items-center text-[10px] font-[600] leading-[18.74px] gap-2">  <Image src={time} alt='timeIcon' /> الوقت</div>
            <div className="text-[10px] font-[600] leading-[18.74px] text-[#A6A4A4] ">12:30 م</div>
          </div>

        </div>
        <div className="flex items-center h-[45%] w-[1px]  pb-2 mb-2 mx-1   rounded-sm   justify-center ">

          <div className=" w-full h-full  bg-[#E9ECF2]"></div>
        </div>
        <div className="flex  pb-2 mb-2   flex-col justify-center flex-1 gap-2 ">
          <div className='flex items-center justify-between flex-1'>
            <div className="text-sm text-gray-600 flex items-center text-[10px] font-[600] leading-[18.74px] gap-2"> <Image src={star} alt='starIcon' /> درجة الأهمية</div>
            <div className="text-[10px] font-[600] leading-[18.74px] text-[#A6A4A4] ">مهم جدا</div>
          </div>
          <div className='flex items-center justify-between flex-1'>
            <div className="text-sm text-gray-600 flex items-center text-[10px] font-[600] leading-[18.74px] gap-2"> <Image src={price} alt='priceIcon' /> السعر</div>
            <div className="text-[10px] font-[600] leading-[18.74px] text-[#A6A4A4] ">  350 درهم</div>
          </div>


        </div>
      </div>
      <div className="text-[#A6A4A4] text-[12px] leading-[18.43px] font-[600] text-justify">
        لمناقشة تفاصيل التوكيل وأهدافه، وإعداد صيغة التوكيل بناء على متطلباتك الخاصة، ثم يتم مراجعة جميع البنود والشروط معك لضمان فهمك الكامل. بعد ذلك، سيتم توقيع التوكيل وتصديقه لدى الجهات المختصة لضمان صحته.
      </div>
    </div>
  );
};

export default ConsultationCard;