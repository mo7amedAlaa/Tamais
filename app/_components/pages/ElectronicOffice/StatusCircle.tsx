'use client';
import { analytics } from '@/app/_api/queries/office.query';
import { useMutation } from '@tanstack/react-query';
import React, { useState, useEffect } from 'react';

interface StatusCircleProps {
  type: 'services' | 'advisoryServices' | 'appointments';  
}

const StatusCircle: React.FC<StatusCircleProps> = ({ type }) => {
  const [loading, setLoading] = useState<boolean>(false);  
  const [error, setError] = useState<string | null>(null);  
  const [chartData, setChartData] = useState<any>(null);
 
  const { mutate } = useMutation({
    mutationFn: analytics,
    onSuccess: (res: any) => {
      if (res.status === 200) {
        setChartData(res.data.data);
        console.log('Data fetched successfully', chartData);
      } else {
        setError('حدث خطأ أثناء جلب البيانات');
        console.log('Error fetching data');
      }
      setLoading(false);
    },
    onError: (error: any) => {
      setError('حدث خطأ أثناء جلب البيانات');
      toast.error('حدث خطأ أثناء جلب البيانات');
      console.log('Error:', error);
      setLoading(false);
    },
  });

  useEffect(() => {
    setLoading(true);
    mutate();
  }, [mutate]);

  if (loading) return <div>Loading...</div>;  
  if (error) return <div>Error: {error}</div>;

  const selectedData = chartData?.[type] || {};
  const total = selectedData.total || 0;

  let values: number[] = [];
  let statuses: { label: string; value: number; color: string }[] = [];

  switch (type) {
    case 'services':
      values = [selectedData.done, selectedData.pending, selectedData.late || 0];
      statuses = [
        { label: 'مكتمل', value: selectedData.done || 0, color: '#E56262' },
        { label: 'منتظر', value: selectedData.pending || 0, color: '#DDB762' },
        { label: 'متأخر', value: selectedData.late || 0, color: '#00262F' }
      ];
      break;
    case 'advisoryServices':
      values = [selectedData.done, selectedData.pending, selectedData.late || 0];
      statuses = [
        { label: 'مكتمل', value: selectedData.done || 0, color: '#E56262' },
        { label: 'منتظر', value: selectedData.pending || 0, color: '#DDB762' },
        { label: 'متأخر', value: selectedData.late || 0, color: '#00262F' }
      ];
      break;
    case 'appointments':
      values = [selectedData.done, selectedData.pending];
      statuses = [
        { label: 'مكتمل', value: selectedData.done || 0, color: '#E56262' },
        { label: 'منتظر', value: selectedData.pending || 0, color: '#DDB762' }
      ];
      break;
    default:
      values = [];
      statuses = [];
  }

  const percentages = total > 0 ? values.map(value => (value / total) * 100) : [0, 0, 0];

  return (
    <div className='w-full flex flex-col items-center'>
      {total >= 0 ? (
        <>
          <div className="relative w-44 h-44 flex items-center justify-center">
            <svg viewBox="0 0 36 36" className="w-full h-full absolute">
              {percentages.map((percentage, index) => {
                const offset = percentages.slice(0, index).reduce((acc, value) => acc + value, 0);
                return (
                  <circle
                    key={index}
                    cx="18"
                    cy="18"
                    r="15.9155"
                    fill="transparent"
                    strokeLinecap="round"
                    stroke={statuses[index]?.color || '#000'}
                    strokeWidth="3"
                    strokeDasharray={`${percentage} ${100 - percentage}`}
                    strokeDashoffset={-offset}
                    transform="rotate(-90 18 18)"
                  />
                );
              })}
            </svg>
            <div className="absolute text-center">
              <span className='block text-[#00262F] text-[23.36px] font-[700]'>
                {total}
              </span>
              <span className='block text-[#A6A4A4] text-[20.44px] font-[600]'>
                الإجمالي
              </span>
            </div>
          </div>
          <div className="mt-4 w-full flex items-center">
            {statuses.map((status, index) => (
              <div key={index} className="flex items-center w-full justify-around px-4 py-2">
                <span className="w-[9px] h-[9px]" style={{ background: status.color }}></span>
                <span className="text-[14px] font-[600] leading-[20px]" style={{ color: status.color }}>
                  {status.label}
                </span>
                <span className="text-[18px] font-[700] leading-[20px]" style={{ color: status.color }}>
                  {status.value}
                </span>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="text-center text-gray-500">لا توجد بيانات لعرضها</div>
      )}
    </div>
  );
};

export default StatusCircle;
