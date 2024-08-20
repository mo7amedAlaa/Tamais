'use client'
import { PROFILE_TYPE } from '@/app/_helpers/config/constants';
import brif1 from '@/public/Icons/briefcase-fill (1).png';
import brif from '@/public/Icons/briefcase-fill.png';
import r2 from '@/public/Icons/r2.png';
import vector from '@/public/Icons/Vector.png';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import RequestCard from '../../ui/RequestCard';
import ThirdHead from '../../ui/ThirdHead';


const Requests: React.FC = () => {
  const [userType, setUserType] = useState<string>('');

  useEffect(() => {
    const storedUserType = localStorage.getItem(PROFILE_TYPE);
    setUserType(storedUserType || '');
  }, []);

  return (
    <div className="Requests">
      <ThirdHead title={'الطلبات'} />
      <div className='flex   justify-between items-center  gap-3 md:gap-5 flex-wrap p-5 md:p-0 '>
        <Link href={`${userType === 'lawyer' ? "/ElectronicOffice/consultationsRequest" : userType == 'client' && "/homePage/request_office/consultationsRequest"}`} className='flex-1' >
          <RequestCard icon={brif} title='استشاراتي' color='#DDB762' />
        </Link>
        <Link href={`${userType === 'lawyer' ? "/ElectronicOffice/serviceRequest" : userType == 'client' && "/homePage/request_office/serviceRequest"}`} className='flex-1' >
          <RequestCard icon={r2} title='خدماتي' color='#00262F' />
        </Link>
        <Link href={`${userType === 'lawyer' ? "/ElectronicOffice/appointmentsRequest" : userType == 'client' && "/homePage/request_office/appointmentsRequest"}`} className='flex-1' >
          <RequestCard icon={vector} title='مواعيدي' color='#DDB762' />
        </Link>
        {userType === 'lawyer' ? <Link href={"/ElectronicOffice/clientsRequest"} className='flex-1' >
          <RequestCard icon={brif1} title='عملائي' color="#00262F" />
        </Link> : <Link href={"#"} className='flex-1' >
          <RequestCard icon={brif1} title='دوراتي' color="#00262F" />
        </Link>

        }

      </div>
    </div>
  );
};
export default Requests