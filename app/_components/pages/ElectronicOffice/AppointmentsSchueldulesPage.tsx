'use client'
import { registerLicense } from "@syncfusion/ej2-base";
import { Day, Inject, Month, ScheduleComponent, ViewDirective, ViewsDirective, Week } from '@syncfusion/ej2-react-schedule';
registerLicense("Ngo9BigBOggjHTQxAR8/V1NCaF1cWWhAYVtpR2Nbe053flZFalhWVBYiSV9jS3pTfkVqW39cdXVWTmdVUQ==");

function AppointmentsSheldulersPage() {
  const data = [
    {
      id: 1,
      title: 'Meeting with Team',
      start: new Date(2024, 7, 9, 10, 0),
      end: new Date(2024, 7, 9, 11, 0),
      isAllDay: false,
      priority: 'high',
      status: 'completed',
    },
    {
      id: 2,
      title: 'Project Deadline',
      start: new Date(2024, 7, 15, 0, 0),
      end: new Date(2024, 7, 15, 23, 59),
      isAllDay: true,
      priority: 'medium',
      status: 'pending',
    },
    {
      id: 3,
      title: 'Client Presentation',
      start: new Date(2024, 7, 20, 14, 0),
      end: new Date(2024, 7, 20, 15, 30),
      isAllDay: false,
      priority: 'low',
      status: 'in-progress',
    },
  ];

   

  return (
    <div className="container mx-auto min-h-screen">
      <ScheduleComponent
        width={800}
        height={500}
        eventSettings={{
          dataSource: data,
           
        }}
      >
        <ViewsDirective>
          <ViewDirective option="Day" />
          <ViewDirective option="Week" />
          <ViewDirective option="Month" />
        </ViewsDirective>
        <Inject services={[Day, Week, Month]} />
      </ScheduleComponent>
    </div>
  );
}

export default AppointmentsSheldulersPage;
