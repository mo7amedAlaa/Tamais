import InfoSide from "@/app/_components/pages/auth/common/InfoSide";
import SigninPage from "@/app/_components/pages/auth/signin/SigninPage";
import { UserTypes } from "@/app/types/enums";
import { Suspense } from "react";

function page() {
  return (
    <div className="absolute h-full w-full grid lg:grid-cols-2 grid-cols-1 grid-row-12">
      <Suspense>
        <SigninPage />
      </Suspense>
      <InfoSide />
    </div>
  );
}

export default page;
