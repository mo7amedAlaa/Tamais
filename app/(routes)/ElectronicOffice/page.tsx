'use client'
import Actions from '@/app/_components/pages/ElectronicOffice/Actions';
import Balance from '@/app/_components/pages/ElectronicOffice/Balance';
import Requests from '@/app/_components/pages/ElectronicOffice/Requests';
import SecondHead from '@/app/_components/ui/SecondHead';
import StutasAndEventColom from '@/app/_components/ui/StutasAndEventColom';
import ThirdHead from '@/app/_components/ui/ThirdHead';
import { motion } from 'framer-motion';

import style from './style.module.css';
const Page: React.FC = () => {



  return (
    <motion.div
      className="container mx-auto min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <SecondHead title={'المكتب الالكتروني'} />
      <div className={style.dashboard}>
        <motion.div
          className={style.item}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <StutasAndEventColom />
        </motion.div>
        <motion.div
          className={style.details}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Balance />
          <Requests />
          <ThirdHead title={'التخصيص'} />
          <Actions />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Page;