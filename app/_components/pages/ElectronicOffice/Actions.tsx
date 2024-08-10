 
import addIcon from '@/public/Icons/adding.png';
import Exclude from '@/public/Icons/Exclude.png';
import Link from 'next/link';
import React from 'react';
import ActionCard from '../../ui/ActionCard';
// const Actions=[
//   {
    
//   }
// ]

const Actions: React.FC = () => {
  return (
   <div className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 justify-between items-center ' >
   <Link href={"/ElectronicOffice/AddConsultation"} >
   <ActionCard title="اضافة استشارة" icon={addIcon} />
   </Link> 
   <Link href={"/ElectronicOffice/consultatscheldulers"}   >
    <ActionCard title="مواقيت العمل للاستشارات" icon={Exclude} />
   </Link>
   <Link href={'/ElectronicOffice/AddService'} >
    <ActionCard title="اضافة خدمة" icon={addIcon} />
   </Link>
   <Link href={''}>
    <ActionCard title="مواقيت العمل للخدمات" icon={Exclude} />
   </Link>
   <Link href={'/ElectronicOffice/AddSchedules'}>
    <ActionCard title="اضافة موعد" icon={addIcon} />
   </Link>
   <Link href={''}>
    <ActionCard title="مواقيت العمل للمواعيد" icon={Exclude} />
   </Link>
   </div>
  );
};

export default Actions;