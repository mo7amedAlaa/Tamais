'use client'
import { getWallet } from '@/app/_api/queries/office.query';
import { useMutation } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { FaClock } from "react-icons/fa6";
import MainButton from '../../ui/MainButton';

interface BalanceProps {
  pendingAction?:number 
  pendingTransfer:number 
  total:number 
  transferred?:number
}

const Balance: React.FC  = () => {
  const [loading, setLoading] = useState<boolean>(false);  
  const [error, setError] = useState<string | null>(null);  
  const [wallet, setWallet] = useState<any>(null);
 
  const { mutate } = useMutation({
    mutationFn: getWallet,
    onSuccess: (res: any) => {
      if (res.status === 200) {
        setWallet(res.data.data.wallet);
        console.log('Data fetched successfully', wallet);
      } else {
        setError('حدث خطأ أثناء جلب البيانات');
        console.log('Error fetching data');
      }
      setLoading(false);
    },
    onError: (error: any) => {
      setError('حدث خطأ أثناء جلب البيانات');
      toast.error('حدث خطأ أثناء جلب البيانات');
      console.log('Error:', error);
      setLoading(false);
    },
  });

  useEffect(() => {
    setLoading(true);
    mutate();
  }, [mutate]);

  if (loading) return <div>Loading...</div>;  
  if (error) return <div>Error:{error}</div>
  return (
    <div className=" bg-[#F8F1DF]  border-[0.76px] border-[#D3C6A6] p-2  lg:p-10 rounded-xl   mb-4 flex flex-col   justify-center">
      <div className='flex justify-between items-center md:block '>
        <h3 className="text-[12px] font-[700] leading-[17.01px]  mb-1 md:mb-3 ">الرصيد الحالي</h3>
        <p className="text-[12] leading-[17.1px] font-[700] text-[#00262F] "> <span className='text-[24px] leading-[25px] font-[700] text-[#1D2B3F]' >{wallet?.total} </span> ريال سعودي</p>
       </div>
      <div className="mt-4 flex justify-between items-center md:block ">
        <h3 className="text-[12px] font-[700] leading-[17.01px] mb-1 md:mb-3">الرصيد المعلق</h3>
        <div className='flex flex-col md:flex-row  gap-5 md:gap-0  md:items-center md:justify-between'>
          <p className="text-[12] leading-[17.1px] font-[700] text-[#00262F] flex items-center gap-2 "><FaClock 
 className='w-5 h-5 text-[#DDB762]' />
  <span className='text-[24px] leading-[25px] font-[700] text-[#1D2B3F]' >{wallet?.pendingTransfer } </span> ريال سعودي</p>
  <MainButton className=' hidden max-w-fit px-5 py-3 bg-[#F0CF86] lg:block'>طلب تحويل الرصيد </MainButton>
        </div>
      </div>
  <MainButton className=' block mx-auto mt-5   max-w-fit px-5 py-3 bg-[#F0CF86] lg:hidden'>طلب تحويل الرصيد </MainButton>
    </div>
  );
};

export default Balance;