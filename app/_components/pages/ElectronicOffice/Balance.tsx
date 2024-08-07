import React from 'react';
import { FaClock } from "react-icons/fa6";
import MainButton from '../../ui/MainButton';

interface BalanceProps {
  currentBalance: string;
  pendingBalance: string;
}

const Balance: React.FC<BalanceProps> = ({ currentBalance, pendingBalance }) => {
  return (
    <div className="bg-[#F8F1DF]  border-[0.76px] border-[#D3C6A6]  p-10 rounded-xl   mb-4">
      <div>
        <h3 className="text-[12px] font-[700] leading-[17.01px]  mb-3">الرصيد الحالي</h3>
        <p className="text-[12] leading-[17.1px] font-[700] text-[#00262F] "> <span className='text-[24px] leading-[25px] font-[700] text-[#1D2B3F]' >{currentBalance} </span> ريال سعودي</p>
       </div>
      <div className="mt-4">
        <h3 className="text-[12px] font-[700] leading-[17.01px] mb-3">الرصيد المعلق</h3>
        <div className='flex  items-center justify-between'>
          <p className="text-[12] leading-[17.1px] font-[700] text-[#00262F] flex items-center gap-2 "><FaClock 
 className='w-5 h-5 text-[#DDB762]' />
  <span className='text-[24px] leading-[25px] font-[700] text-[#1D2B3F]' >{pendingBalance} </span> ريال سعودي</p>
  <MainButton className='max-w-fit px-5 py-3 bg-[#F0CF86]'>طلب تحويل الرصيد </MainButton>
        </div>
      </div>
       
    </div>
  );
};

export default Balance;