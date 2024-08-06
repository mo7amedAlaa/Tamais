import React from "react";
import { IoIosArrowForward, IoIosArrowUp } from "react-icons/io";
import { RiArrowRightSLine } from "react-icons/ri";

function RotatedBottomRightArrow({ className }: { className?: string }) {
  return (
    <div className={className}>
      <IoIosArrowForward
        fontWeight={500}
        size={32.5}
        className=" text-white text-[32.5px] rotate-45"
      />
    </div>
  );
}

export default RotatedBottomRightArrow;
