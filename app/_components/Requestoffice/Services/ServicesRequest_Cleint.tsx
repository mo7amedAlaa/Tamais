'use client'
import { getListServicesFromClient_Client, getListServicesFromDigitalGuide_Client } from '@/app/_api/queries/office.query';
import RequestConsultationCard from '@/app/_components/pages/ElectronicOffice/RequestConsultationCard';
import ActiveTitleTab from '@/app/_components/ui/ActiveTitleTab';
import SecondHead from '@/app/_components/ui/SecondHead';
import emptyStateImg from '@/public/publicImage/empty-box.png';
import { useMutation } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

type TabType = string;

const statusMapping: Record<number, string> = {
  1: 'جديد',
  2: 'انتظار',
  3: 'متأخر',
  4: 'غير منجز',
  5: 'مكتملة'
};

function ServicesRequest_Cleint() {
  const [activeTab, setActiveTab] = useState<TabType>('Customers');
  const buttonTitles = {
    Customers: "العملاء",
    DigitalGuide: "الدليل الرقمي",
  };
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [clientsReservations, setClientsReservations] = useState<any[]>([]);
  const [digitalReservations, setDigitalReservations] = useState<any[]>([]);

  const showError = (message: string) => {
    MySwal.fire({
      icon: 'error',
      title: 'خطأ',
      text: message,
    });
  };

  const { mutate: fetchReservationsFromDigitalGuide } = useMutation({
    mutationFn: getListServicesFromDigitalGuide_Client,
    onSuccess: (res: any) => {
      if (res.status === 200) {
        setDigitalReservations(res.data.data.reservations || []);
        console.log('Data fetched successfully', digitalReservations);
      } else {
        setError('حدث خطأ أثناء جلب البيانات');
        showError('حدث خطأ أثناء جلب البيانات');
      }
      setLoading(false);
    },
    onError: () => {
      setError('حدث خطأ أثناء جلب البيانات');
      showError('حدث خطأ أثناء جلب البيانات');
      setLoading(false);
    },
  });

  const { mutate: fetchReservationsFromClients } = useMutation({
    mutationFn: getListServicesFromClient_Client,
    onSuccess: (res: any) => {
      if (res.status === 200) {
        setClientsReservations(res.data.data.reservations || []);
        console.log('Data fetched successfully', clientsReservations);
      } else {
        setError('حدث خطأ أثناء جلب البيانات');
        showError('حدث خطأ أثناء جلب البيانات');
      }
      setLoading(false);
    },
    onError: () => {
      setError('حدث خطأ أثناء جلب البيانات');
      showError('حدث خطأ أثناء جلب البيانات');
      setLoading(false);
    },
  });

  useEffect(() => {
    setLoading(true);
    fetchReservationsFromDigitalGuide();
    fetchReservationsFromClients();
  }, [fetchReservationsFromDigitalGuide, fetchReservationsFromClients]);

  if (loading) return (
    <motion.div
      className="flex justify-center items-center min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
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
    </motion.div>
  );

  if (error) return (
    <motion.div
      className="flex justify-center items-center min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center text-lg font-semibold text-gray-500">
        {error}
      </div>
    </motion.div>
  );

  return (
    <div className='container mx-auto min-h-screen'>
      <SecondHead title={'طلبات الخدمااااات'} />
      <ActiveTitleTab
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        buttonTitles={buttonTitles}
      />
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-[25px] gap-y-4 justify-center py-3 md:py-6"
      >
        {activeTab === 'DigitalGuide' ? (
          digitalReservations.length > 0 ? (
            digitalReservations.map((reservation: any) => (
              <motion.div
                key={reservation.id}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Link href={`/homePage/request_office/consultationsRequest/Reply_digital/${reservation.id}`}>
                  <RequestConsultationCard
                    status={statusMapping[reservation.request_status] || 'غير محدد'}
                    title={reservation.advisory_services_id.title}
                    date={new Date(reservation.created_at).toLocaleDateString('ar-US')}
                    time={new Date(reservation.created_at).toLocaleTimeString('ar-US')}
                    importance={reservation.importance.title}
                    price={reservation.price}
                    senderName={reservation?.lawyer?.name}
                    senderImage={reservation?.lawyer?.photo}
                  />
                </Link>
              </motion.div>
            ))
          ) : (
            <div className="flex col-span-4 flex-col items-center justify-center min-h-[50vh]">
              <Image src={emptyStateImg} alt="No Data" className="w-52 h-52 mb-4" />
              <p className="text-lg font-semibold text-gray-500">لا يوجد طلبات للعرض</p>
            </div>
          )
        ) : (
          clientsReservations.length > 0 ? (
            clientsReservations.map((reservation: any) => (
              <motion.div
                key={reservation.id}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Link href={`/homePage/request_office/consultationsRequest/Reply_client/${reservation.id}`}>
                  <RequestConsultationCard
                    status={statusMapping[reservation.request_status] || 'غير محدد'}
                    title={reservation.advisory_services_id.title}
                    date={new Date(reservation.created_at).toLocaleDateString('ar-US')}
                    time={new Date(reservation.created_at).toLocaleTimeString('ar-US')}
                    importance={reservation.importance.title}
                    price={reservation.price}
                    senderName={reservation?.lawyer?.name}
                    senderImage={reservation?.lawyer?.photo}
                  />
                </Link>
              </motion.div>
            ))
          ) : (
            <div className="flex col-span-4 flex-col items-center justify-center min-h-[50vh]">
              <Image src={emptyStateImg} alt="No Data" className="w-52 h-52 mb-4" />
              <p className="text-lg font-semibold text-gray-500">لا يوجد طلبات للعرض</p>
            </div>
          )
        )}
      </motion.div>
    </div>
  );
}

export default ServicesRequest_Cleint;
