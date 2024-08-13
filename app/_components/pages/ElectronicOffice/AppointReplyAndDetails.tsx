'use client';

import { replyToAppointFromClient, replyTpConsultationFromClient } from "@/app/_api/queries/office.query";
import SecondHead from "@/app/_components/ui/SecondHead";
import Steps from "@/app/_components/ui/Steps";
import date from '@/public/Icons/date.svg';
import downloadIcon from '@/public/Icons/downloadIcon.svg';
import FolderIcon from "@/public/Icons/folder.svg";
import important from '@/public/Icons/important.svg';
import pdfIcon from '@/public/Icons/pdfIcon.svg';
import priceIcon from '@/public/Icons/price.svg';
import star from '@/public/Icons/star.svg';
import { useMutation } from '@tanstack/react-query';
import Image from "next/image";
import React, { ChangeEvent, FormEvent, useState } from 'react';
import toast from "react-hot-toast";

interface PropsIN {
    appointID: string;
}

const AppointReplyAndDetails: React.FC<PropsIN> = ({ appointID }) => {
    const [response, setResponse] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [responseError, setResponseError] = useState<string | null>(null);
    const [fileChosen, setFileChosen] = useState<boolean>(false);

    const steps = [
        { label: 'قيد الدراسة', status: 'completed' },
        { label: 'قيد الانتظار', status: 'in-progress' },
        { label: 'مكتملة', status: 'pending' },
    ];

    const currentStep = steps.findIndex(step => step.status === 'in-progress');

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

    const mutation = useMutation({
        mutationFn: replyToAppointFromClient,
        onMutate: () => {
            setLoading(true);
            setError(null);
        },
        onSuccess: (res: any) => {
            if (res.status === 200) {
                toast.success('تم ارسال الرد بنجاح');
                setResponse('');
                setFile(null);
                setFileChosen(false);
                setError(null);
            } else {
                setError('حدث خطأ أثناء ارسال الرد');
            }
            setLoading(false);
        },
        onError: (error: any) => {
            setError('حدث خطأ أثناء ارسال الرد');
            toast.error('حدث خطأ أثناء ارسال الرد');
            console.log('Error:', error);
            setLoading(false);
        },
    });

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();

        if (response.length < 10) {
            setResponseError('يجب أن يكون الرد أكثر من 10 أحرف');
            return;
        }

        const formData = new FormData();
        formData.append('reply_content', response);
        formData.append('id', appointID);
        if (file) {
            formData.append('reply_file', file);
        }

        mutation.mutate(formData);
    };

    return (
        <div className="container mx-auto px-5">
            <SecondHead title="تفاصيل الاستشارة" />
            <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-6">
                <form onSubmit={handleSubmit} className="col bg-[#FFFFFF] rounded-[12px] px-6 shadow-lg max-h-[482px]">
                    <p className="text-[12px] font-[600] leading-[30px] text-[#A6A4A4] p-2">الرد على الاستشارة</p>
                    <div>
                        <textarea
                            value={response}
                            onChange={handleResponseChange}
                            className="w-full resize-none outline-none py-2 px-3 border border-[#E6E6E6] h-[205px] rounded-[12px]"
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
                            className={`w-full h-[50px] rounded-lg text-[#FFFFFF] font-[600] text-base leading-7 ${loading ? 'bg-[#B2B2B2]' : 'bg-[#DDB762]'}`}
                            disabled={loading}
                        >
                            {loading ? 'جاري الإرسال...' : 'ارسال الرد'}
                        </button>
                        {error && (
                            <p className="text-red-500 text-xs mt-1">{error}</p>
                        )}
                    </div>
                </form>
                <div className="col px-6 h-[482px]">
                    <div className="rounded-lg shadow-lg p-6 bg-white max-h-[400px]">
                        <h3 className="mb-6 text-[#A6A4A4]">تفاصيل الاستشارة</h3>
                        <div className="flex flex-col pb-2 mb-2 flex-1 justify-center gap-2">
                            <div className='flex items-center justify-between flex-1'>
                                <div className="text-[12px] text-[#A6A4A4] flex items-center font-[600] leading-[22.49px] gap-2 text-right">
                                    <Image src={star} alt="date-icon" />
                                    نوع الاستشارة
                                </div>
                                <div className="text-[12px] font-[600] leading-[16px] text-[#00262F]">استشارة مرئية</div>
                            </div>
                            <div className='flex items-center justify-between flex-1'>
                                <div className="text-[12px] text-[#A6A4A4] flex items-center font-[600] leading-[22.49px] gap-2 text-right">
                                    <Image src={priceIcon} alt="priceIcon" />
                                    السعر
                                </div>
                                <div className="text-[12px] font-[600] leading-[16px] text-[#00262F]">300 ريال</div>
                            </div>
                            <div className='flex items-center justify-between flex-1'>
                                <div className="text-[12px] text-[#A6A4A4] flex items-center font-[600] leading-[22.49px] gap-2 text-right">
                                    <Image src={date} alt="date-icon" />
                                    تاريخ الطلب
                                </div>
                                <div className="text-[12px] font-[600] leading-[16px] text-[#00262F]">استشارة مرئية</div>
                            </div>
                            <div className='flex items-center justify-between flex-1'>
                                <div className="text-[12px] text-[#A6A4A4] flex items-center font-[600] leading-[22.49px] gap-2 text-right">
                                    <Image src={important} alt="date-icon" />
                                    مستوى الطلب
                                </div>
                                <div className="text-[12px] font-[600] leading-[16px] text-[#00262F]">متوسط الأهمية</div>
                            </div>
                        </div>
                        <div className="w-[80%] h-[1px] bg-[#E9ECF2] m-auto my-3"></div>
                        <h3 className="p-2 text-[#A6A4A4]">الوصف</h3>
                        <p className="text-justify text-xs leading-5 font-semibold text-[#1D1E25]">
                            لطلب استشارة قانونية فيما يتعلق بتصميم وتقييم العقود وتأسيس الشركات بمستوي طلب متوسط الاهميه
                        </p>
                    </div>
                    <div>
                        <h3 className="m-3 text-[#A6A4A4]">تفاصيل الرد على الاستشارة</h3>
                        <Steps status={currentStep} />
                        <div className="h-[60px] bg-[#FFFFFF] px-6 rounded-xl shadow-xl flex justify-between items-center">
                            <div className="flex gap-2 items-center">
                                <Image src={pdfIcon} alt='pdfImage' />
                                <span className="text-[14px] font-[600] leading-8 text-[#00262F]">تصميم العقود.PDF</span>
                            </div>
                            <button>
                                <Image src={downloadIcon} alt='downloadIcon' />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppointReplyAndDetails;
