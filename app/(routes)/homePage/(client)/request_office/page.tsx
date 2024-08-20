'use client'
import Requests from '@/app/_components/pages/ElectronicOffice/Requests';
import SecondHead from '@/app/_components/ui/SecondHead';
import ThirdHead from '@/app/_components/ui/ThirdHead';
import { motion } from 'framer-motion';

import Balance from '@/app/_components/Requestoffice/Balance';
import Status_Event from '@/app/_components/Requestoffice/Status_Event';
import style from './style.module.css';

const Page: React.FC = () => {



    return (
        <motion.div
            className="container mx-auto min-h-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <SecondHead title={' مكتب الطلبات  '} />
            <div className={style.dashboard}>
                <motion.div
                    className={style.item}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Status_Event />
                </motion.div>
                <motion.div
                    className={style.details}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <Balance />
                    <Requests />
                    <ThirdHead title={'الاكثر طلبا'} />
                </motion.div>
            </div>
        </motion.div>
    );
};

export default Page;