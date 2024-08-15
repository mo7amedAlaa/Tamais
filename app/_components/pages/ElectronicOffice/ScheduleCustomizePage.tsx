'use client';

import { deleteAppointment, getListAppointmentAvailableForPricing } from "@/app/_api/queries/office.query";
import SecondHead from "@/app/_components/ui/SecondHead";
import deleteIcon from '@/public/Icons/delete.svg';
import showIcon from '@/public/Icons/show.svg';
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Swal from 'sweetalert2';

function ConsultationCustomizePage({ params }) {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [schedulesAvailable, setSchedulesAvailable] = useState<any>(null);
    const [scheduleAvailable, setScheduleAvailable] = useState<any>(null);
    const { mutate: fetchSchedulesAvailable } = useMutation({
        mutationFn: getListAppointmentAvailableForPricing,
        onSuccess: (res: any) => {
            if (res.status === 200) {
                setSchedulesAvailable(res.data.data);
                setScheduleAvailable(schedulesAvailable?.find(item => item.id == params.scheduleID))
                console.log('Data fetched successfully', scheduleAvailable);
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
        fetchSchedulesAvailable()
    }, [fetchSchedulesAvailable]);
    const handleSubmit = (e) => {
        e.preventDefault();

        // منطق استدعاء API هنا
    };

    const handleClick = () => {

    };

    const handleDisableProduct = () => {
        Swal.fire({
            title: 'هل أنت متأكد؟',
            text: "هل تريد تعطيل المنتج؟",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'نعم، تعطيل!',
            cancelButtonText: 'إلغاء',
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'تم!',
                    'تم تعطيل المنتج.',
                    'success'
                );
                // منطق لتعطيل المنتج هنا
            }
        });
    };
    const mutation = useMutation({
        mutationFn: deleteAppointment,
        onMutate: () => {
            setLoading(true);
            setError(null);
        },
        onSuccess: (res: any) => {
            if (res.status === 200) {
                toast.success('تم حذف المنتج بنجاح');
                setError(null);
            } else {
                setError('حدث خطأ أثناء حذف المنتج ');
            }
            setLoading(false);
        },
        onError: (error: any) => {
            toast.error('حدث خطأ أثناء حذف المنتج');
            console.log('Error:', error);
            setLoading(false);
        },
    });
    const handleDeleteProduct = () => {
        const id = params?.scheduleID
        Swal.fire({
            title: "حذف المنتج!",
            text: " اذا تم حذف المنتج لن تكون قادر على استرجاعها مره اخري",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#E52F4F',
            cancelButtonColor: '#e3e3e3',
            confirmButtonText: 'نعم، حذف!',
            cancelButtonText: 'إلغاء',
        }).then((result) => {
            if (result.isConfirmed) {
                mutation.mutate(id);
                {
                    !Error && Swal.fire(
                        'تم!',
                        'تم حذف المنتج.',
                        'success'
                    );
                }
            }
        });
    };



    return (
        <div className="container mx-auto min-h-screen">
            <SecondHead title="تخصيص المنتج" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="col p-6 bg-[#FFFFFF] shadow-4 rounded-lg  ">
                    <h3 className="text-[#00262F] text-base leading-8 font-[700]">{advisoryAvailable?.types[0].title} </h3>
                    <h6 className="text-[#A6A4A4] font-[400] text-[12px] leading-[22px]">وصف المنتج</h6>
                    <p className="text-[#A6A4A4] font-[600] text-justify text-sm leading-[22px]"> {scheduleAvailable?.intro} </p>
                    <div className="w-[75%] h-[1px] mx-auto my-5 bg-[#E9ECF2]"></div>
                    <h3 className="text-[#00262F] text-sm leading-6 font-[600]">تسعير المنتج</h3>
                    <div className="flex justify-start items-center gap-5 my-3">
                        <button className="border border-[#DDB762] rounded-lg text-sm leading-8 font-bold text-[#DDB762] px-5 py-1">{scheduleAvailable?.min_price}ر.س</button>
                        <button className="border border-[#DDB762] rounded-lg text-sm leading-8 font-bold text-[#DDB762] px-5 py-1">{scheduleAvailable?.max_price}ر.س</button>
                    </div>
                    <div className="w-[75%] h-[1px] mx-auto my-5 bg-[#E9ECF2]"></div>
                    <div className="flex flex-col items-start justify-between gap-6 text-sm font-semibold leading-8 text-[#00262F]">
                        <div className="flex items-center gap-3">
                            <Image src={showIcon} alt='showicon' width={40} height={40} />
                            <button onClick={handleDisableProduct} className="text-blue-600">{loading ? "جاري تعطيل المنتج" : "تعطيل المنتج"}</button>
                        </div>
                        <div className="flex items-center gap-3">
                            <Image src={deleteIcon} alt='deleteicon' width={40} height={40} />
                            <button onClick={handleDeleteProduct} className="text-red-600">{loading ? "جاري حذف المنتج" : "حذف المنتج"}</button>
                        </div>
                    </div>
                </div>
                <div className="col px-5 ">
                    <form action="" onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-6 p-6 bg-[#FFFFFF] shadow-4 rounded-lg  ">

                            {scheduleAvailable ? scheduleAvailable?.lawyerPrices.map((price) => (
                                <div key={price.id} className="flex justify-between items-center">
                                    <div className="flex justify-between items-center gap-3">
                                        <button
                                            type="button"
                                            onClick={() => handleClick(price?.id)}
                                            className={`font-bold w-[50px] h-fit outline-none rounded-xl flex custom-inset-1 custom-inset-2 items-center ${!price?.isHidden == 0 ? 'bg-[#DDB762] justify-end' : 'bg-[#F8F8F8]'} hover:bg-opacity-80 focus:outline-none justify-start`}
                                        >
                                            <div className='w-6 h-6 rounded-xl bg-[#ECECEF]'></div>
                                        </button>
                                        <span>{price?.importance?.name}</span>
                                    </div>
                                    <input
                                        type="text"
                                        className="border border-[#E6E6E6] rounded-lg   p-3"
                                        placeholder={`    ر.س ${price?.price}`}
                                    />
                                </div>
                            )) : <div >لايوجد اسعار متاحة للعرض </div>}
                        </div>
                        <button
                            type="submit"
                            className="block w-full bg-[#DDB762] rounded-md text-base leading-7 font-bold text-[#FFFFFF] p-4 my-8"
                        >
                            حفظ التعديلات
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ConsultationCustomizePage;
