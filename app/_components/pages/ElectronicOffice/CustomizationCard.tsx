'use client';
import dollar from '@/public/Icons/dollar.svg';
import Image from 'next/image';
import Link from 'next/link';

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
    active: boolean;
    title: string;
    prices: Price[];
    type: 1 | 2 | 3;
    link: string;
}

function CustomizationCard({ active, title, prices, type, link }: ServiceCardProps) {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        e.preventDefault();
        // apiActions

    };

    return (
        <Link href={link} passHref>
            <div className="p-6 w-full bg-[#FFFFFF] rounded-[12px] shadow-lg text-[12px] leading-[22.49px] cursor-pointer">
                <div className="flex justify-between items-center font-[700] text-right">
                    <span className="text-blue-500 font-bold flex gap-3 text-[#00262F]">{title}</span>
                    <button
                        onClick={handleClick}
                        className={`font-bold w-[50px]  outline-none rounded-xl flex items-center ${active ? 'bg-[#DDB762]' : 'bg-[#F8F8F8]'} hover:bg-opacity-80 focus:outline-none`}
                    >
                        <div className='w-6 h-6 rounded-xl bg-[#ECECEF]'></div>
                    </button>
                </div>
                <div className='bg-[#E9ECF2] w-full h-[1px] my-4'></div>
                <div className="mt-4 flex flex-col text-[#00262F] font-[600] gap-2">
                    {type === 1 && prices.map((price) => (
                        <div key={price.id} className="flex justify-between">
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
                </div>
            </div>
        </Link>
    );
}

export default CustomizationCard;
