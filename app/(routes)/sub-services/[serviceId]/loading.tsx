import React from "react";

const loading = () => {
  return (
    <div className="absolute inset-0 flex justify-center items-center bg-[#f7dfac] backdrop-blur-sm ">
      <div className="w-20 h-20 border-4 border-white border-t-[#DDB762] rounded-full animate-spin"></div>
    </div>
  );
};

export default loading;
