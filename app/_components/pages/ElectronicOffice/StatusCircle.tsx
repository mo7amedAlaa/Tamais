import React from 'react';

interface StatusCircleProps {
  values: number[];
  colors: string[];
  statuses: { label: string, value: number, color: string }[];
}

const StatusCircle: React.FC<StatusCircleProps> = ({ values, colors, statuses }) => {
  const total = values.reduce((acc, value) => acc + value, 0);
  const percentages = values.map(value => (value / total) * 100);

  return (
    <div className='w-full flex flex-col items-center'>
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
                stroke={colors[index]}
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
      <div className="mt-4 w-full flex   items-center">
        {statuses.map((status, index) => (
          <div key={index} className="flex items-center w-full justify-around px-4 py-2">
            <span className="w-[9px] h-[9px] " style={{ background: status.color }}>
            </span>
            <span className="text-[14px] font-[600] leading-[20px] " style={{ color: status.color }}>
              {status.label}
            </span>
            <span className="text-[18px] font-[700] leading-[20px]" style={{ color: status.color }}>
              {status.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatusCircle;
