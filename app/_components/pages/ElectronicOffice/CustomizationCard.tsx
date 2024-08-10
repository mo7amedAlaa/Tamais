'use client'
import dollar from '@/public/Icons/dollar.svg'
import Image from 'next/image'
import React, { useState } from 'react'
interface ServiceCardProps{
    active:boolean
    title:string
    price1:string
    price2:string
    price3:string
}
function CustomizationCard({active,title,price1,price2,price3}):React.FC<ServiceCardProps> {
     const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
  };
  return (
      <div className="p-6 w-full bg-[#FFFFFF] rounded-[12px] shadow-lg text-[12px] leading-[22.49px] ">
            <div className="mt-2 flex justify-between items-center font-[700]  text-right">
                <span className="text-blue-500 font-bold flex gap-3 text-[#00262F]">{title}</span>
                <button
      onClick={handleClick}
      className={`font-bold  w-[50px] h-fit   outline-none    rounded-xl flex  custom-inset-1 custom-inset-2 items-center ${isActive ? ' bg-[#DDB762]  justify-end' : 'bg-[#F8F8F8]'} hover:bg-opacity-80 focus:outline-none justify-start' ` }
    >
        <div className='w-6 h-6 rounded-xl bg-[#ECECEF] '> </div>
    </button>
            </div>
                         <div className='bg-[#E9ECF2] w-full h-[1px] my-4'></div>

             <div className="mt-4 flex flex-col  text-[#00262F]  font-[600] gap-2">
                <div className="flex justify-between ">
                    <span className='flex gap-3 '> <Image src={dollar} alt="price-icon" />عادي </span>
                    <span className='text-[#A6A4A4]'>{price1} رس</span>
                </div>    
                <div className="flex justify-between ">
                    <span className='flex gap-3 '> <Image src={dollar} alt="price-icon" />مهم </span>
                    <span className='text-[#A6A4A4]'>{price2} رس</span>
                </div>    
                <div className="flex justify-between ">
                    <span className='flex gap-3 '> <Image src={dollar} alt="price-icon" />مهم جدا </span>
                    <span className='text-[#A6A4A4]'>{price3} رس</span>
                </div>    
            </div>
            
             
        </div>
  )
}

export default CustomizationCard
