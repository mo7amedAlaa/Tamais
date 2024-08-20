'use client';

import { getListServicesFromClient, replyToServiceFromClient } from "@/app/_api/queries/office.query";
import SecondHead from "@/app/_components/ui/SecondHead";
import date from '@/public/Icons/date.svg';
import downloadIcon from '@/public/Icons/downloadIcon.svg';
import FolderIcon from "@/public/Icons/folder.svg";
import important from '@/public/Icons/important.svg';
import pdfIcon from '@/public/Icons/pdfIcon.svg';
import priceIcon from '@/public/Icons/price.svg';
import star from '@/public/Icons/star.svg';
import { useMutation } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import Image from "next/image";
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { MdOutlineQuickreply } from "react-icons/md";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

interface PropsIN {
    servID: string;
}

const statusMapping: Record<number, string> = {
    1: 'جديد',
    2: 'انتظار',
    3: 'متأخر',
    4: 'غير منجز',
    5: 'مكتملة'
};

const MySwal = withReactContent(Swal);

const ServicesReplyAndDetailsClient: React.FC<PropsIN> = ({ servID }) => {
    const [response, setResponse] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [disabled, setDisabled] = useState<boolean>(false);
    const [responseError, setResponseError] = useState<string | null>(null);
    const [fileChosen, setFileChosen] = useState<boolean>(false);
    const [clientsServices, setClientsServices] = useState<any[]>([]);
    const [service, setService] = useState<any | null>(null);


    const { mutate: fetchServicesClients } = useMutation({
        mutationFn: getListServicesFromClient,
        onMutate: () => {
            setLoading(true)
        },
        onSuccess: (res: any) => {
            if (res.status === 200) {
                setClientsServices(res.data.data.service_requests);
                const foundService = res.data.data.service_requests.find((item: any) => item.id == servID);
                setService(foundService);
                console.log('Data fetched successfully', res.data.data.service_requests);
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

    const { mutate: replyServicesClient } = useMutation({
        mutationFn: replyToServiceFromClient,
        onMutate: () => {
            setDisabled(true);
        },
        onSuccess: (res: any) => {
            if (res.status === 200) {
                MySwal.fire({
                    icon: 'success',
                    title: 'نجاح',
                    text: res.message,
                    confirmButtonText: 'حسنًا'
                });
                setResponse('');
                setFile(null);
                setFileChosen(false);
            } else {
                MySwal.fire({
                    icon: 'error',
                    title: 'خطأ',
                    text: 'حدث خطأ أثناء ارسال الرد',
                    confirmButtonText: 'حسنًا'
                });
            }
            setLoading(false);
        },
        onError: (error: any) => {
            MySwal.fire({
                icon: 'error',
                title: 'خطأ',
                text: 'حدث خطأ أثناء ارسال الرد',
                confirmButtonText: 'حسنًا'
            });
            console.log('Error:', error);
            setLoading(false);
        },
    });

    useEffect(() => {
        fetchServicesClients();
    }, [fetchServicesClients]);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFile(event.target.files[0]);
            setFileChosen(true);
        }
    };

    const handleResponseChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = event.target.value;
        setResponse(newValue);

        if (newValue.length < 10) {
            setResponseError('يجب أن يكون الرد أكثر من 10 أحرف');
        } else {
            setResponseError(null);
        }
    };

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        if (response.length < 10) {
            setResponseError('يجب أن يكون الرد أكثر من 10 أحرف');
            return;
        }

        const formData = new FormData();
        formData.append('reply', response);
        formData.append('request_id', servID);
        if (file) {
            formData.append('reply_file', file);
        }
        replyServicesFromDigitalGuide(formData);
    };
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
            <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6" initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}>
                <form onSubmit={handleSubmit} className="col w-full p-2   bg-[#FFFFFF] rounded-[12px] lg:px-6 shadow-lg max-h-[482px]"
                >
                    {service?.replay_status === "تم الرد" ? <div><div className="col lg:px-6 h-[482px] space-y-4">
                        <p className="text-[12px] text-center font-[600] leading-[30px] text-[#A6A4A4] p-2 mb-5 ">لقد قمت بالرد على الاستشارة مسبقا</p>

                        <div className="rounded-lg shadow-lg p-2 lg:p-6 bg-white max-h-[400px]">
                            <h3 className="mb-6 text-[#A6A4A4]">الرد على الاستشارة</h3>
                            <div className="text-justify text-base leading-5 font-semibold text-[#00262F]">
                                {service?.replay}
                            </div>
                        </div>

                        <div className="bg-[#FFFFFF] rounded-[12px] p-2 lg:px-6 shadow-lg max-h-[482px]">
                            <h3 className="m-3 text-[#A6A4A4]">المرفقات</h3>
                            <div className="h-[60px] bg-[#FFFFFF] px-6 rounded-xl flex justify-between items-center">
                                <div className="flex gap-2 items-center">
                                    <Image src={pdfIcon} alt='pdfImage' />
                                    <span className="text-[14px] font-[600] leading-8 text-[#00262F]">
                                        {service?.replay_file ? service.file.split('/').pop() : 'لا يوجد مرفقات'}
                                    </span>
                                </div>
                                {service?.replay_file && (
                                    <a href={`${service?.replay_file}`} download>
                                        <Image src={downloadIcon} alt='downloadIcon' />
                                    </a>
                                )}
                            </div>
                        </div>

                    </div></div> : <div>
                        <p className="text-[12px] font-[600] leading-[30px] text-[#A6A4A4] p-2 mb-1">الرد على الاستشارة</p>

                        <textarea
                            value={response}
                            onChange={handleResponseChange}
                            className="w-full   resize-none outline-none py-2 px-3 border border-[#E6E6E6] h-[205px] rounded-[12px]"
                            placeholder="الرد..."
                        ></textarea>
                        {responseError && (
                            <p className="text-red-500 text-xs mt-1">{responseError}</p>
                        )}
                        <label
                            htmlFor="file"
                            className={`bg-[#E4D2A94D] h-[85px] border rounded-lg my-5 border-[#DDB762] border-dashed p-[27px] flex items-center justify-center gap-5 text-[#DDB762] text-[14px] font-semibold leading-8 ${fileChosen ? 'bg-[#DDB762] text-[#FFFFFF]' : ''}`}
                        >
                            <Image src={FolderIcon} alt='folder-icon' width={20} height={20} />
                            {fileChosen ? <span className="text-green-600">ملف مختار</span> : 'ارسال ملف او صورة'}
                        </label>
                        <input type="file" className="hidden" id="file" onChange={handleFileChange} />
                        <button
                            type="submit"
                            className={`w-full h-[50px] rounded-lg text-[#FFFFFF] font-[600] text-base leading-7 ${disabled ? 'bg-[#B2B2B2]' : 'bg-[#DDB762]'}`}
                            disabled={disabled}
                        >
                            {disabled ? 'جاري الإرسال...' : 'ارسال الرد'}
                        </button>

                    </div>}

                </form>
                <div className="col  lg:px-6 h-[482px] space-y-4">
                    <div className="rounded-lg shadow-lg p-2 lg:p-6 bg-white max-h-[400px] ">
                        <h3 className="mb-6 text-[#A6A4A4]">تفاصيل الاستشارة</h3>
                        <div className="flex flex-col pb-2 mb-2 flex-1 justify-center gap-2">
                            <div className='flex items-center justify-between flex-1'>
                                <div className="text-[12px] text-[#A6A4A4] flex items-center font-[600] leading-[22.49px] gap-2 text-right">
                                    <Image src={star} alt="date-icon" />
                                    نوع الاستشارة
                                </div>
                                <div className="text-[12px] font-[600] leading-[16px] text-[#00262F]">{service?.service.title}</div>
                            </div>
                            <div className='flex items-center justify-between flex-1'>
                                <div className="text-[12px] text-[#A6A4A4] flex items-center font-[600] leading-[22.49px] gap-2 text-right">
                                    <Image src={priceIcon} alt="priceIcon" />
                                    السعر
                                </div>
                                <div className="text-[12px] font-[600] leading-[16px] text-[#00262F]">{service?.price} ريال</div>
                            </div>
                            <div className='flex items-center justify-between flex-1'>
                                <div className="text-[12px] text-[#A6A4A4] flex items-center font-[600] leading-[22.49px] gap-2 text-right">
                                    <Image src={date} alt="date-icon" />
                                    تاريخ الطلب
                                </div>
                                <div className="text-[12px] font-[600] leading-[16px] text-[#00262F]">  {new Date(service?.created_at).toLocaleDateString('ar-US')}</div>
                            </div>
                            <div className='flex items-center justify-between flex-1'>
                                <div className="text-[12px] text-[#A6A4A4] flex items-center font-[600] leading-[22.49px] gap-2 text-right">
                                    <Image src={important} alt="date-icon" />
                                    مستوى الطلب
                                </div>
                                <div className="text-[12px] font-[600] leading-[16px] text-[#00262F]">{service?.priority.title}</div>
                            </div>
                        </div>
                        <div className="w-[80%] h-[1px] bg-[#E9ECF2] m-auto my-3"></div>
                        <h3 className="p-2 text-[#A6A4A4]">الوصف</h3>
                        <p className="text-justify text-xs leading-5 font-semibold text-[#1D1E25]">
                            {service?.service.intro}
                        </p>
                    </div>
                    <div className="  bg-[#FFFFFF] rounded-[12px] p-2 lg:px-6 shadow-lg max-h-[482px]">
                        <h3 className="m-3 text-[#A6A4A4]">تفاصيل الرد على الاستشارة</h3>
                        <div className="flex item-center justify-between">
                            <div className="flex items-center gap-2 font-[600] text-[14px] text-[#A6A4A4]">
                                <MdOutlineQuickreply className="text-[#DDB762] mx-2 h-4 w-4 " /> حالة الرد
                            </div>
                            <div className={`p-3 rounded-md text-[14px] font-semibold leading-5 tracking-wide   ${service?.replay_status === "تم الرد" ? 'bg-green-500' : 'bg-gray'}`}>
                                {service?.replay_status}
                            </div>
                        </div>
                        <div className="h-[60px] bg-[#FFFFFF] px-6 rounded-xl     flex justify-between items-center">
                            <div className="flex gap-2 items-center">
                                <Image src={pdfIcon} alt='pdfImage' />
                                <span className="text-[14px] font-[600] leading-8 text-[#00262F]">
                                    {service?.replay_file ? service.file.split('/').pop() : 'لا يوجد مرفقات'}
                                </span>
                            </div>
                            {service?.replay_file && (
                                <a href={`${service?.replay_file}`} download>
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

export default ServicesReplyAndDetailsClient;
