'use client'
import styles from '../../(routes)/ElectronicOffice/style.module.css'
import { useState } from "react";

function CardHead() {
       const [activeTab, setActiveTab] = useState('consultations');
  return (
     <div className={styles.cardHeader}>
     <ul className={styles.nav}>
       <button
            className={`${styles.navItem} ${activeTab === 'appointments' ? styles.active : ''}`}
            onClick={() => setActiveTab('appointments')}
          >
            مواعيدي
          </button>
          <button
            className={`${styles.navItem} ${activeTab === 'consultations' ? styles.active : ''}`}
            onClick={() => setActiveTab('consultations')}
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
  )
}

export default CardHead
