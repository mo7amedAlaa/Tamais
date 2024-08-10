import brif1 from '@/public/Icons/briefcase-fill (1).png';
import brif from '@/public/Icons/briefcase-fill.png';
import r2 from '@/public/Icons/r2.png';
import vector from '@/public/Icons/Vector.png';
import React from 'react';
import RequestCard from '../../ui/RequestCard';
import ThirdHead from '../../ui/ThirdHead';
import Link from 'next/link';


const Requests: React.FC = () => {
  return (
    <div className="Requests">
      <ThirdHead title={'الطلبات'} />
      <div className='flex   justify-between items-center  gap-3 md:gap-5 flex-wrap p-5 md:p-0 '>
        <Link href="/ElectronicOffice/consultationsRequest" className='flex-1' >
          <RequestCard icon={brif} title='استشاراتي' color='#DDB762' />
        </Link>
        <Link href={"/ElectronicOffice/serviceRequest"}  className='flex-1' >
          <RequestCard icon={r2} title='خدماتي' color='#00262F' />
        </Link>
        <Link href={"/ElectronicOffice/appointmentsRequest"} className='flex-1' >       
         <RequestCard icon={vector} title='مواعيدي' color='#DDB762' />
        </Link>
        <Link href={"/ElectronicOffice/clientsRequest"} className='flex-1' >     
           <RequestCard icon={brif1} title='عملائي' color="#00262F" />
        </Link>
      </div>
    </div>
  );
};
export default Requests