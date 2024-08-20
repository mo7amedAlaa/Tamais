'use client'
import { getWallet_Client } from '@/app/_api/queries/office.query';
import { useMutation } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { FaClock } from "react-icons/fa6";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import MainButton from '../ui/MainButton';


const MySwal = withReactContent(Swal);

const Balance: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const [wallet, setWallet] = useState<any>(null);

  const { mutate } = useMutation({
    mutationFn: getWallet_Client,
    onSuccess: (res: any) => {
      if (res.status === 200) {
        setWallet(res.data.data.wallet);
        console.log('Data fetched successfully', wallet);
      } else {
        handleError();
      }
      setLoading(false);
    },
    onError: (error) => {
      setError(error)
      setLoading(false);
      handleError();
    },
  });

  useEffect(() => {
    setLoading(true);
    mutate();
  }, [mutate]);

  const handleError = () => {
    MySwal.fire({
      icon: 'error',
      title: 'خطأ',
      text: `${error}`,
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[150px]">
        <svg
          className="animate-spin h-8 w-8 text-blue-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          ></path>
        </svg>
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[150px]">
        {`${error}`}
      </div>
    );
  }

  return (
    <motion.div
      className="bg-[#F8F1DF] border-[0.76px] border-[#D3C6A6] p-2 lg:p-10 rounded-xl mb-4 flex flex-col justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center md:block">
        <h3 className="text-[12px] font-[700] leading-[17.01px] mb-1 md:mb-3">الرصيد الحالي</h3>
        <p className="text-[12px] leading-[17.1px] font-[700] text-[#00262F]">
          <span className="text-[24px] leading-[25px] font-[700] text-[#1D2B3F]">
            {wallet?.total}
          </span>{' '}
          ريال سعودي
        </p>
      </div>
      <div className="mt-4 flex justify-between items-center md:block">
        <h3 className="text-[12px] font-[700] leading-[17.01px] mb-1 md:mb-3">الرصيد المعلق</h3>
        <div className="flex flex-col md:flex-row gap-5 md:gap-0 md:items-center md:justify-between">
          <p className="text-[12px] leading-[17.1px] font-[700] text-[#00262F] flex items-center gap-2">
            <FaClock className="w-5 h-5 text-[#DDB762]" />
            <span className="text-[24px] leading-[25px] font-[700] text-[#1D2B3F]">
              {wallet?.pendingTransfer}
            </span>{' '}
            ريال سعودي
          </p>
          <MainButton className="hidden max-w-fit px-5 py-3 bg-[#F0CF86] lg:block">
            طلب تحويل الرصيد
          </MainButton>
        </div>
      </div>
      <MainButton className="block mx-auto mt-5 max-w-fit px-5 py-3 bg-[#F0CF86] lg:hidden">
        طلب تحويل الرصيد
      </MainButton>
    </motion.div>
  );
};

export default Balance;
