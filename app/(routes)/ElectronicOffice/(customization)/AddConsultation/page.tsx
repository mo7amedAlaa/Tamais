'use client'
import { getListAdvisoryAvailableForPricing } from "@/app/_api/queries/office.query";
import CustomizationCard from "@/app/_components/pages/ElectronicOffice/CustomizationCard";
import SecondHead from "@/app/_components/ui/SecondHead";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

 

function Page() {
  const [loading, setLoading] = useState<boolean>(false);  
  const [error, setError] = useState<string | null>(null);  
  const [AdvisoryAvailable, setAdvisoryAvailable] = useState<any>(null);
  const { mutate:fetchAdvisoryAvailable  } = useMutation({
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
  },[fetchAdvisoryAvailable]);
  return (
    <div className="container m-auto  min-h-screen">
      <SecondHead title="تخصيص الاستشارات"/>
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-[25px] gap-y-4  justify-center py-3 md:py-6">
  {
   AdvisoryAvailable?.map(advisory=><CustomizationCard key={advisory.id} title={advisory.types[0].title} active={advisory.types[0].is_activated} prices={advisory.types[0].lawyerPrices}    /> ) 
  }
     
    </div>

    </div>
   
  )
}

export default Page
