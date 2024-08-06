"use client";
import { UserTypes } from "@/app/types/enums";
import React from "react";
import UserType from "./UserType";

function UserSelection() {
  return (
    <div className="flex flex-col gap-6 items-center">
      <UserType
        title={"عميل"}
        description={
          "طالبي الخدمات والاستشارات القانونية فى التخصصات القانونية المختلفة"
        }
        type={UserTypes.CLIENT}
      />
      <UserType
        title={"مقدم خدمة"}
        description={
          "محامين مؤهلين و خبراء قانونيين ذوي خبرة في التخصصات القانونية المختلفة"
        }
        type={UserTypes.LAWYER}
      />
    </div>
  );
}

export default UserSelection;
