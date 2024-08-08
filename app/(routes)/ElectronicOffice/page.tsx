
import Actions from '@/app/_components/pages/ElectronicOffice/Actions';
import Balance from '@/app/_components/pages/ElectronicOffice/Balance';
import ConsultationCard from '@/app/_components/pages/ElectronicOffice/ConsultationCard';
import Details from '@/app/_components/pages/ElectronicOffice/Details';
import Requests from '@/app/_components/pages/ElectronicOffice/Requests';
import StatusCircle from '@/app/_components/pages/ElectronicOffice/StatusCircle';
import CardHead from '@/app/_components/ui/CardHead';
import SecondHead from '@/app/_components/ui/SecondHead';
import ThirdHead from '@/app/_components/ui/ThirdHead';
import React from 'react';
import style from './style.module.css';
import StutasAndEventColom from '@/app/_components/ui/StutasAndEventColom';
const Page: React.FC = () => {
  const values = [9, 34, 34];
  const colors = ["#E56262", "#DDB762", "#00262F"]
  
  return (
    <div className='container mx-auto' >
      <SecondHead title={'المكتب الالكتروني'} />
      <div className={style.dashboard}>
        <div className={style.item}>
        <StutasAndEventColom/>
          
        </div>
        <div className={style.details}>
          <Balance currentBalance="32,423" pendingBalance="3900" />
          <Requests  />
          <ThirdHead title={'التخصيص'}/>
          <Actions />
        </div>

      </div>

    </div>
  )
};

export default Page;