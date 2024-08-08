import Image from "next/image";

interface RequestProps {
  icon: any;
  title: string;
  color: string;
}

function RequestCard({ icon, title, color }: RequestProps) {
  return (
    <div
      className={'relative flex-1 h-13 flex items-center gap-2 p-5 rounded-[10px] bg-white my-2 md:my-6 shadow-requstCard cursor-pointer'}
      style={{ 
        borderRightColor: color 
      }}
    >
      <div className="w-[18px] h-[18px]">
        <Image src={icon} alt="icon" className="w-full h-full" />
      </div>
      <span className="flex-grow text-right">{title}</span>
      <div 
        className="absolute top-0 right-0 h-full w-[6px] rounded-r-[10px]"
        style={{ backgroundColor: color }}
      ></div>
    </div>
  );
}

export default RequestCard;