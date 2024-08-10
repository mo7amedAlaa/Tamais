'use client'
import RequestCleint from '@/app/_components/pages/ElectronicOffice/RequestCleint';
import RequestConsultationCard from '@/app/_components/pages/ElectronicOffice/RequestConsultationCard';
import ActiveTitleTab from '@/app/_components/ui/ActiveTitleTab';
import SecondHead from '@/app/_components/ui/SecondHead';
import avatar from '@/public/avatar1.png';
import { useState } from 'react';
type TabType =  string ;
function ConsultationsRequests() {
  const [activeTab, setActiveTab] = useState<TabType>('Customers');
   const buttonTitles = {
    Customers: "العملاء",
    DigitalGuide: "الدليل الرقمي",
  };
  return (
    <div className='container mx-auto min-h-screen'>
    <SecondHead title={'طلبات الاستشارات'} />
       <ActiveTitleTab
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        buttonTitles={buttonTitles}
      />
      {activeTab==='DigitalGuide'?
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-[25px] gap-y-4  justify-center py-3 md:py-6">
        <RequestConsultationCard
        status="غير مكتملة"
        title="استشارة أفراد مرئية"
        date="6/12/2024"
        time="12:30 ص"
        importance="مهم جدا"
        price="350"
        senderName="عبدالله حسن المالكي"
        senderImage={`https://m.media-amazon.com/images/M/MV5BMTY2ODQ3NjMyMl5BMl5BanBnXkFtZTcwODg0MTUzNA@@._V1_.jpg`}
      />
        <RequestConsultationCard
        status="غير مكتملة"
        title="استشارة أفراد مرئية"
        date="6/12/2024"
        time="12:30 ص"
        importance="مهم جدا"
        price="350"
        senderName="عبدالله حسن المالكي"
        senderImage={`https://m.media-amazon.com/images/M/MV5BMTY2ODQ3NjMyMl5BMl5BanBnXkFtZTcwODg0MTUzNA@@._V1_.jpg`}
      />
        
        
       
      </div>: <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-[25px] gap-y-4  justify-center py-3 md:py-6 ">
        <RequestCleint clientImage={`https://m.media-amazon.com/images/M/MV5BMTY2ODQ3NjMyMl5BMl5BanBnXkFtZTcwODg0MTUzNA@@._V1_.jpg`} clientName={'معتز حسن المالكي'} clientCountry={'المملكة العربية السعودية'} clientLocation={'الرياض'}/>
        <RequestCleint clientImage={`https://m.media-amazon.com/images/M/MV5BMTY2ODQ3NjMyMl5BMl5BanBnXkFtZTcwODg0MTUzNA@@._V1_.jpg`} clientName={'معتز حسن المالكي'} clientCountry={'المملكة العربية السعودية'} clientLocation={'الرياض'}/>
        <RequestCleint clientImage={`https://m.media-amazon.com/images/M/MV5BMTY2ODQ3NjMyMl5BMl5BanBnXkFtZTcwODg0MTUzNA@@._V1_.jpg`} clientName={'معتز حسن المالكي'} clientCountry={'المملكة العربية السعودية'} clientLocation={'الرياض'}/>
        <RequestCleint clientImage={`https://m.media-amazon.com/images/M/MV5BMTY2ODQ3NjMyMl5BMl5BanBnXkFtZTcwODg0MTUzNA@@._V1_.jpg`} clientName={'معتز حسن المالكي'} clientCountry={'المملكة العربية السعودية'} clientLocation={'الرياض'}/>
       
        
  
        </div>}
    </div>
  )
}

export default ConsultationsRequests
