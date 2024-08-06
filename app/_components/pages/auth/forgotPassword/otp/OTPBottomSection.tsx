import React from "react";

function OTPBottomSection() {
  return (
    <div className="flex flex-col gap-[20px] mt-[10px]">
      <h1 className=" text-gray">لم يصلك رمز تحقق؟</h1>
      <button type="button" className=" text-gold">
        رمز تحقق جديد
      </button>
    </div>
  );
}

export default OTPBottomSection;
