"use client";
import React from "react";
import { AiOutlineMenu } from "react-icons/ai";
import PopupMenu from "./PopupMenu";

function Menu() {
  const [isPopupOpen, setIsPopupOpen] = React.useState(false);
  return (
    <div>
      <AiOutlineMenu
        onClick={() => setIsPopupOpen(!isPopupOpen)}
        className=" cursor-pointer"
        size={25}
      />
      {isPopupOpen && <PopupMenu setIsPopupOpen={setIsPopupOpen} />}
    </div>
  );
}

export default Menu;
