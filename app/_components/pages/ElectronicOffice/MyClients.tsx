'use client'
import { getClients } from '@/app/_api/queries/office.query';
import RequestCleint from '@/app/_components/pages/ElectronicOffice/RequestCleint';
import SecondHead from '@/app/_components/ui/SecondHead';
import emptyStateImg from '@/public/publicImage/empty-box.png';
import { useMutation } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import ClientCard from './CleintCard';


const MySwal = withReactContent(Swal);

function MyClients() {
  const [loading, setLoading] = useState<boolean>(false);
  const [clients, setClients] = useState<any[]>([]);
  const [newClients, setNewClients] = useState<number>(0);

  const { mutate } = useMutation({
    mutationFn: getClients,
    onSuccess: (res: any) => {
      if (res.status === 200) {
        setClients(res.data.data?.clients || []);
        setNewClients(res.data.data?.newClientsCount || 0);
        console.log('Data fetched successfully', res.data.data);
      } else {
        handleError();
      }
      setLoading(false);
    },
    onError: (error: any) => {
      handleError();
      console.log('Error:', error);
      setLoading(false);
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
      text: 'حدث خطأ أثناء جلب البيانات',
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
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

  return (
    <div className='container mx-auto min-h-screen'>
      <SecondHead title={'عملائي'} />
      <motion.div
        className='flex items-center justify-center gap-5'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <ClientCard title='الاجمالي' num={clients.length} />
        <ClientCard title='العملاء الجدد' num={newClients} />
      </motion.div>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-[25px] gap-y-4 justify-center py-3 md:py-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {clients.length > 0 ? (
          clients.map((client: any) => (
            <RequestCleint
              key={client.id}
              clientImage={client.image}
              clientName={client.name}
              clientCountry={client.nationality.name}
            />
          ))
        ) : (
          <div className="flex col-span-4 flex-col items-center justify-center min-h-[50vh]">
            <Image src={emptyStateImg} alt="No Data" className="w-52 h-52 mb-4" />
            <p className="text-lg font-semibold text-gray-500">لا يوجد عملاء للعرض</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default MyClients;
