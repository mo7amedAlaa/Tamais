'use client';
import { analytics_Client } from '@/app/_api/queries/office.query';
import { useMutation } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

interface StatusCircleProps {
  type: string;
}

const StatusCircle: React.FC<StatusCircleProps> = ({ type }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [chartData, setChartData] = useState<any>(null);

  const { mutate } = useMutation({
    mutationFn: analytics_Client,
    onSuccess: (res: any) => {
      if (res.status === 200) {
        setChartData(res.data.data.analytics);
        setError(false)
        console.log('Data fetched successfully', chartData);
      }
      setLoading(false);
    },
    onError: () => {
      handleError();
      setLoading(false);
      setError(true)
    },
  });

  useEffect(() => {
    setLoading(true);
    mutate();
  }, [mutate]);

  const handleError = () => {
    MySwal.fire({
      icon: 'error',
      title: 'خطأ',
      text: 'حدث خطأ أثناء جلب البيانات',
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[150px]">
        <svg
          className="animate-spin h-8 w-8 text-blue-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          ></path>
        </svg>
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[150px]">
        حدث خطا يرجي اعادة التحميل
      </div>
    );
  }

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
        { label: 'متأخر', value: selectedData.late || 0, color: '#00262F' },
      ];
      break;
    case 'advisoryServices':
      values = [selectedData.done, selectedData.pending, selectedData.late || 0];
      statuses = [
        { label: 'مكتمل', value: selectedData.done || 0, color: '#E56262' },
        { label: 'منتظر', value: selectedData.pending || 0, color: '#DDB762' },
        { label: 'متأخر', value: selectedData.late || 0, color: '#00262F' },
      ];
      break;
    case 'appointments':
      values = [selectedData.done, selectedData.pending];
      statuses = [
        { label: 'مكتمل', value: selectedData.done || 0, color: '#E56262' },
        { label: 'منتظر', value: selectedData.pending || 0, color: '#DDB762' },
      ];
      break;
    default:
      values = [];
      statuses = [];
  }

  const percentages = total > 0 ? values.map(value => (value / total) * 100) : [0, 0, 0];

  return (
    <motion.div
      className="w-full flex flex-col items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {total >= 0 ? (
        <>
          <motion.div
            className="relative w-44 h-44 flex items-center justify-center"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
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
              <span className="block text-[#00262F] text-[23.36px] font-[700]">
                {total}
              </span>
              <span className="block text-[#A6A4A4] text-[20.44px] font-[600]">
                الإجمالي
              </span>
            </div>
          </motion.div>
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
    </motion.div>
  );
};

export default StatusCircle;
