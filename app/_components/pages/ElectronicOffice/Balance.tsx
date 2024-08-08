import React from 'react';
import { FaClock } from "react-icons/fa6";
import MainButton from '../../ui/MainButton';

interface BalanceProps {
  currentBalance: string;
  pendingBalance: string;
}

const Balance: React.FC<BalanceProps> = ({ currentBalance, pendingBalance }) => {
  return (
    <div className="bg-[#F8F1DF]  border-[0.76px] border-[#D3C6A6]  p-10 rounded-xl   mb-4 flex flex-col   justify-center">
      <div className='flex justify-between items-center md:block '>
        <h3 className="text-[12px] font-[700] leading-[17.01px]  mb-1 md:mb-3 ">الرصيد الحالي</h3>
        <p className="text-[12] leading-[17.1px] font-[700] text-[#00262F] "> <span className='text-[24px] leading-[25px] font-[700] text-[#1D2B3F]' >{currentBalance} </span> ريال سعودي</p>
       </div>
      <div className="mt-4 flex justify-between items-center md:block ">
        <h3 className="text-[12px] font-[700] leading-[17.01px] mb-1 md:mb-3">الرصيد المعلق</h3>
        <div className='flex flex-col md:flex-row  gap-5 md:gap-0  md:items-center md:justify-between'>
          <p className="text-[12] leading-[17.1px] font-[700] text-[#00262F] flex items-center gap-2 "><FaClock 
 className='w-5 h-5 text-[#DDB762]' />
  <span className='text-[24px] leading-[25px] font-[700] text-[#1D2B3F]' >{pendingBalance} </span> ريال سعودي</p>
  <MainButton className=' hidden max-w-fit px-5 py-3 bg-[#F0CF86] md:block'>طلب تحويل الرصيد </MainButton>
        </div>
      </div>
  <MainButton className=' block mx-auto mt-5   max-w-fit px-5 py-3 bg-[#F0CF86] md:hidden'>طلب تحويل الرصيد </MainButton>
    </div>
  );
};

export default Balance;