'use client'
import { changeConsultationDis, changeConsultationEn, getListAdvisoryAvailableForPricing } from "@/app/_api/queries/office.query";
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
  const [AdvisoryAvailable, setAdvisoryAvailable] = useState<any>(null);

  const { mutate: fetchAdvisoryAvailable } = useMutation({
    mutationFn: getListAdvisoryAvailableForPricing,
    onSuccess: (res: any) => {
      if (res.status === 200) {
        setAdvisoryAvailable(res.data.data);
        console.log('Data fetched successfully', AdvisoryAvailable);
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
    fetchAdvisoryAvailable();
  }, []);

  const { mutate: enableProduct } = useMutation({
    mutationFn: changeConsultationEn,
    onSuccess: (res: any) => {
      if (res.status === 200) {
        fetchAdvisoryAvailable()
        toast.success(' تم تفعيل الاستشارة بنجاح خصصها الان ')
      } else {
        setError('حدث خطأ أثناء تفعيل  الاستشارة  ');
        console.log('Error fetching data');

      }
      setLoading(false);
    },
    onError: (error: any) => {
      setError('حدث خطأ أثناء تفعيل الاستشارة  ');
      toast.error('حدث خطأ أثناء تفعيل الاستشارة ');
      console.log('Error:', error);
      setLoading(false);
    },
  });

  const { mutate: disableProduct } = useMutation({
    mutationFn: changeConsultationDis,
    onSuccess: (res: any) => {
      fetchAdvisoryAvailable()
      toast.success('تم تعطيل الاستشارة ')
      setLoading(false);
    },
    onError: (error: any) => {
      setError('حدث خطأ أثناء تعطيل الاستشارة');
      toast.error('حدث خطأ أثناء تعطيل الاستشارة');
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
      <SecondHead title="تخصيص الاستشارات" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-[25px] gap-y-4  justify-center py-3 md:py-6">
        {
          AdvisoryAvailable?.map(advisory => <div key={advisory.id}>
            <Link href={`/ElectronicOffice/AddConsultation/${advisory.types[0].id}`} passHref>
              <div className="p-6 w-full bg-[#FFFFFF] rounded-[12px] shadow-lg text-[12px] leading-[22.49px] cursor-pointer">
                <div className="flex justify-between items-center font-[700] text-right">
                  <span className="text-blue-500 font-bold flex gap-3 text-[#00262F]">{advisory.types[0].title}</span>
                  {
                    advisory.types[0].isHidden ? <button
                      onClick={(e) => handleDisableProduct(e, advisory.types[0].id, advisory.types[0].is_activated)}
                      className={`font-bold w-[50px]  outline-none rounded-xl flex items-center justify-end bg-[#DDB762]  hover:bg-opacity-80 focus:outline-none`}
                    >
                      <div className='w-6 h-6 rounded-xl bg-[#ECECEF]'></div>
                    </button> : <button
                      onClick={(e) => handleEnableProduct(e, advisory.types[0].id, advisory.types[0].is_activated)}
                      className={`font-bold w-[50px]  outline-none rounded-xl flex items-center bg-[#F8F8F8] hover:bg-opacity-80 focus:outline-none`}
                    >
                      <div className='w-6 h-6 rounded-xl bg-[#ECECEF]'></div>
                    </button>
                  }
                </div>
                {(advisory.types[0].is_activated && advisory.types[0].isHidden) &&
                  <div className="mt-4 flex flex-col text-[#00262F] font-[600] gap-2">
                    {advisory.types[0].isHidden && <div>
                      <div className='bg-[#E9ECF2] w-full h-[1px] my-4'></div>
                      {advisory.types[0].lawyerPrices.map((price) => (
                        price.isHidden === 1 ? <div key={price.id} className="flex justify-between" >
                          <span className='flex gap-3'>
                            <Image src={dollar} alt="price-icon" />
                            {price.importance?.name}
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
