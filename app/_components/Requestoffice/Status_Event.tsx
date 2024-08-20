'use client';

import { useState } from "react";
import ConsultationCard from "../pages/ElectronicOffice/ConsultationCard";
import ActiveTitleTab from "../ui/ActiveTitleTab";
import ThirdHead from "../ui/ThirdHead";
import StatusCircle from "./StatusCircle";

type TabType = string;

function Status_Event() {
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
        <ConsultationCard />
      </div>
    </div>
  );
}

export default Status_Event;
