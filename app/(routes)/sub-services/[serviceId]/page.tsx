"use client";

import Link from "next/link";
import { FaRegPenToSquare } from "react-icons/fa6";
import { useServices } from "@/app/_helpers/hooks/useServices";

const Page = ({ params }: { params: Params }) => {
  console.log(params);

  const { isLoading, error, services } = useServices();

  const filteredItems = services?.data.items.filter(
    (item: Item) => item.id === parseInt(params.serviceId),
  );

  return (
    <section className="py-30 px-5 md:px-20">
      {isLoading ? (
        <div className="absolute inset-0 flex justify-center items-center bg-[#f7dfac] backdrop-blur-sm ">
          <div className="w-20 h-20 border-4 border-white border-t-[#DDB762] rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          <p className="text-[#252525] mt-10 text-center text-[30px] font-[700]">
            {" "}
            خدماتي{" "}
          </p>

          <div className="max-w-screen-xl mx-auto px-4 text-center md:px-8">
            <div className="mt-20">
              <ul className="grid gap-20 sm:grid-cols-2 lg:grid-cols-3">
                {filteredItems?.map((item: Item, idx: number) =>
                  item.services?.map((service: Service, serviceIdx: number) => (
                    <Link
                      href={`/sub-services/${item.id}/service-req/${item.id}`}
                      key={serviceIdx}
                    >
                      <li
                        className="border-solid border-t-[10px] rounded-[7px] border-t-[#DDB762] shadow-lg cursor-pointer hover:bg-gradient-to-b from-[#DDB762] to-[#d3ba75] bg-white py-10 flex flex-col justify-center items-center text-center"
                        key={serviceIdx}
                      >
                        <div className="w-24 h-24 bg-white text-[#DDB762] shadow-lg rounded-full flex justify-center items-center display-icon">
                          {isLoading ? (
                            <div className="w-6 h-6 border-4 border-white border-t-[#DDB762] rounded-full animate-spin"></div>
                          ) : (
                            <FaRegPenToSquare size="30px" />
                          )}
                        </div>

                        <div className="flex flex-col items-center mt-6">
                          <div className="text-gray-700 font-semibold sm:text-lg">
                            <div className="flex items-center gap-2">
                              {service.title}
                            </div>
                          </div>
                        </div>
                      </li>
                    </Link>
                  )),
                )}
              </ul>
            </div>
          </div>
        </>
      )}
    </section>
  );
};
export default Page;
