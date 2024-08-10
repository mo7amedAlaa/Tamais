interface SecondHeadProps{
  title:string,
}
export default function SecondHead({title}:SecondHeadProps) {
  return (
    <div className=' mb-10 '>
      <h1 className='text-[#00262F] font-[700] text-[24px]  text-center px-0   '>{title}</h1>
    </div>
  )
}
