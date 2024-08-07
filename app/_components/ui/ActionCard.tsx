import arrow from '@/public/Icons/Right 10.png';
import Image from 'next/image';
function ActionCard({title,icon}) {
  interface RequestProps {
  icon: string;
  title: string;
  
}
  return (
    <div className="w-[278px] h-15 rounded-xl bg-[#FFFFFF]  
 shadow-action  flex items-center justify-between   p-4  cursor-pointer    ">
     <div className='text-[14px] font-[600] leading-[26.24px] flex items-center gap-2 '>
      <Image  src={icon} alt={icon} className='w-5 h-5 text-[#DDB762]'/>
      <span className='text-[#00262F]'>{title}</span> 
      </div>
      <div>
      <Image  src={arrow} alt={arrow} className='w-5 h-5       '/>
      </div>
    </div>
  )
}

export default ActionCard
