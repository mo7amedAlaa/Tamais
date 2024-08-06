import React from "react";

function Card({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex py-[25px] h-[150px] md:h-[300px] flex-col items-center text-black justify-center gap-[20px] shadow-md rounded-lg ${className}`}
    >
      {children}
    </div>
  );
}

export default Card;
