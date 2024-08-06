import React from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";

function PopupMenu({
  setIsPopupOpen,
}: {
  setIsPopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className=" fixed top-0 right-0 bg-blue w-full h-screen flex flex-col gap-[25px] text-white">
      <IoIosCloseCircleOutline
        onClick={() => setIsPopupOpen(false)}
        className="cursor-pointer"
        size={30}
      />
      <ul className=" flex flex-col text-center  gap-[10px] font-medium">
        <li className="mx-3 cursor-pointer bg-blue text-white rounded-full px-[30px] py-[8px]">
          الرئيسية
        </li>
        <li className="mx-3 cursor-pointer">من نحن</li>
        <li className="mx-3 cursor-pointer">اتصل بنا</li>
        <li className="mx-3 cursor-pointer">الدعم الفني </li>
        <li className="mx-3 cursor-pointer">أرقام التشغيل</li>
        <li className="mx-3 cursor-pointer">سياسة الخصوصية</li>
      </ul>
    </div>
  );
}

export default PopupMenu;
