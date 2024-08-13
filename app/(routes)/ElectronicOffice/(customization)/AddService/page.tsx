'use client'

import { getListServicesAvailableForPricing } from "@/app/_api/queries/office.query";
import CustomizationCard from "@/app/_components/pages/ElectronicOffice/CustomizationCard";
import SecondHead from "@/app/_components/ui/SecondHead";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";



function Page() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [ServicesAvailable, setServicesAvailable] = useState<any>(null);
  const { mutate: fetchServicesAvailable } = useMutation({
    mutationFn: getListServicesAvailableForPricing,
    onSuccess: (res: any) => {
      if (res.status === 200) {
        setServicesAvailable(res.data.data);
        console.log('Data fetched successfully', ServicesAvailable);
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
  }, [fetchServicesAvailable]);
  return (
    <div className="container m-auto  min-h-screen">
      <SecondHead title="تخصيص المواعيد" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-[25px] gap-y-4  justify-center py-3 md:py-6">
        {
          ServicesAvailable?.map((advisory, index) => <div key={advisory.id} >
            <CustomizationCard title={advisory.title} active={advisory.is_activated} prices={advisory.lawyerPrices} type={3} link={`/ElectronicOffice/AddService/${advisory.id}`} />
          </div>)
        }
      </div>

    </div>

  )
}

export default Page
