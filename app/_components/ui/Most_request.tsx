'use client'
import { motion } from 'framer-motion';

export default function Most_request() {
    return (
        <motion.div className=' flex-col items-start justify-between ' initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }} >
            {[1, 2, 3].map((item) => <div key={item} className='bg-white shadow-sm rounded-lg p-5 flex justify-between items-center w-full my-2'>
                <div>
                    <p className='text-sm text-[#A6A4A4] leading-[20px] font-[600] mb-[1px]  '>خدمة</p>
                    <p className='text-lg text-[#00262F] leading-[20px] font-[700]   '>توكيل محامي</p>
                </div>
                <p className='text-lg text-[#DDB762] leading-[20px] font-[700] '>100 ريال</p>
            </div>)
            }
        </motion.div>
    )
}
