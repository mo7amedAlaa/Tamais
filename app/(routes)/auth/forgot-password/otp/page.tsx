import InfoSide from "@/app/_components/pages/auth/common/InfoSide";
import OTPBottomSection from "@/app/_components/pages/auth/forgotPassword/otp/OTPBottomSection";
import OTPForm from "@/app/_components/pages/auth/forgotPassword/otp/OTPForm";

function Page() {
  return (
    <div className="grid lg:grid-cols-2 grid-cols-1 overflow-hidden">
      <div className="flex flex-col gap-[20px] items-center justify-center mx-auto w-[60%]">
        <h1 className=" font-bold text-[30px]">تأكيد رمز التحقق</h1>
        <p className=" text-gray text-center font-medium">
          تم إرسال رمز التحقق للرقم التالي
          <br />
          +9654218745268
        </p>
        {/* <OTPForm /> */}
        {/* <OTPBottomSection /> */}
      </div>
      <InfoSide />
    </div>
  );
}

export default Page;
