'use client'
import { Day, Inject, Month, ScheduleComponent, ViewDirective, ViewsDirective, Week } from '@syncfusion/ej2-react-schedule';
import { registerLicense } from "@syncfusion/ej2-base";
import 'tailwindcss/tailwind.css'; // Import Tailwind CSS

registerLicense("Ngo9BigBOggjHTQxAR8/V1NCaF1cWWhAYVtpR2Nbe053flZFalhWVBYiSV9jS3pTfkVqW39cdXVWTmdVUQ==");

function ConsultatSheldulersPage() {
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

  const eventTemplate = ({ title, start, end, priority, status }) => (
    <div class="
    bg-black
        w-full
        h-full
        
        m-0
       
      ">
      <strong class="text-lg">${title}</strong><br />
      <small class="text-sm">${start?.toLocaleString()} - ${end?.toLocaleString()}</small><br />
      <small class="text-xs">Priority: ${priority}</small><br />
      <small class="text-xs">Status: ${status}</small>
    </div>
  );

  return (
    <div>
      <ScheduleComponent
        width={800}
        height={500}
        eventSettings={{
          dataSource: data,
          template: eventTemplate,
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

export default ConsultatSheldulersPage;
