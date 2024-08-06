"use client";
import { UserTypes } from "@/app/types/enums";
import Link from "next/link";
import { FaArrowLeft, FaGavel, FaUser } from "react-icons/fa";

// Define the Pentagon component
const Pentagon = ({ size, type }: { size: any; type: any }) => {
  const radius = size / 2;
  const angle = (Math.PI * 2) / 5; // Angle between points

  // Calculate the coordinates of each point of the pentagon
  const points = Array.from({ length: 5 }).map((_, index) => ({
    x: radius + radius * Math.sin(index * angle),
    y: radius - radius * Math.cos(index * angle),
  }));

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="fill-gold"
      xmlns="http://www.w3.org/2000/svg"
      style={{ position: "relative" }}
    >
      <polygon
        points={points.map((p) => `${p.x},${p.y}`).join(" ")}
        className="z-0"
      />
      {type === UserTypes.LAWYER ? (
        <FaGavel
          className="text-white text-[26px]"
          x={radius - 12}
          y={radius - 12}
        />
      ) : (
        <FaUser
          className="text-white text-[26px]"
          x={radius - 12}
          y={radius - 12}
        />
      )}
    </svg>
  );
};

// Define the UserTypeSelectionBox component
const UserType = ({
  title,
  description,
  type,
}: {
  title: string;
  description: string;
  type: string;
}) => {
  return (
    <Link href={`/auth/forgetPassword?userType=${type}`}>
      <div className="flex hover:cursor-pointer p-4 gap-2 border border-white hover:border-[#f4e9ce] rounded-lg drop-shadow-2 w-5/6 items-center justify-center bg-white hover:bg-[#f4e9ce]">
        <Pentagon size={66} type={UserTypes.CLIENT} />
        <div className="flex flex-col w-3/4">
          <p className="text-blue font-bold">{title}</p>
          <p className="text-[#8692A6]">{description}</p>
        </div>
        <FaArrowLeft className="text-gold" />
      </div>
    </Link>
  );
};

export default UserType;
