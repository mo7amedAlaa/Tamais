// StutasAndEventColom.tsx
'use client';
import { useState } from "react";
import ConsultationCard from '../pages/ElectronicOffice/ConsultationCard';
import StatusCircle from '../pages/ElectronicOffice/StatusCircle';
import ThirdHead from './ThirdHead';
import ActiveTitleTab from "./ActiveTitleTab";

type TabType = "services" | "advisoryServices" | "appointments";

function StutasAndEventColom() {
  const [activeTab, setActiveTab] = useState<TabType>('advisoryServices');

  const buttonTitles = {
    appointments: "مواعيدي",
    advisoryServices: "استشاراتي",
    services: "خدماتي"
  };

  return (
    <div>
      <ActiveTitleTab 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        buttonTitles={buttonTitles}
      />
      <div className="p-6">
        <StatusCircle type={activeTab} />
      </div>
      <ThirdHead title={'الاحداث'} />
      <div className="flex flex-col justify-center pb-5">
        <ConsultationCard  />
      </div>
    </div>
  );
}

export default StutasAndEventColom;
