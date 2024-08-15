'use client';
import { changeConsultationDis, changeConsultationEn } from '@/app/_api/queries/office.query';
import dollar from '@/public/Icons/dollar.svg';
import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface Price {
    id: string;
    importance?: {
        name: string;
    };
    level?: {
        name: string;
    };
    price: number;
}
interface ServiceCardProps {
    id: number
    active: boolean | null
    isHidden: boolean | null
    title: string
    prices: Price[]
    type: 1 | 2 | 3
    link: string
    refresh: any
}

function CustomizationCard({ id, active, isHidden, title, prices, type, link, refresh }: ServiceCardProps) {
    const { mutate: enableProduct } = useMutation({
        mutationFn: changeConsultationEn,
        onSuccess: (res: any) => {
            if (res.status === 200) {
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
    const handleEnableProduct = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        e.preventDefault();
        if (active) {
            enableProduct(id)
            refresh()
        }

    };
    const handleDisableProduct = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        e.preventDefault();
        if (active) {
            disableProduct(id)
            refresh()
        }
    };
    return (
        <Link href={link} passHref>
            <div className="p-6 w-full bg-[#FFFFFF] rounded-[12px] shadow-lg text-[12px] leading-[22.49px] cursor-pointer">
                <div className="flex justify-between items-center font-[700] text-right">
                    <span className="text-blue-500 font-bold flex gap-3 text-[#00262F]">{title}</span>
                    {
                        isHidden ? <button
                            onClick={handleEnableProduct}
                            className={`font-bold w-[50px]  outline-none rounded-xl flex items-center bg-[#F8F8F8] hover:bg-opacity-80 focus:outline-none`}
                        >
                            <div className='w-6 h-6 rounded-xl bg-[#ECECEF]'></div>
                        </button> : <button
                            onClick={handleDisableProduct}
                            className={`font-bold w-[50px]  outline-none rounded-xl flex items-center justify-end bg-[#DDB762]  hover:bg-opacity-80 focus:outline-none`}
                        >
                            <div className='w-6 h-6 rounded-xl bg-[#ECECEF]'></div>
                        </button>
                    }

                </div>
                {(active) && <div className="mt-4 flex flex-col text-[#00262F] font-[600] gap-2">
                    <div className='bg-[#E9ECF2] w-full h-[1px] my-4'></div>
                    {type === 1 && prices.map((price) => (
                        !price.isHidden &&
                        <div key={price.id} className="flex justify-between" >
                            <span className='flex gap-3'>
                                <Image src={dollar} alt="price-icon" />
                                {price.importance?.name}
                            </span>
                            <span className='text-[#A6A4A4]'>{price.price} رس</span>
                        </div>
                    ))}
                    {type === 2 && prices.map((price) => (
                        <div key={price.id} className="flex justify-between">
                            <span className='flex gap-3'>
                                <Image src={dollar} alt="price-icon" />
                                {price.level?.name}
                            </span>
                            <span className='text-[#A6A4A4]'>{price.price} رس</span>
                        </div>
                    ))}
                    {type === 3 && prices.map((price) => (
                        <div key={price.id} className="flex justify-between">
                            <span className='flex gap-3'>
                                <Image src={dollar} alt="price-icon" />
                                {price.level?.name}
                            </span>
                            <span className='text-[#A6A4A4]'>{price.price} رس</span>
                        </div>
                    ))}
                </div>}

            </div>
        </Link >
    );
}

export default CustomizationCard;
