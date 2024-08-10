'use client'
import RequestCleint from '@/app/_components/pages/ElectronicOffice/RequestCleint';
import SecondHead from '@/app/_components/ui/SecondHead';
import avatar from '@/public/avatar1.png';
function MyClients() {
  return (
    <div className='container mx-auto min-h-screen'>
    <SecondHead title={'عملائي'} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-[25px] gap-y-4  justify-center py-3 md:py-6 ">
        <RequestCleint clientImage={`${avatar}`} clientName={'معتز حسن المالكي'} clientCountry={'المملكة العربية السعودية'} clientLocation={'الرياض'}/>
        <RequestCleint clientImage={`${avatar}`} clientName={'معتز حسن المالكي'} clientCountry={'المملكة العربية السعودية'} clientLocation={'الرياض'}/>
        <RequestCleint clientImage={`${avatar}`} clientName={'معتز حسن المالكي'} clientCountry={'المملكة العربية السعودية'} clientLocation={'الرياض'}/>
        <RequestCleint clientImage={`${avatar}`} clientName={'معتز حسن المالكي'} clientCountry={'المملكة العربية السعودية'} clientLocation={'الرياض'}/>
         
       
  
        </div>
    </div>
  )
}

export default MyClients
