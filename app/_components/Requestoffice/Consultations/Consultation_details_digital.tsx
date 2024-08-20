'use client';

import { getListReservedFromDigitalGuide_Client } from "@/app/_api/queries/office.query";
import SecondHead from "@/app/_components/ui/SecondHead";
import date from '@/public/Icons/date.svg';
import downloadIcon from '@/public/Icons/downloadIcon.svg';
import important from '@/public/Icons/important.svg';
import pdfIcon from '@/public/Icons/pdfIcon.svg';
import priceIcon from '@/public/Icons/price.svg';
import star from '@/public/Icons/star.svg';
import { useMutation } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import Image from "next/image";
import React, { useEffect, useState } from 'react';
import { MdOutlineQuickreply } from "react-icons/md";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

interface PropsIN {
    consultID: string;
}

const statusMapping: Record<number, string> = {
    1: 'جديد',
    2: 'انتظار',
    3: 'متأخر',
    4: 'غير منجز',
    5: 'مكتملة'
};

const MySwal = withReactContent(Swal);

const Consultation_details_digital: React.FC<PropsIN> = ({ consultID }) => {
    const [response, setResponse] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [responseError, setResponseError] = useState<string | null>(null);
    const [fileChosen, setFileChosen] = useState<boolean>(false);
    const [clientsReservations, setClientsReservations] = useState<any[]>([]);
    const [reservation, setReservation] = useState<any | null>(null);

    console.log(consultID)

    const { mutate: fetchReservationsFromDigitalGuide } = useMutation({
        mutationFn: getListReservedFromDigitalGuide_Client,
        onMutate: () => {
            setLoading(true)
        },
        onSuccess: (res: any) => {
            if (res.status === 200) {
                setClientsReservations(res.data.data.reservations);
                const foundReservation = res.data.data.reservations.find((item: any) => item.id == consultID);
                setReservation(foundReservation);
                console.log('Data fetched successfully', res.data.data.reservations);
            } else {
                MySwal.fire({
                    icon: 'error',
                    title: 'خطأ',
                    text: 'حدث خطأ أثناء جلب البيانات',
                    confirmButtonText: 'حسنًا'
                });
                console.log('Error fetching data');
            }
            setLoading(false);
        },
        onError: (error: any) => {
            MySwal.fire({
                icon: 'error',
                title: 'خطأ',
                text: 'حدث خطأ أثناء جلب البيانات',
                confirmButtonText: 'حسنًا'
            });
            console.log('Error:', error);
            setLoading(false);
        },
    });
    useEffect(() => {
        fetchReservationsFromDigitalGuide();
    }, [fetchReservationsFromDigitalGuide]);

    if (loading) return (
        <motion.div
            className="flex justify-center items-center min-h-screen"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
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

    return (
        <div className="container mx-auto px-4  sm:px-6 lg:px-8">
            <SecondHead title="تفاصيل الاستشارة" />
            <motion.div className="grid grid-cols-1 max-w-[80%]  gap-4 lg:gap-6 mx-auto" initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}>
                <div className="col  lg:px-6 h-[482px] space-y-4">
                    <div className="rounded-lg shadow-lg p-2 lg:p-6 bg-white max-h-[400px] ">
                        <h3 className="mb-6 text-[#A6A4A4]">تفاصيل الاستشارة</h3>
                        <div className="flex flex-col pb-2 mb-2 flex-1 justify-center gap-2">
                            <div className='flex items-center justify-between flex-1'>
                                <div className="text-[12px] text-[#A6A4A4] flex items-center font-[600] leading-[22.49px] gap-2 text-right">
                                    <Image src={star} alt="date-icon" />
                                    نوع الاستشارة
                                </div>
                                <div className="text-[12px] font-[600] leading-[16px] text-[#00262F]">{reservation?.advisory_services_id?.title}</div>
                            </div>
                            <div className='flex items-center justify-between flex-1'>
                                <div className="text-[12px] text-[#A6A4A4] flex items-center font-[600] leading-[22.49px] gap-2 text-right">
                                    <Image src={priceIcon} alt="priceIcon" />
                                    السعر
                                </div>
                                <div className="text-[12px] font-[600] leading-[16px] text-[#00262F]">{reservation?.price} ريال</div>
                            </div>
                            <div className='flex items-center justify-between flex-1'>
                                <div className="text-[12px] text-[#A6A4A4] flex items-center font-[600] leading-[22.49px] gap-2 text-right">
                                    <Image src={date} alt="date-icon" />
                                    تاريخ الطلب
                                </div>
                                <div className="text-[12px] font-[600] leading-[16px] text-[#00262F]">  {new Date(reservation?.created_at).toLocaleDateString('ar-US')}</div>
                            </div>
                            <div className='flex items-center justify-between flex-1'>
                                <div className="text-[12px] text-[#A6A4A4] flex items-center font-[600] leading-[22.49px] gap-2 text-right">
                                    <Image src={important} alt="date-icon" />
                                    مستوى الطلب
                                </div>
                                <div className="text-[12px] font-[600] leading-[16px] text-[#00262F]">{reservation?.importance.title}</div>
                            </div>
                        </div>
                        <div className="w-[80%] h-[1px] bg-[#E9ECF2] m-auto my-3"></div>
                        <h3 className="p-2 text-[#A6A4A4]">الوصف</h3>
                        <p className="text-justify text-xs leading-5 font-semibold text-[#1D1E25]">
                            {reservation?.description}
                        </p>
                    </div>
                    <div className="  bg-[#FFFFFF] rounded-[12px] p-2 lg:px-6 shadow-lg max-h-[482px]">
                        <h3 className="m-3 text-[#A6A4A4]">تفاصيل الرد على الاستشارة</h3>
                        <div className="flex item-center justify-between">
                            <div className="flex items-center gap-2 font-[600] text-[14px] text-[#A6A4A4]">
                                <MdOutlineQuickreply className="text-[#DDB762] mx-2 h-4 w-4 " /> حالة الرد
                            </div>
                            <div className={`p-3 rounded-md text-[14px] font-semibold leading-5 tracking-wide   ${reservation?.request_status == 5 ? 'bg-green-500' : 'bg-gray'}`}>
                                {statusMapping[reservation?.request_status]}
                            </div>
                        </div>
                        <div className="h-[60px] bg-[#FFFFFF] px-6 rounded-xl     flex justify-between items-center">
                            <div className="flex gap-2 items-center">
                                <Image src={pdfIcon} alt='pdfImage' />
                                <span className="text-[14px] font-[600] leading-8 text-[#00262F]">
                                    {reservation?.file ? reservation.file.split('/').pop() : 'لا يوجد مرفقات'}
                                </span>
                            </div>
                            {reservation?.file && (
                                <a href={`${reservation.file}`} download>
                                    <Image src={downloadIcon} alt='downloadIcon' />
                                </a>
                            )}
                        </div>

                    </div>
                </div>
            </motion.div>
        </div >
    );
};

export default Consultation_details_digital;
