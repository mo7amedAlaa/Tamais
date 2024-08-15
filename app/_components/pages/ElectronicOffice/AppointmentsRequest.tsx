'use client'
import { getListAppointmentsFromClient, getListAppointmentsFromDigitalGuide } from '@/app/_api/queries/office.query';
import RequestConsultationCard from '@/app/_components/pages/ElectronicOffice/RequestConsultationCard';
import ActiveTitleTab from '@/app/_components/ui/ActiveTitleTab';
import SecondHead from '@/app/_components/ui/SecondHead';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

type TabType = string;

const statusMapping: Record<number, string> = {
  1: 'جديد',
  2: 'انتظار',
  3: 'متاخر',
  4: 'غير منجز',
  5: 'منجز'
};

function AppointmentsRequests() {
  const [activeTab, setActiveTab] = useState<TabType>('Customers');
  const buttonTitles = {
    Customers: "العملاء",
    DigitalGuide: "الدليل الرقمي",
  };
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [clientsReservations, setClientsReservations] = useState<any>(null);
  const [digitalReservations, setDigitalReservations] = useState<any>(null);

  const { mutate: fetchReservationsFromDigitalGuide } = useMutation({
    mutationFn: getListAppointmentsFromDigitalGuide,
    onSuccess: (res: any) => {
      if (res.status === 200) {
        setDigitalReservations(res.data.data.reservations);
        console.log('Data fetched successfully', digitalReservations);
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

  const { mutate: fetchReservationsFromClients } = useMutation({
    mutationFn: getListAppointmentsFromClient,
    onSuccess: (res: any) => {
      if (res.status === 200) {
        setClientsReservations(res.data.data.reservations);
        console.log('Data fetched successfully', clientsReservations);
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
    fetchReservationsFromDigitalGuide();
    fetchReservationsFromClients();
  }, [fetchReservationsFromDigitalGuide, fetchReservationsFromClients]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className='container mx-auto min-h-screen'>
      <SecondHead title={'طلبات المواعيد'} />
      <ActiveTitleTab
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        buttonTitles={buttonTitles}
      />
      {activeTab === 'DigitalGuide' ?
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-[25px] gap-y-4 justify-center py-3 md:py-6">
          {digitalReservations?.map((reservation: any) => (
            <Link href={`/ElectronicOffice/appointmentsRequest/${reservation.id}`} key={reservation.id}>
              <RequestConsultationCard
                status={statusMapping[reservation.request_status] || 'غير محدد'}
                title={reservation.reservationType.name}
                date={new Date(reservation.created_at).toLocaleDateString('ar-US')}
                time={new Date(reservation.created_at).toLocaleTimeString('ar-US')}
                importance={reservation.reservationImportance.name}
                price={reservation.price}
                senderName={reservation.reservedFromLawyer.name}
                senderImage={reservation.reservedFromLawyer.photo}
              />
            </Link>
          ))}
        </div> :
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-[25px] gap-y-4 justify-center py-3 md:py-6">
          {clientsReservations?.map((reservation: any) => (
            <div key={reservation.id}>
              <RequestConsultationCard
                status={statusMapping[reservation.request_status] || 'غير محدد'}
                title={reservation.reservationType.name}
                date={new Date(reservation.created_at).toLocaleDateString('ar-US')}
                time={new Date(reservation.created_at).toLocaleTimeString('ar-US')}
                importance={reservation.reservationImportance.name}
                price={reservation.price}
                senderName={reservation.reservedFromLawyer.name}
                senderImage={reservation.reservedFromLawyer.photo}
              />
            </div>
          ))}
        </div>}
    </div>
  );
}

export default AppointmentsRequests;
