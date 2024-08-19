'use client';

import shulder from '@/public/Icons/schulder.svg';
import moment from 'moment';
import Image from 'next/image';
import { useState } from 'react';
import { Event as BigCalendarEvent, Calendar, momentLocalizer, Views } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { FaPlus } from 'react-icons/fa';
import Swal from 'sweetalert2';
const localizer = momentLocalizer(moment);

function ConsultatSheldulersPage() {
  const [events, setEvents] = useState<BigCalendarEvent[]>([
    {
      title: 'اجتماع الفريق',
      start: new Date(2024, 7, 20, 10, 0),
      end: new Date(2024, 7, 20, 12, 0),
      allDay: false,
    },
    {
      title: 'استشارة مع العميل',
      start: new Date(2024, 7, 22, 14, 0),
      end: new Date(2024, 7, 22, 15, 30),
      allDay: false,
    },
    {
      title: 'ورشة عمل تطوير ويب',
      start: new Date(2024, 7, 24, 9, 0),
      end: new Date(2024, 7, 24, 17, 0),
      allDay: true,
    },
    {
      title: 'عطلة',
      start: moment('2024-08-28').toDate(),
      end: moment('2024-08-28').toDate(),
      allDay: true,
    },
  ]);

  const handleSelectSlot = async ({ start, end }: { start: Date; end: Date }) => {
    const { value: formValues } = await Swal.fire({
      title: 'إضافة موعد جديد',
      html: `
        <div>
          <label>اليوم:</label>
          <input type="date" id="swal-input1" class="swal2-input">
        </div>
        <div>
          <label>العنوان:</label>
          <input type="text" id="swal-input2" class="swal2-input" placeholder="عنوان الموعد">
        </div>
        <div style="display: flex; justify-content: space-between;">
          <div style="width: 48%;">
            <label>موعد البدء:</label>
            <input type="time" id="swal-input3" class="swal2-input">
          </div>
          <div style="width: 48%;">
            <label>موعد الانتهاء:</label>
            <input type="time" id="swal-input4" class="swal2-input">
          </div>
        </div>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'إضافة',
      preConfirm: () => {
        return {
          date: (document.getElementById('swal-input1') as HTMLInputElement).value,
          title: (document.getElementById('swal-input2') as HTMLInputElement).value,
          startTime: (document.getElementById('swal-input3') as HTMLInputElement).value,
          endTime: (document.getElementById('swal-input4') as HTMLInputElement).value,
        };
      },
    });

    if (formValues) {
      const { date, title, startTime, endTime } = formValues;
      const startDateTime = moment(`${date}T${startTime}`).toDate();
      const endDateTime = moment(`${date}T${endTime}`).toDate();

      setEvents([
        ...events,
        {
          title: title || 'حدث جديد',
          start: startDateTime,
          end: endDateTime,
          allDay: false,
        },
      ]);
    }
  };

  const eventStyleGetter = (event: BigCalendarEvent) => {
    let backgroundColor = '#3174ad';
    if (event.title === 'عطلة') {
      backgroundColor = '#f44336';
    } else if (event.title.includes('اجتماع')) {
      backgroundColor = '#4caf50';
    }

    const style = {
      backgroundColor,
      borderRadius: '5px',
      opacity: 0.8,
      color: 'white',
      border: '0px',
      display: 'block',
    };
    return {
      style,
    };
  };

  return (
    <div className="container mx-auto min-h-[90vh]">
      <div className="my-4 flex justify-between items-center ">
        <div className='flex items-center gap-5 '>
          <Image src={shulder} alt='schulder' />
          <h3 className='text-[#00262F] font-[700] text-[24px]  text-center px-0 '>مواقيت الاستشارات</h3>
        </div>
        <div>
          <button onClick={() => handleSelectSlot(
            {
              start: new Date(),
              end: new Date(new Date().getTime() + 30 * 60 * 1000),
            }
          )} className="bg-[#DDB762] flex items-center justify-between hover:bg-blue-700 text-[16px] text-white rounded-md font-[700] py-2 px-6 min-w-[163px]  min-h-[50px]">
            <FaPlus className='h-4 w-4' />إضافة حدث</button>
        </div>
      </div>
      <div>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: '800px' }}
          selectable
          onSelectSlot={handleSelectSlot}
          eventPropGetter={eventStyleGetter}
          defaultView={Views.WEEK}
          views={['week']}
          toolbar={false}
          messages={{
            week: 'أسبوع',
            day: 'يوم',
            month: 'شهر',
            showMore: (total) => `+ عرض المزيد (${total})`,
          }}
          days={['Monday', 'Tuesday', 'Wednesday', 'Thursday']}
        />
      </div>
    </div>
  );
}

export default ConsultatSheldulersPage;
