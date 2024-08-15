'use client';

import { changeConsultationDis, changeConsultationEn, createPriceConsultation, deleteConsultation, getListAdvisoryAvailableForPricing } from "@/app/_api/queries/office.query";
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
    const [advisoriesAvailable, setAdvisoriesAvailable] = useState<any>(null);
    const [advisoryAvailable, setAdvisoryAvailable] = useState<any>(null);
    const [inputValues, setInputValues] = useState<{ [key: string]: string }>({})
    const [visibility, setVisibility] = useState<{ [key: string]: boolean }>({});
    const [hidden, setHidden] = useState<boolean>(true);
    const { mutate: fetchAdvisoryAvailable } = useMutation({
        mutationFn: getListAdvisoryAvailableForPricing,
        onSuccess: (res: any) => {
            if (res.status === 200) {
                const data = res.data.data;
                setAdvisoriesAvailable(data);
                const advisory = data.find(item => item.types[0].id == params.consultationID);
                setAdvisoryAvailable(advisory);
                setHidden(advisory?.types[0]?.isHidden)
                const initialVisibility = advisory?.types[0]?.advisory_services_prices.reduce((acc, price) => {
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
    const { mutate: createListPrice } = useMutation({
        mutationFn: createPriceConsultation,
        onSuccess: (res: any) => {
            if (res.status === 200) {
                toast.success('تم التسعير بنجاح')
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
    const { mutate: enableProduct } = useMutation({
        mutationFn: changeConsultationEn,
        onSuccess: (res: any) => {
            if (res.status === 200) {
                // setHidden(true)
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
        mutationFn: changeConsultationDis,
        onSuccess: (res: any) => {
            if (res.status === 200) {
                toast.success('تم تعطيل المنتج بنجاح')
            } else {
                setError('حدث خطأ أثناء تعطيل المنتج');
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

    useEffect(() => {
        setLoading(true);
        fetchAdvisoryAvailable();
    }, [fetchAdvisoryAvailable]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('type_id', params.consultationID);
        advisoryAvailable?.types[0]?.advisory_services_prices.forEach(price => {
            formData.append(`importance[${price.id}][id]`, price.importance.id);
            formData.append(`importance[${price.id}][price]`, inputValues[price.id] || price.price);
            formData.append(`importance[${price.id}][isHidden]`, visibility[price.id] ? 1 : 0);
        });
        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }
        createListPrice(formData)

    };
    const handleInputChange = (id, value) => {
        setInputValues((prevValues) => ({
            ...prevValues, [id]: value
        }))
    }
    const handleClick = (id) => {
        setVisibility(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
        console.log(visibility)
    };

    const handleEnableProduct = () => {
        const id = params.consultationID
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
                enableProduct(id)
                fetchAdvisoryAvailable()
            }
        });
    };
    const handleDisableProduct = () => {
        const id = params.consultationID
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
                disableProduct(id)
                fetchAdvisoryAvailable()
            }
        });
    };

    const mutation = useMutation({
        mutationFn: deleteConsultation,
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
        const id = params?.consultationID;
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
                    <h3 className="text-[#00262F] text-base leading-8 font-[700]">{advisoryAvailable?.types[0].title} </h3>
                    <h6 className="text-[#A6A4A4] font-[400] text-[12px] leading-[22px]">وصف المنتج</h6>
                    <p className="text-[#A6A4A4] font-[600] text-justify text-sm leading-[22px]"> {advisoryAvailable?.description} </p>
                    <div className="w-[75%] h-[1px] mx-auto my-5 bg-[#E9ECF2]"></div>
                    <h3 className="text-[#00262F] text-sm leading-6 font-[600]">تسعير المنتج</h3>
                    <div className="flex justify-start items-center gap-5 my-3">
                        <button className="border border-[#DDB762] rounded-lg text-sm leading-8 font-bold text-[#DDB762] px-5 py-1">{advisoryAvailable?.types[0]?.min_price}ر.س</button>
                        <button className="border border-[#DDB762] rounded-lg text-sm leading-8 font-bold text-[#DDB762] px-5 py-1">{advisoryAvailable?.types[0]?.max_price}ر.س</button>
                    </div>
                    <div className="w-[75%] h-[1px] mx-auto my-5 bg-[#E9ECF2]"></div>
                    <div className="flex flex-col items-start justify-between gap-6 text-sm font-semibold leading-8 text-[#00262F]">
                        {advisoryAvailable?.types[0].is_activated && <div className="flex items-center gap-3">
                            <Image src={showIcon} alt='showicon' width={40} height={40} />
                            {hidden == false ? <button onClick={handleEnableProduct} className="text-blue-600">تفعيل</button> : <button onClick={handleDisableProduct} className="text-blue-600">تعطيل</button>
                            }
                        </div>}


                        {
                            advisoryAvailable?.types[0].is_activated && <div className="flex items-center gap-3">
                                <Image src={deleteIcon} alt='deleteicon' width={40} height={40} />
                                <button onClick={handleDeleteProduct} className="text-red-600">  حذف المنتج</button>
                            </div>
                        }

                    </div>
                </div>
                <div className=" hidden md:block col px-5 ">
                    <form action="" onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-6 p-6 bg-[#FFFFFF] shadow-4 rounded-lg  ">
                            {advisoryAvailable?.types[0]?.advisory_services_prices ? advisoryAvailable?.types[0]?.advisory_services_prices.map((price) => (
                                <div key={price.id} className="flex justify-between items-center">
                                    <div className="flex justify-between items-center gap-3">
                                        <button
                                            type="button"
                                            onClick={() => handleClick(price.id)}
                                            className={`font-bold w-[50px] h-fit outline-none rounded-xl flex custom-inset-1 custom-inset-2 items-center ${visibility[price.id] ? 'bg-[#DDB762] justify-end' : 'bg-[#F8F8F8]'} hover:bg-opacity-80 focus:outline-none justify-start`}
                                        >
                                            <div className='w-6 h-6 rounded-xl bg-[#ECECEF]'></div>
                                        </button>
                                        <span>{price.importance.name}</span>
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
                        <h3 className="text-[#00262F] text-base leading-8 font-[700]">{advisoryAvailable?.types[0].title} </h3>
                        <h6 className="text-[#A6A4A4] font-[400] text-[12px] leading-[22px]">وصف المنتج</h6>
                        <p className="text-[#A6A4A4] font-[600] text-justify text-sm leading-[22px]"> {advisoryAvailable?.description} </p>
                        <div className="w-[75%] h-[1px] mx-auto my-5 bg-[#E9ECF2]"></div>
                        <h3 className="text-[#00262F] text-sm leading-6 font-[600]">تسعير المنتج</h3>
                        <div className="flex justify-start items-center gap-5 my-3">
                            <button className="border border-[#DDB762] rounded-lg text-sm leading-8 font-bold text-[#DDB762] px-5 py-1">{advisoryAvailable?.types[0]?.min_price}ر.س</button>
                            <button className="border border-[#DDB762] rounded-lg text-sm leading-8 font-bold text-[#DDB762] px-5 py-1">{advisoryAvailable?.types[0]?.max_price}ر.س</button>
                        </div>
                    </div>
                    <div className="col md:px-6  ">
                        <form action="" onSubmit={handleSubmit}>
                            <div className="flex mt-4 flex-col gap-6 p-6 bg-[#FFFFFF] shadow-4 rounded-lg  ">
                                {advisoryAvailable?.types[0]?.advisory_services_prices ? advisoryAvailable?.types[0]?.advisory_services_prices.map((price) => (
                                    <div key={price.id} className="flex-col  justify-between items-center">
                                        <div className="flex justify-between items-center gap-3">
                                            <button
                                                type="button"
                                                onClick={() => handleClick(price.id)}
                                                className={`font-bold w-[50px] h-fit outline-none rounded-xl flex custom-inset-1 custom-inset-2 items-center ${visibility[price.id] ? 'bg-[#DDB762] justify-end' : 'bg-[#F8F8F8]'} hover:bg-opacity-80 focus:outline-none justify-start`}
                                            >
                                                <div className='w-6 h-6 rounded-xl bg-[#ECECEF]'></div>
                                            </button>
                                            <span>{price.importance.name}</span>
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
                                {hidden ? <div className="flex items-center gap-3">
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

export default ConsultationCustomizePage;
