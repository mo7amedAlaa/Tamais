import InfoSide from "@/app/_components/pages/auth/common/InfoSide";
import SignUpPage from "@/app/_components/pages/auth/signUp/SignUpPage";
import SigninPage from "@/app/_components/pages/auth/signin/SigninPage";
import React from "react";

function page() {
  return (
    <div className="absolute h-full w-full grid lg:grid-cols-2 grid-cols-1">
      <div className="flex-1 overflow-y-auto no-scrollbar">
        <SignUpPage />
      </div>
      <InfoSide />
    </div>
  );
}

export default page;
