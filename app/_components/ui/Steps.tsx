'use client'
import { useState } from "react";
import { TiTick } from "react-icons/ti";
const Stepper = () => {
    const steps = ["قيد النتظار", "قيد الدراسة", "مكتملة"];
    const [currentStep, setCurrentStep] = useState(2);
    const [complete, setComplete] = useState(false);
    return (
        <>
            <div className="flex justify-between w-full">
                {steps?.map((step, i) => (
                    <div
                        key={i}
                        className={`step-item ${currentStep === i + 1 && "active"} ${(i + 1 < currentStep || complete) && "complete"
                            } `}
                    >
                        <div className="step" >
                            {i + 1 < currentStep || complete ? <TiTick size={24} /> : i + 1}
                        </div>
                        <p className="text-gray-500">{step}</p>
                    </div>
                ))}
            </div>

        </>
    );
};

export default Stepper;