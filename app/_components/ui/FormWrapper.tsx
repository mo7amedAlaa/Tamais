import React, { ReactNode } from "react";
import Stepper from "./Stepper";

type FormWrapperProps = {
  children: ReactNode;
  title: string;
};

const FormWrapper = ({ children, title }: FormWrapperProps) => {
  return (
    <div>
      <p className="text-[#252525] mx-0 text-center text-[20px] font-[700]">
        {title}
      </p>
      {children}
    </div>
  );
};

export default FormWrapper;
