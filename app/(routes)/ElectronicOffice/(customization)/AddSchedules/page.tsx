'use client'
import { changeScheduleDis, changeScheduleEn, getListAppointmentAvailableForPricing } from "@/app/_api/queries/office.query";
import SecondHead from "@/app/_components/ui/SecondHead";
import dollar from '@/public/Icons/dollar.svg';
import emptyStateImg from '@/public/publicImage/empty-box.png';
import { useMutation } from "@tanstack/react-query";
import { motion } from 'framer-motion';
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
function Page() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [schedulesAvailable, setSchedulesAvailable] = useState<any[]>([]);

  const { mutate: fetchSchedulesAvailable } = useMutation({
    mutationFn: getListAppointmentAvailableForPricing,
    onSuccess: (res: any) => {
      if (res.status === 200) {
        setSchedulesAvailable(res.data.data.reservationTypes);
        console.log('Data fetched successfully', schedulesAvailable);
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
    fetchSchedulesAvailable();
  }, []);

  const { mutate: enableProduct } = useMutation({
    mutationFn: changeScheduleEn,
    onSuccess: (res: any) => {
      if (res.status === 200) {
        fetchSchedulesAvailable()
        toast.success(' تم تفعيل الموعد بنجاح خصصها الان ')
      } else {
        setError('حدث خطأ أثناء تفعيل  الموعد  ');
        console.log('Error fetching data');

      }
      setLoading(false);
    },
    onError: (error: any) => {
      setError('حدث خطأ أثناء تفعيل الموعد  ');
      Swal.fire('Error', `${error}`, 'error');
      console.log('Error:', error);
      setLoading(false);
    },
  });

  const { mutate: disableProduct } = useMutation({
    mutationFn: changeScheduleDis,
    onSuccess: (res: any) => {
      fetchSchedulesAvailable()
      toast.success('تم تعطيل الموعد ')
      setLoading(false);
    },
    onError: (error: any) => {
      setError('حدث خطأ أثناء تعطيل الموعد');
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

  return (
    <motion.div className="container m-auto  min-h-screen" initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}>
      <SecondHead title="تخصيص المواعيد" />
      {schedulesAvailable?.length === 0 && !loading && (<div className="flex flex-col items-center justify-center min-h-[50vh]"> <Image src={emptyStateImg} alt="No Data" className="w-52 h-52 mb-4" /> <p className="text-lg font-semibold text-gray-500">لا يوجد طلبات للعرض</p> </div>)}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-[25px] gap-y-4  justify-center py-3 md:py-6">
        {
          schedulesAvailable?.map(schedule => <div key={schedule.id}>
            <Link href={`/ElectronicOffice/AddSchedules/${schedule.id}`} passHref>
              <div className="p-6 w-full bg-[#FFFFFF] rounded-[12px] shadow-lg text-[12px] leading-[22.49px] cursor-pointer">
                <div className="flex justify-between items-center font-[700] text-right">
                  <span className="text-blue-500 font-bold flex gap-3 text-[#00262F]">{schedule.name}</span>
                  {
                    schedule.isHidden ? <button
                      onClick={(e) => handleDisableProduct(e, schedule.id, schedule.is_activated)}
                      className={`font-bold w-[50px]  outline-none rounded-xl flex items-center justify-end bg-[#DDB762]  hover:bg-opacity-80 focus:outline-none`}
                    >
                      <div className='w-6 h-6 rounded-xl bg-[#ECECEF]'></div>
                    </button> : <button
                      onClick={(e) => handleEnableProduct(e, schedule.id, schedule.is_activated)}
                      className={`font-bold w-[50px]  outline-none rounded-xl flex items-center bg-[#F8F8F8] hover:bg-opacity-80 focus:outline-none`}
                    >
                      <div className='w-6 h-6 rounded-xl bg-[#ECECEF]'></div>
                    </button>
                  }
                </div>
                {schedule.is_activated &&
                  <div className="mt-4 flex flex-col text-[#00262F] font-[600] gap-2">
                    <div className='bg-[#E9ECF2] w-full h-[1px] my-4'></div>
                    {schedule.lawyerPrices.map((price) => (
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

