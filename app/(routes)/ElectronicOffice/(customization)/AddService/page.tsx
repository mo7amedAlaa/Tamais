'use client'
import { changeServiceDis, changeServiceEn, getListServicesAvailableForPricing } from "@/app/_api/queries/office.query";
import SecondHead from "@/app/_components/ui/SecondHead";
import dollar from '@/public/Icons/dollar.svg';
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
function Page() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [servicesAvailable, setServicesAvailable] = useState<any[]>([]);

  const { mutate: fetchServicesAvailable } = useMutation({
    mutationFn: getListServicesAvailableForPricing,
    onSuccess: (res: any) => {
      if (res.status === 200) {
        setServicesAvailable(res.data.data);
        console.log('Data fetched successfully', servicesAvailable);
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
    fetchServicesAvailable();
  }, []);

  const { mutate: enableProduct } = useMutation({
    mutationFn: changeServiceEn,
    onSuccess: (res: any) => {
      if (res.status === 200) {
        fetchServicesAvailable()
        toast.success(' تم تفعيل الخدمة بنجاح خصصها الان ')
      } else {
        setError('حدث خطأ أثناء تفعيل  الخدمة  ');
        console.log('Error fetching data');

      }
      setLoading(false);
    },
    onError: (error: any) => {
      setError('حدث خطأ أثناء تفعيل الخدمة  ');
      toast.error('حدث خطأ أثناء تفعيل الخدمة ');
      console.log('Error:', error);
      setLoading(false);
    },
  });

  const { mutate: disableProduct } = useMutation({
    mutationFn: changeServiceDis,
    onSuccess: (res: any) => {
      fetchServicesAvailable()
      toast.success('تم تعطيل الخدمة ')
      setLoading(false);
    },
    onError: (error: any) => {
      setError('حدث خطأ أثناء تعطيل الخدمة');
      toast.error('حدث خطأ أثناء تعطيل الخدمة');
      console.log('Error:', error);
      setLoading(false);
    },
  });

  const handleEnableProduct = (e: React.MouseEvent<HTMLButtonElement>, id, active) => {
    e.preventDefault();
    if (active) {
      enableProduct(id)
    }
  };

  const handleDisableProduct = (e: React.MouseEvent<HTMLButtonElement>, id, active) => {
    e.preventDefault();
    if (active) {
      disableProduct(id)
    }
  };

  return (
    <div className="container m-auto  min-h-screen">
      <SecondHead title="تخصيص الخدمات " />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-[25px] gap-y-4  justify-center py-3 md:py-6">
        {
          servicesAvailable?.map(service => <div key={service.id}>
            <Link href={`/ElectronicOffice/AddService/${service.id}`} passHref>
              <div className="p-6 w-full bg-[#FFFFFF] rounded-[12px] shadow-lg text-[12px] leading-[22.49px] cursor-pointer">
                <div className="flex justify-between items-center font-[700] text-right">
                  <span className="text-blue-500 font-bold flex gap-3 text-[#00262F]">{service.title}</span>
                  {
                    service.isHidden ? <button
                      onClick={(e) => handleDisableProduct(e, service.id, service.is_activated)}
                      className={`font-bold w-[50px]  outline-none rounded-xl flex items-center justify-end bg-[#DDB762]  hover:bg-opacity-80 focus:outline-none`}
                    >
                      <div className='w-6 h-6 rounded-xl bg-[#ECECEF]'></div>
                    </button> : <button
                      onClick={(e) => handleEnableProduct(e, service.id, service.is_activated)}
                      className={`font-bold w-[50px]  outline-none rounded-xl flex items-center bg-[#F8F8F8] hover:bg-opacity-80 focus:outline-none`}
                    >
                      <div className='w-6 h-6 rounded-xl bg-[#ECECEF]'></div>
                    </button>
                  }
                </div>
                {(service.is_activated && service.isHidden) &&
                  <div className="mt-4 flex flex-col text-[#00262F] font-[600] gap-2">
                    {service.isHidden && <div>
                      <div className='bg-[#E9ECF2] w-full h-[1px] my-4'></div>
                      {service.lawyerPrices?.map((price) => (
                        price.isHidden === 1 ? <div key={price.id} className="flex justify-between" >
                          <span className='flex gap-3'>
                            <Image src={dollar} alt="price-icon" />
                            {price.level?.name}
                          </span>
                          <span className='text-[#A6A4A4]'>{price.price}رس</span>
                        </div> : <></>
                      ))}
                    </div>}
                  </div>
                }
              </div>
            </Link >
          </div>)
        }
      </div>
    </div>

  )
}

export default Page

