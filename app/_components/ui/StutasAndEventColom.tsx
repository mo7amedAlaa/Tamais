'use client'
import { useState } from "react";
import styles from '../../(routes)/ElectronicOffice/style.module.css';
import ConsultationCard from '../pages/ElectronicOffice/ConsultationCard';
import StatusCircle from '../pages/ElectronicOffice/StatusCircle';
import ThirdHead from './ThirdHead';
type TabType = "services" | "advisoryServices" | "appointments";

function StutasAndEventColom() {
const [activeTab, setActiveTab] = useState<TabType>('advisoryServices');
  return (
    <div>
         <div className={styles.cardHeader}>
     <ul className={styles.nav}>
       <button
            className={`${styles.navItem} ${activeTab === 'appointments' ? styles.active : ''}`}
            onClick={() => setActiveTab('appointments')}
          >
            مواعيدي
          </button>
          <button
            className={`${styles.navItem} ${activeTab === 'advisoryServices' ? styles.active : ''}`}
            onClick={() => setActiveTab('advisoryServices')}
          >
            استشاراتي
          </button>
          <button
            className={`${styles.navItem} ${activeTab === 'services' ? styles.active : ''}`}
            onClick={() => setActiveTab('services')}
          >
            خدماتي
          </button>
     </ul>
    </div>
          <div className="p-6">
            <StatusCircle   type={activeTab}/>
          </div>
          <div  >
            <ThirdHead title={'الاحداث'} />
            <ConsultationCard />
          </div>
    </div>
  )
}

export default StutasAndEventColom
