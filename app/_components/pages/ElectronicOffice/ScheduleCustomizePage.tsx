'use client';
import { changeScheduleDis, changeScheduleEn, createPriceSchedule, deleteSchedule, getListAppointmentAvailableForPricing } from "@/app/_api/queries/office.query";
import SecondHead from "@/app/_components/ui/SecondHead";
import deleteIcon from '@/public/Icons/delete.svg';
import showIcon from '@/public/Icons/show.svg';
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Swal from 'sweetalert2';

function ScheduleCustomizePage({ params }) {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [schedulesAvailable, setSchedulesAvailable] = useState<any>(null);
    const [scheduleAvailable, setScheduleAvailable] = useState<any>(null);
    const [inputValues, setInputValues] = useState<{ [key: string]: string }>({})
    const [visibility, setVisibility] = useState<{ [key: string]: boolean }>({});

    const { mutate: fetchSchedulesAvailable } = useMutation({
        mutationFn: getListAppointmentAvailableForPricing,
        onMutate: () => {
            setLoading(true)
        },
        onSuccess: (res: any) => {
            if (res.status === 200) {
                const data = res.data.data.reservationTypes;
                setSchedulesAvailable(data);
                const schedule = data.find(item => item.id == params.scheduleID);
                setScheduleAvailable(schedule);
                const initialVisibility = schedule?.ymtazPrices.reduce((acc, price) => {
                    acc[price.id] = price.isHidden === 0;
                    return acc;
                }, {} as { [key: string]: boolean });
                setVisibility(initialVisibility);
                console.log('Data fetched successfully', data);
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
        fetchSchedulesAvailable();
    }, []);
    const { mutate: createListPrice } = useMutation({
        mutationFn: createPriceSchedule,
        onSuccess: (res: any) => {
            if (res.status === 200) {
                fetchSchedulesAvailable()
                toast.success('تم التسعير بنجاح')
            }
            setLoading(false);
        },
        onError: (error: any) => {
            setError('حدث خطأ أثناء  التسعير  ');
            toast.error('حدث خطأ أثناء  التسعير:');
            console.log('Error:', error);
            setLoading(false);
        },
    });
    const { mutate: enableProduct } = useMutation({
        mutationFn: changeScheduleEn,
        onSuccess: (res: any) => {
            if (res.status === 200) {
                fetchSchedulesAvailable()
                toast.success('تم تفعيل المنتج  ')
            } else {
                setError('حدث خطأ تفعيل أثناء المنتج  ');
                console.log('Error fetching data');

            }
            setLoading(false);
        },
        onError: (error: any) => {
            setError('حدث خطأ أثناء تفعيل المنتج  ');
            toast.error('حدث خطأ أثناء تفعيل المنتج  ');
            console.log('Error:', error);
            setLoading(false);
        },
    });
    const { mutate: disableProduct } = useMutation({
        mutationFn: changeScheduleDis,
        onSuccess: (res: any) => {
            if (res.status === 200) {
                fetchSchedulesAvailable()
                toast.success('تم تعطيل المنتج  ')
            }
            setLoading(false);
        },
        onError: (error: any) => {
            setError('حدث خطأ أثناء تعطيل المنتج');
            toast.error('حدث خطأ أثناء تعطيل المنتج');
            console.log('Error:', error);
            setLoading(false);
        },
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('reservation_type_id', params.scheduleID);
        scheduleAvailable?.ymtazPrices?.forEach(price => {
            formData.append(`reservationsTypesImportances[${price.id}][importance_id]`, price.level.id);
            formData.append(`reservationsTypesImportances[${price.id}][price]`, inputValues[price.id] || price.price);
            formData.append(`reservationsTypesImportances[${price.id}][isHidden]`, (visibility[`${price.id}`] ? 1 : 0).toString());
        });

        createListPrice(formData)
    };

    const handleInputChange = (id, value) => {
        setInputValues((prevValues) => ({
            ...prevValues, [id]: value
        }))
    }
    const handleClick = (e, id) => {
        e.preventDefault();
        setVisibility(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
        console.log(visibility)
    };

    const handleEnableProduct = () => {
        const id = params.scheduleID
        Swal.fire({
            title: 'هل أنت متأكد؟',
            text: "هل تريد تفعيل المنتج؟",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'نعم، تفعيل!',
            cancelButtonText: 'إلغاء',
        }).then((result) => {
            if (result.isConfirmed) {
                enableProduct(id);
                fetchSchedulesAvailable();
            }
        });
    };
    const handleDisableProduct = () => {
        const id = params.scheduleID
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
                disableProduct(id);
                fetchSchedulesAvailable()
            }
        });
    };

    const { mutate: deleteProduct } = useMutation({
        mutationFn: deleteSchedule,
        onMutate: () => {
            setLoading(true);
            setError(null);
        },
        onSuccess: (res: any) => {
            if (res.status === 200) {
                fetchSchedulesAvailable()
                toast.success('تم حذف المنتج بنجاح');
                setError(null);
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
        const id = params?.scheduleID;
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
                deleteProduct(id);
                fetchSchedulesAvailable();
                {
                    !error && Swal.fire(
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
                <div className="hidden md:block col p-6 bg-[#FFFFFF] shadow-4 rounded-lg  ">
                    <h3 className="text-[#00262F] text-base leading-8 font-[700]">{scheduleAvailable?.name} </h3>
                    <h6 className="text-[#A6A4A4] font-[400] text-[12px] leading-[22px]">وصف المنتج</h6>
                    <p className="text-[#A6A4A4] font-[600] text-justify text-sm leading-[22px]"> {scheduleAvailable?.name} </p>
                    <div className="w-[75%] h-[1px] mx-auto my-5 bg-[#E9ECF2]"></div>
                    <h3 className="text-[#00262F] text-sm leading-6 font-[600]">تسعير المنتج</h3>
                    <div className="flex justify-start items-center gap-5 my-3">
                        <button className="border border-[#DDB762] rounded-lg text-sm leading-8 font-bold text-[#DDB762] px-5 py-1">{scheduleAvailable?.minPrice}ر.س</button>
                        <button className="border border-[#DDB762] rounded-lg text-sm leading-8 font-bold text-[#DDB762] px-5 py-1">{scheduleAvailable?.maxPrice}ر.س</button>
                    </div>
                    <div>
                        {
                            !scheduleAvailable?.is_activated == false && <div>
                                <div className="w-[75%] h-[1px] mx-auto my-5 bg-[#E9ECF2]"></div>
                                <div className="flex flex-col items-start justify-between gap-6 text-sm font-semibold leading-8 text-[#00262F]">
                                    <div className="flex items-center gap-3">
                                        <Image src={showIcon} alt='show_icon' width={40} height={40} />
                                        {!scheduleAvailable?.isHidden ? <button onClick={handleEnableProduct} className="text-blue-600">تفعيل</button> : <button onClick={handleDisableProduct} className="text-blue-600">تعطيل</button>
                                        }
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Image src={deleteIcon} alt='deleteicon' width={40} height={40} />
                                    <button onClick={handleDeleteProduct} className="text-red-600">  حذف المنتج</button>
                                </div>
                            </div>
                        }

                    </div>

                </div>
                <div className=" hidden md:block col px-5 ">
                    <form action="" onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-6 p-6 bg-[#FFFFFF] shadow-4 rounded-lg  ">
                            {scheduleAvailable?.ymtazPrices ? scheduleAvailable?.ymtazPrices.map((price) => (
                                <div key={price.id} className="flex justify-between items-center">
                                    <div className="flex justify-between items-center gap-3">
                                        <button
                                            type="button"
                                            onClick={(e) => handleClick(e, price.id)}
                                            className={`font-bold w-[50px] h-fit outline-none rounded-xl flex custom-inset-1 custom-inset-2 items-center ${visibility[price.id] ? 'bg-[#DDB762] justify-end' : 'bg-[#F8F8F8]'} hover:bg-opacity-80 focus:outline-none justify-start`}
                                        >
                                            <div className='w-6 h-6 rounded-xl bg-[#ECECEF]'></div>
                                        </button>
                                        <span>{price.level.name}</span>
                                    </div>
                                    <input
                                        type="text"
                                        value={inputValues[price.id] || ''}
                                        onChange={(e) => { handleInputChange(price.id, e.target.value) }}
                                        className="border border-[#E6E6E6] rounded-lg   p-3"
                                        placeholder={`    ر.س ${price.price}`}
                                    />
                                </div>
                            )) : <div>لايوجد اسعار متاحة للعرض </div>}
                        </div>
                        <button
                            type="submit"
                            className="block w-full bg-[#DDB762] rounded-md text-base leading-7 font-bold text-[#FFFFFF] p-4 my-8"
                        >
                            حفظ التعديلات
                        </button>
                    </form>
                </div>
                <div className="block md:hidden  ">
                    <div className="col  p-6 bg-[#FFFFFF] shadow-4 rounded-lg  " >
                        <h3 className="text-[#00262F] text-base leading-8 font-[700]">{scheduleAvailable?.name} </h3>
                        <h6 className="text-[#A6A4A4] font-[400] text-[12px] leading-[22px]">وصف المنتج</h6>
                        <p className="text-[#A6A4A4] font-[600] text-justify text-sm leading-[22px]"> {scheduleAvailable?.name} </p>
                        <div className="w-[75%] h-[1px] mx-auto my-5 bg-[#E9ECF2]"></div>
                        <h3 className="text-[#00262F] text-sm leading-6 font-[600]">تسعير المنتج</h3>
                        <div className="flex justify-start items-center gap-5 my-3">
                            <button className="border border-[#DDB762] rounded-lg text-sm leading-8 font-bold text-[#DDB762] px-5 py-1">{scheduleAvailable?.minPrice}ر.س</button>
                            <button className="border border-[#DDB762] rounded-lg text-sm leading-8 font-bold text-[#DDB762] px-5 py-1">{scheduleAvailable?.maxPrice}ر.س</button>
                        </div>
                    </div>
                    <div className="col md:px-6  ">
                        <form action="" onSubmit={handleSubmit}>
                            <div className="flex mt-4 flex-col gap-6 p-6 bg-[#FFFFFF] shadow-4 rounded-lg  ">
                                {scheduleAvailable?.ymtazPrices ? scheduleAvailable?.ymtazPrices.map((price) => (
                                    <div key={price.id} className="flex-col  justify-between items-center">
                                        <div className="flex justify-between items-center gap-3">
                                            <button
                                                type="button"
                                                onClick={(e) => handleClick(e, price.id)}
                                                className={`font-bold w-[50px] h-fit outline-none rounded-xl flex custom-inset-1 custom-inset-2 items-center ${visibility[price.id] ? 'bg-[#DDB762] justify-end' : 'bg-[#F8F8F8]'} hover:bg-opacity-80 focus:outline-none justify-start`}
                                            >
                                                <div className='w-6 h-6 rounded-xl bg-[#ECECEF]'></div>
                                            </button>
                                            <span>{price.level?.name}</span>
                                        </div>
                                        <input
                                            type="text"
                                            className="border border-[#E6E6E6] rounded-lg  my-3  p-3"
                                            placeholder={`    ر.س ${price.price}`}
                                        />
                                    </div>
                                )) : <div>لايوجد اسعار متاحة للعرض </div>}
                            </div>
                            <div className="flex flex-col items-start justify-between mt-5 gap-6 text-sm font-semibold leading-8 text-[#00262F] order-3">
                                {scheduleAvailable?.isHidden ? <div className="flex items-center gap-3">
                                    <Image src={showIcon} alt='showicon' width={40} height={40} />
                                    <button onClick={handleEnableProduct} className="text-blue-600">تفعيل</button>
                                </div> : <div className="flex items-center gap-3">
                                    <Image src={showIcon} alt='showicon' width={40} height={40} />
                                    <button onClick={handleDisableProduct} className="text-blue-600">تعطيل</button>
                                </div>}
                                <div className="flex items-center gap-3">
                                    <Image src={deleteIcon} alt='deleteicon' width={40} height={40} />
                                    <button onClick={handleDeleteProduct} className="text-red-600">{loading ? "جاري حذف المنتج" : "حذف المنتج"}</button>
                                </div>
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
        </div>
    );
}

export default ScheduleCustomizePage;
