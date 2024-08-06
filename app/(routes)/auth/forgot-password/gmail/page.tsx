import InfoSide from "@/app/_components/pages/auth/common/InfoSide";
import ForgotPasswordGmailForm from "@/app/_components/pages/auth/forgotPassword/gmail/ForgotPasswordGmailForm";
import React, { Suspense } from "react";

function page() {
  return (
    <div className="grid lg:grid-cols-2 grid-cols-1 overflow-hidden">
      <div className="flex flex-col gap-[20px] items-center justify-center mx-auto w-[60%]">
        <h1 className=" font-bold text-[30px]">نسيت كلمة المرور</h1>
        <p className=" text-gray text-center font-medium">
          أدخل البريد الألكتروني أو رقم الهاتف لأرسال كود التفعيل
          <br />
          وإنشاء كلمة مرور جديدة
        </p>

        {/* <ForgotPasswordGmailForm /> */}
      </div>
      <InfoSide />
    </div>
  );
}

export default page;
