interface ThirdHeadProps{
  title:string
}
function ThirdHead({title }:ThirdHeadProps ) {
  return (
    <div>
        <h1 className={`text-[14px] text-[#A6A4A4] leading-[20px] font-[600] mb-3  `}>{title}</h1>
    </div>
  )
}

export default ThirdHead
