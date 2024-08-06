"use client";
import { cn } from "@/app/_helpers/functions/cn";
import React, { use } from "react";

export default function MainButton({
  className,
  children,
  type,
  disabled,
  loading,
  buttonClassName,
  isLoading,
  onClick,
  ...rest
}: React.HTMLAttributes<HTMLButtonElement> & {
  type?: "button" | "submit" | "reset" | undefined;
  buttonClassName?: string;
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  isLoading?: boolean;
}) {
  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={cn(
        "bg-gold font-medium w-full  text-white  rounded-lg p-[15px] text-[18px]",
        disabled && "bg-gray",
        className,
      )}
    >
      {isLoading ? (
        <div className="flex items-center gap-[5px] justify-center mx-auto">
          <div className="animate-spin rounded-full h-[32px] w-[32px] border-b-2 border-white  dark:border-primary"></div>
          loading
        </div>
      ) : (
        children
      )}
    </button>
  );
}
