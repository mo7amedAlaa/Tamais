import Image from "next/image";
interface RequestProps {
  icon: any;
  title: string;
  color: string;
}
function RequestCard({icon,title,color}:RequestProps) {
  return (
    <div className={`relative  w-34  h-13 flex items-center gap-2 p-5  rounded-[10px]      bg-white my-6 shadow-requstCard  before:content-[''] before:block before:w-[6px] before:h-full 
    before:bg-[${color}]   before:rounded-r-[10px] before:absolute before:top-0 before:right-0`}>
      <div  className="w-[18px] h-[18px] ">
      <Image src={icon} alt={icon} className="w-full h-full"   />
      </div>
      <span>{title}</span>
    </div>
  )
}

export default RequestCard
