"use client";
// import Swiper core and required modules
import { A11y, Navigation, Pagination, Scrollbar } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
function CompaniesSectionSwiper() {
  return (
    <div className=" w-full">
      <h1 className=" mb-[25px] font-bold text-[30px]">الشركاء والرعاة</h1>

      {/* <Swiper
                spaceBetween={50}
                navigation={true}
                breakpoints={{
                    // when window width is >= 640px
                    640: {
                        width: 640,
                        slidesPerView: 1,
                    },
                    // when window width is >= 768px
                    768: {
                        width: 768,
                        slidesPerView: 2,
                    },
                    900: {
                        width: 768,
                        slidesPerView: 3,
                    },
                    1200: {
                        width: 768,
                        slidesPerView: 3,
                    },
                }}
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
            >
                <SwiperSlide>
                    <div className=' rounded-full w-[255px] h-[255px]  flex items-center justify-center mx-auto bg-white shadow-md'>
                        <div className=' overflow-hidden w-[184px] h-[60px] mt-[50px]'>
                            <Image className=' ' src={'/black.svg'} width={184} height={60} alt='' />

                        </div>


                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className=' rounded-full w-[255px] h-[255px]  flex items-center justify-center mx-auto bg-white shadow-md'>
                        <div className=' overflow-hidden w-[184px] h-[60px] mt-[50px]'>
                            <Image className=' ' src={'/black.svg'} width={184} height={60} alt='' />

                        </div>


                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className=' rounded-full w-[255px] h-[255px]  flex items-center justify-center mx-auto bg-white shadow-md'>
                        <div className=' overflow-hidden w-[184px] h-[60px] mt-[50px]'>
                            <Image className=' ' src={'/black.svg'} width={184} height={60} alt='' />

                        </div>


                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className=' rounded-full w-[255px] h-[255px]  flex items-center justify-center mx-auto bg-white shadow-md'>
                        <div className=' overflow-hidden w-[184px] h-[60px] mt-[50px]'>
                            <Image className=' ' src={'/black.svg'} width={184} height={60} alt='' />

                        </div>


                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className=' rounded-full w-[255px] h-[255px]  flex items-center justify-center mx-auto bg-white shadow-md'>
                        <div className=' overflow-hidden w-[184px] h-[60px] mt-[50px]'>
                            <Image className=' ' src={'/black.svg'} width={184} height={60} alt='' />

                        </div>


                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className=' rounded-full w-[255px] h-[255px]  flex items-center justify-center mx-auto bg-white shadow-md'>
                        <div className=' overflow-hidden w-[184px] h-[60px] mt-[50px]'>
                            <Image className=' ' src={'/black.svg'} width={184} height={60} alt='' />

                        </div>


                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className=' rounded-full w-[255px] h-[255px]  flex items-center justify-center mx-auto bg-white shadow-md'>
                        <div className=' overflow-hidden w-[184px] h-[60px] mt-[50px]'>
                            <Image className=' ' src={'/black.svg'} width={184} height={60} alt='' />

                        </div>


                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className=' rounded-full w-[255px] h-[255px]  flex items-center justify-center mx-auto bg-white shadow-md'>
                        <div className=' overflow-hidden w-[184px] h-[60px] mt-[50px]'>
                            <Image className=' ' src={'/black.svg'} width={184} height={60} alt='' />

                        </div>


                    </div>
                </SwiperSlide>


            </Swiper> */}
    </div>
  );
}

export default CompaniesSectionSwiper;
