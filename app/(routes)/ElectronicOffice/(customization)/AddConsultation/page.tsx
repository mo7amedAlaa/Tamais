'use client'
import { changeConsultationDis, changeConsultationEn, getListAdvisoryAvailableForPricing } from "@/app/_api/queries/office.query";
import SecondHead from "@/app/_components/ui/SecondHead";
import dollar from '@/public/Icons/dollar.svg';
import { useMutation } from "@tanstack/react-query";
import { motion } from 'framer-motion';
import emptyStateImg from '@/public/publicImage/empty-box.png';
import Swal from "sweetalert2";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
function Page() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [advisoryAvailable, setAdvisoryAvailable] = useState<any[]>([]);

  const { mutate: fetchAdvisoryAvailable } = useMutation({
    mutationFn: getListAdvisoryAvailableForPricing,
    onSuccess: (res: any) => {
      if (res.status === 200) {
        setAdvisoryAvailable(res.data.data);
        console.log('Data fetched successfully', advisoryAvailable);
      } else {
        setError('حدث خطأ أثناء جلب البيانات');
        console.log('Error fetching data');
      }
      setLoading(false);
    },
    onError: (error: any) => {
      setError('حدث خطأ أثناء جلب البيانات');
      Swal.fire('Error', `${error}`, 'error');
      console.log('Error:', error);
      setLoading(false);
    },
  });
  useEffect(() => {
    setLoading(true);
    fetchAdvisoryAvailable();
  }, []);

  const { mutate: enableProduct } = useMutation({
    mutationFn: changeConsultationEn,
    onSuccess: (res: any) => {
      if (res.status === 200) {
        fetchAdvisoryAvailable()
        toast.success(' تم تفعيل الخدمة بنجاح خصصها الان ')
      } else {
        setError('حدث خطأ أثناء تفعيل  الخدمة');
        console.log('Error fetching data');

      }
      setLoading(false);
    },
    onError: (error: any) => {
      setError('حدث خطأ أثناء تفعيل الخدمة  ');
      Swal.fire('Error', `${error}`, 'error');
      console.log('Error:', error);
      setLoading(false);
    },
  });

  const { mutate: disableProduct } = useMutation({
    mutationFn: changeConsultationDis,
    onSuccess: (res: any) => {
      fetchAdvisoryAvailable()
      toast.success('تم تعطيل الخدمة')
      setLoading(false);
    },
    onError: (error: any) => {
      setError('حدث خطأ أثناء تعطيل الخدمة');
      Swal.fire('Error', `${error}`, 'error');
      console.log('Error:', error);
      setLoading(false);
    },
  });

  const handleEnableProduct = (e: React.MouseEvent<HTMLButtonElement>, id, active) => {
    if (active) {
      e.preventDefault();
      enableProduct(id)
    }
  };

  const handleDisableProduct = (e: React.MouseEvent<HTMLButtonElement>, id, active) => {
    if (active) {
      e.preventDefault();
      disableProduct(id)
    }
  };
  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col items-center">
        <svg
          className="animate-spin h-8 w-8 text-blue-600 mb-4"
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
        <p className="text-blue-600 font-semibold">جاري تحميل البيانات...</p>
      </div>
    </div>
  );


  return (
    <motion.div className="container m-auto  min-h-screen"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <SecondHead title="تخصيص الاستشارات " />
      {advisoryAvailable?.length === 0 && !loading && (<div className="flex flex-col items-center justify-center min-h-[50vh]"> <Image src={emptyStateImg} alt="No Data" className="w-52 h-52 mb-4" /> <p className="text-lg font-semibold text-gray-500">لا يوجد طلبات للعرض</p> </div>)}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-[25px] gap-y-4  justify-center py-3 md:py-6">
        {
          advisoryAvailable?.map(advisory => <div key={advisory.id}>
            <Link href={`/ElectronicOffice/AddConsultation/${advisory.id}`} passHref>
              <div className="p-6 w-full bg-[#FFFFFF] rounded-[12px] shadow-lg text-[12px] leading-[22.49px] cursor-pointer">
                <div className="flex justify-between items-center font-[700] text-right">
                  <span className="text-blue-500 font-bold flex gap-3 text-[#00262F]">{advisory.title}</span>
                  {
                    advisory.isHidden ? <button
                      onClick={(e) => handleDisableProduct(e, advisory.id, advisory.is_activated)}
                      className={`font-bold w-[50px]  outline-none rounded-xl flex items-center justify-end bg-[#DDB762]  hover:bg-opacity-80 focus:outline-none`}
                    >
                      <div className='w-6 h-6 rounded-xl bg-[#ECECEF]'></div>
                    </button> : <button
                      onClick={(e) => handleEnableProduct(e, advisory.id, advisory.is_activated)}
                      className={`font-bold w-[50px]  outline-none rounded-xl flex items-center bg-[#F8F8F8] hover:bg-opacity-80 focus:outline-none`}
                    >
                      <div className='w-6 h-6 rounded-xl bg-[#ECECEF]'></div>
                    </button>
                  }
                </div>
                {advisory.is_activated &&
                  <div className="mt-4 flex flex-col text-[#00262F] font-[600] gap-2">
                    <div className='bg-[#E9ECF2] w-full h-[1px] my-4'></div>
                    {advisory.lawyerPrices?.map((price) => (
                      <div key={price.id} className="flex justify-between" >
                        <span className='flex gap-3'>
                          <Image src={dollar} alt="price-icon" />
                          {price.level?.name}
                        </span>
                        <span className='text-[#A6A4A4]'>{price.price}رس</span>
                      </div>
                    ))}
                  </div>
                }
              </div>
            </Link >
          </div>)
        }
      </div>
    </motion.div>

  )
}

export default Page

