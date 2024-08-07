
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
const Page: React.FC = () => {
  const values = [9, 34, 34];
  const colors = ["#E56262", "#DDB762", "#00262F"]
  const statuses = [
    { label: 'مكتمل', value: 30, color: '#E56262' },
    { label: 'منتظر', value: 20, color: '#DDB762' },
    { label: 'متأخر', value: 50, color: '#00262F' }
  ];
  return (
    <div className='container  ' >
      <SecondHead title={'المكتب الالكتروني'} />
      <div className={style.dashboard}>
        <div className={style.item}>
          <CardHead />
          <div className="p-6">
            <StatusCircle values={values} colors={colors} statuses={statuses} />
          </div>
          <div className={style.event}>
            <ThirdHead title={'الاحداث'} />
            <ConsultationCard />
          </div>
        </div>
        <div className={'flex-1'}>
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