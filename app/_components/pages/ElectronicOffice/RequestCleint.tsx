import flagIcon from "@/public/Icons/flag.svg";
import loctionIcon from "@/public/Icons/loction.svg";
import Image from "next/image";
interface RequestClientProps {
  clientImage: string;
  clientName: string;
  clientCountry: string;
  clientLocation: string;
}
function RequestCleint({
  clientImage,
  clientName,
  clientCountry,
  clientLocation,
}):React.FC<RequestClientProps>{
  return (
     <div className="p-6 w-full bg-[#FFFFFF] rounded-[12px] shadow-lg text-[12px] leading-[22.49px] ">
     <div className="flex">
<div >
    <Image src={clientImage} alt='clintImage' className="w-[50px] h-[50px] rounded-full"/>
</div>
<div className="flex-1 p-3">
    <h3  className="text-[#00262F] font-[600] text-[14px] leading-[9px] text-right mb-3">{clientName}</h3>
    <div className="flex text-[#A6A4A4] font-[600] text-[14px] leading-[9px] text-right mb-4 gap-1"><Image src={flagIcon} alt='Flag'/>{clientCountry}</div>
    <div className="flex  text-[#A6A4A4] font-[600] text-[14px] leading-[9px] text-right gap-1"><Image src={loctionIcon} alt='Flag'/>{clientLocation}</div>
</div>
     </div>
    </div>
  )
}

export default RequestCleint
