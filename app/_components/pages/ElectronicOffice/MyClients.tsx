'use client'
import { getClients } from '@/app/_api/queries/office.query';
import RequestCleint from '@/app/_components/pages/ElectronicOffice/RequestCleint';
import SecondHead from '@/app/_components/ui/SecondHead';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
function MyClients() {
   const [loading, setLoading] = useState<boolean>(false);  
  const [error, setError] = useState<string | null>(null);  
  const [clients, setClients] = useState<any>(null);
 
  const { mutate } = useMutation({
    mutationFn: getClients,
    onSuccess: (res: any) => {
      if (res.status === 200) {
        setClients(res.data.data);
        console.log('Data fetched successfully', clients);
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
  if (error) return <div>Error: {error}</div>;
  return (
    <div className='container mx-auto min-h-screen'>
    <SecondHead title={'عملائي'} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-[25px] gap-y-4  justify-center py-3 md:py-6 ">
        {clients?.clients.map((client,index)=><RequestCleint key={client.id} clientImage={client.image} clientName={client.name} clientCountry={client.nationality.name} />)}
        
        </div>
    </div>
  )
}

export default MyClients
