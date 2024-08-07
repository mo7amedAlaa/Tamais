import React from 'react'

function ThirdHead({title,className} ) {
  return (
    <div>
        <h1 className={`text-[14px] text-[#A6A4A4] leading-[20px] font-[600] mb-3 ${className}`}>{title}</h1>
    </div>
  )
}

export default ThirdHead
