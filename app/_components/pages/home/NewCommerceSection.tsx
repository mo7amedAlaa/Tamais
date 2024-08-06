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
import Card from "../../ui/Card";
import GoldCard from "../../ui/GoldCard";
function NewCommerceSection() {
  return (
    <div className=" w-full ">
      <h1 className=" mb-[25px] font-bold text-[30px]">المنضمون حديثا</h1>
      {/* <Swiper
                spaceBetween={50}
                navigation={true}
                pagination={{ clickable: true }}
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

                    <Card className=' gap-[10px]'>
                        <div className=' rounded-full overflow-hidden w-[141px] h-[141px]' >
                            <Image className=' rounded-full overflow-hidden' src={'/person.jpg'} width={141} height={141} alt='' />

                        </div>
                        <h1 className=' font-medium text-[18px]'>أسامة علي العقيلي</h1>
                        <div className=' text-center'>
                            <p>محامي أعمال</p>
                            <p>السعودية</p>
                        </div>
                    </Card>

                </SwiperSlide>
                <SwiperSlide>
                    <GoldCard className=' gap-[10px]'>
                        <div className=' rounded-full overflow-hidden w-[141px] h-[141px]' >
                            <Image className=' rounded-full overflow-hidden' src={'/person.jpg'} width={141} height={141} alt='' />

                        </div>
                        <h1 className=' font-medium text-[18px]'>أسامة علي العقيلي</h1>
                        <div className=' text-center'>
                            <p>محامي أعمال</p>
                            <p>السعودية</p>
                        </div>
                    </GoldCard>

                </SwiperSlide>
                <SwiperSlide>

                    <Card className=' gap-[10px]'>
                        <div className=' rounded-full overflow-hidden w-[141px] h-[141px]' >
                            <Image className=' rounded-full overflow-hidden' src={'/person.jpg'} width={141} height={141} alt='' />

                        </div>
                        <h1 className=' font-medium text-[18px]'>أسامة علي العقيلي</h1>
                        <div className=' text-center'>
                            <p>محامي أعمال</p>
                            <p>السعودية</p>
                        </div>
                    </Card>

                </SwiperSlide>

                <SwiperSlide>

                    <Card className=' gap-[10px]'>
                        <div className=' rounded-full overflow-hidden w-[141px] h-[141px]' >
                            <Image className=' rounded-full overflow-hidden' src={'/person.jpg'} width={141} height={141} alt='' />

                        </div>
                        <h1 className=' font-medium text-[18px]'>أسامة علي العقيلي</h1>
                        <div className=' text-center'>
                            <p>محامي أعمال</p>
                            <p>السعودية</p>
                        </div>
                    </Card>

                </SwiperSlide>



                <SwiperSlide>

                    <Card className=' gap-[10px]'>
                        <div className=' rounded-full overflow-hidden w-[141px] h-[141px]' >
                            <Image className=' rounded-full overflow-hidden' src={'/person.jpg'} width={141} height={141} alt='' />

                        </div>
                        <h1 className=' font-medium text-[18px]'>أسامة علي العقيلي</h1>
                        <div className=' text-center'>
                            <p>محامي أعمال</p>
                            <p>السعودية</p>
                        </div>
                    </Card>

                </SwiperSlide>
                <SwiperSlide>

                    <Card className=' gap-[10px]'>
                        <div className=' rounded-full overflow-hidden w-[141px] h-[141px]' >
                            <Image className=' rounded-full overflow-hidden' src={'/person.jpg'} width={141} height={141} alt='' />

                        </div>
                        <h1 className=' font-medium text-[18px]'>أسامة علي العقيلي</h1>
                        <div className=' text-center'>
                            <p>محامي أعمال</p>
                            <p>السعودية</p>
                        </div>
                    </Card>

                </SwiperSlide>
                <SwiperSlide>

                    <Card className=' gap-[10px]'>
                        <div className=' rounded-full overflow-hidden w-[141px] h-[141px]' >
                            <Image className=' rounded-full overflow-hidden' src={'/person.jpg'} width={141} height={141} alt='' />

                        </div>
                        <h1 className=' font-medium text-[18px]'>أسامة علي العقيلي</h1>
                        <div className=' text-center'>
                            <p>محامي أعمال</p>
                            <p>السعودية</p>
                        </div>
                    </Card>

                </SwiperSlide>
                <SwiperSlide>

                    <Card className=' gap-[10px]'>
                        <div className=' rounded-full overflow-hidden w-[141px] h-[141px]' >
                            <Image className=' rounded-full overflow-hidden' src={'/person.jpg'} width={141} height={141} alt='' />

                        </div>
                        <h1 className=' font-medium text-[18px]'>أسامة علي العقيلي</h1>
                        <div className=' text-center'>
                            <p>محامي أعمال</p>
                            <p>السعودية</p>
                        </div>
                    </Card>

                </SwiperSlide>



            </Swiper> */}
    </div>
  );
}

export default NewCommerceSection;
