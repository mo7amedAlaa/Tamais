"use client";

import Link from "next/link";
import { useServices } from "@/app/_helpers/hooks/useServices";
import { FaRegPenToSquare } from "react-icons/fa6";

const Page = () => {
  const { isLoading, error, services } = useServices();

  return (
    <section className="py-30 px-5 md:px-20">
      <p className="text-[#252525] mt-10 text-center text-[30px] font-[700]">
        {" "}
        نافذة الخدمات{" "}
      </p>

      <div className="max-w-screen-xl mx-auto px-4 text-center md:px-8">
        <div className="mt-20">
          <ul className="grid gap-20 sm:grid-cols-2 lg:grid-cols-3">
            {services?.data?.items.map((item: Item, idx: number) => (
              <Link href={`/sub-services/${item.id}`} key={idx}>
                <li
                  className="border-solid border-t-[10px] rounded-[7px] border-t-gold shadow-lg cursor-pointer hover:bg-gradient-to-b from-[#DDB762] to-[#d3ba75] transition-colors duration-300 bg-white py-10 flex flex-col justify-center items-center text-center"
                  key={idx}
                >
                  <div className="w-24 h-24 bg-white text-[#DDB762] shadow-lg rounded-full flex justify-center items-center display-icon">
                    {isLoading ? (
                      <div className="w-6 h-6 border-4 border-white border-t-[#DDB762] rounded-full animate-spin"></div>
                    ) : (
                      <FaRegPenToSquare size="30px" />
                    )}
                  </div>

                  <div className=" flex flex-col items-center mt-6">
                    <div className="text-gray-700 font-semibold sm:text-lg ">
                      <div className="flex items-center gap-2">
                        {item.name}{" "}
                      </div>
                    </div>
                    <div className="flex flex-row items-center gap-2 mb-2 mt-4">
                      <button className="text-[white] text-sm font-bold py-2 px-8 bg-[#DDB762] ">
                        {" "}
                        {item.services.length}{" "}
                      </button>
                    </div>
                  </div>
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
export default Page;
