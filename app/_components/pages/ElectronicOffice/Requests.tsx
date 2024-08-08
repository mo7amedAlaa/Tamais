import brif1 from '@/public/Icons/briefcase-fill (1).png';
import brif from '@/public/Icons/briefcase-fill.png';
import r2 from '@/public/Icons/r2.png';
import vector from '@/public/Icons/Vector.png';
import React from 'react';
import RequestCard from '../../ui/RequestCard';
import ThirdHead from '../../ui/ThirdHead';


  const Requests: React.FC = () => {
  return (
    <div className="Requests">
    <ThirdHead title={'الطلبات'}/>
      <div className='flex   justify-between items-center  gap-3 md:gap-5 flex-wrap p-5 md:p-0 '> 
        <RequestCard icon={brif}   title='استشاراتي'     color='#DDB762'/>
        <RequestCard icon={r2}     title='خدماتي'      color='#00262F' />
        <RequestCard icon={vector} title='مواعيدي'     color='#DDB762' />
        <RequestCard icon={brif1}  title= 'عملائي'       color="#00262F" />
      </div>
    </div>
  );
};
export default Requests