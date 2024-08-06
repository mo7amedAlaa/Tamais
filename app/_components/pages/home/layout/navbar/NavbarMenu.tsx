import Link from "next/link";
import React from "react";

function NavbarMenu() {
  return (
    <ul className="lg:flex hidden items-center justify-between text-blue font-medium">
      <Link href="/home">
        <li className="mx-3 cursor-pointer bg-blue text-white rounded-full px-[30px] py-[8px]">
          الرئيسية
        </li>
      </Link>
      <li className="mx-3 cursor-pointer">من نحن</li>
      <li className="mx-3 cursor-pointer">اتصل بنا</li>
      <li className="mx-3 cursor-pointer">الدعم الفني </li>
      <li className="mx-3 cursor-pointer">أرقام التشغيل</li>
      <li className="mx-3 cursor-pointer">سياسة الخصوصية</li>
    </ul>
  );
}

export default NavbarMenu;
