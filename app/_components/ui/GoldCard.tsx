import React from "react";

function GoldCard({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex py-[25px] h-[150px] md:h-[300px] flex-col items-center justify-center gap-[20px] text-white  shadow-md rounded-lg ${className}`}
      style={{
        background:
          "linear-gradient(136.97deg, #DDB762 3.34%, #000000 225.23%)",
      }}
    >
      {children}
    </div>
  );
}

export default GoldCard;
