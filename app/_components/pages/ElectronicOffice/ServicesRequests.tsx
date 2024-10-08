"use client";

import {
  getListServicesFromClient,
  getListServicesFromDigitalGuide,
} from "@/app/_api/queries/office.query";
import RequestConsultationCard from "@/app/_components/pages/ElectronicOffice/RequestServiceCard";
import ActiveTitleTab from "@/app/_components/ui/ActiveTitleTab";
import SecondHead from "@/app/_components/ui/SecondHead";
import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import emptyStateImg from "@/public/publicImage/empty-box.png";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

type TabType = string;

const statusMapping: Record<number, string> = {
  1: "جديد",
  2: "انتظار",
  3: "متاخر",
  4: "غير منجز",
  5: "مكتملة",
};

function ServiceRequests() {
  const [activeTab, setActiveTab] = useState<TabType>("Customers");
  const buttonTitles = {
    Customers: "العملاء",
    DigitalGuide: "الدليل الرقمي",
  };
  const [loading, setLoading] = useState<boolean>(false);
  const [clientsReservations, setClientsReservations] = useState<any[]>([]);
  const [digitalReservations, setDigitalReservations] = useState<any[]>([]);

  const { mutate: fetchServicesFromDigitalGuide } = useMutation({
    mutationFn: getListServicesFromDigitalGuide,
    onSuccess: (res: any) => {
      if (res.status === 200) {
        setDigitalReservations(res.data.data.service_requests || []);
      } else {
        handleError();
      }
      setLoading(false);
    },
    onError: () => {
      handleError();
      setLoading(false);
    },
  });

  const { mutate: fetchServicesFromClients } = useMutation({
    mutationFn: getListServicesFromClient,
    onSuccess: (res: any) => {
      if (res.status === 200) {
        setClientsReservations(res.data.data.service_requests || []);
      } else {
        handleError();
      }
      setLoading(false);
    },
    onError: () => {
      handleError();
      setLoading(false);
    },
  });

  const handleError = () => {
    MySwal.fire({
      icon: "error",
      title: "خطأ",
      text: "حدث خطأ أثناء جلب البيانات",
    });
  };

  useEffect(() => {
    setLoading(true);
    fetchServicesFromDigitalGuide();
    fetchServicesFromClients();
  }, [fetchServicesFromDigitalGuide, fetchServicesFromClients]);

  if (loading)
    return (
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
    <div className="container mx-auto min-h-screen">
      <SecondHead title={"طلبات الخدمات"} />
      <ActiveTitleTab
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        buttonTitles={buttonTitles}
      />
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-[25px] gap-y-4 justify-center py-3 md:py-6"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, staggerChildren: 0.1 }}
      >
        {activeTab === "DigitalGuide" ? (
          digitalReservations.length > 0 ? (
            digitalReservations.map((reservation: any) => (
              <motion.div
                key={reservation.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <Link
                  href={`/ElectronicOffice/serviceRequest/Reply_Lawyer_Service/${reservation.id}`}
                >
                  <RequestConsultationCard
                    status={
                      statusMapping[reservation.request_status] || "غير محدد"
                    }
                    title={reservation.service.title}
                    date={new Date(reservation.created_at).toLocaleDateString(
                      "ar-US"
                    )}
                    time={new Date(reservation.created_at).toLocaleTimeString(
                      "ar-US"
                    )}
                    importance={reservation.priority.title}
                    price={reservation.price}
                    senderName={reservation.requesterLawyer.name}
                    senderImage={reservation.requesterLawyer.photo}
                  />
                </Link>
              </motion.div>
            ))
          ) : (
            <div className="flex col-span-4 flex-col items-center justify-center min-h-[50vh]">
              <Image
                src={emptyStateImg}
                alt="No Data"
                className="w-52 h-52 mb-4"
              />
              <p className="text-lg font-semibold text-gray-500">
                لا يوجد طلبات للعرض
              </p>
            </div>
          )
        ) : clientsReservations.length > 0 ? (
          clientsReservations.map((reservation: any) => (
            <motion.div
              key={reservation.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Link
                href={`/ElectronicOffice/serviceRequest/Reply_Client_Service/${reservation.id}`}
              >
                <RequestConsultationCard
                  status={
                    statusMapping[reservation.request_status] || "غير محدد"
                  }
                  title={reservation.service.title}
                  date={new Date(reservation.created_at).toLocaleDateString(
                    "ar-US"
                  )}
                  time={new Date(reservation.created_at).toLocaleTimeString(
                    "ar-US"
                  )}
                  importance={reservation.priority.title}
                  price={reservation.price}
                  senderName={reservation.lawyer.name}
                  senderImage={reservation.lawyer.photo}
                />
              </Link>
            </motion.div>
          ))
        ) : (
          <div className="flex col-span-4 flex-col items-center justify-center min-h-[50vh]">
            <Image
              src={emptyStateImg}
              alt="No Data"
              className="w-52 h-52 mb-4"
            />
            <p className="text-lg font-semibold text-gray-500">
              لا يوجد طلبات للعرض
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default ServiceRequests;
