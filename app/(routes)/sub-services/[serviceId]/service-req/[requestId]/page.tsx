"use client";

import { serviceRequest } from "@/app/_api/queries/service.query";

import { useServices } from "@/app/_helpers/hooks/useServices";
import { useMutation } from "@tanstack/react-query";
import { ChangeEvent, Suspense, useEffect, useState } from "react";
import { FaCircleCheck } from "react-icons/fa6";

export interface FormDataState {
  level: string;
  content: string;
  attachments: File | null;
}

const Page = ({ params }: { params: Params }) => {
  const [formData, setFormData] = useState<FormDataState>({
    level: "",
    content: "",
    attachments: null,
  });
  const [fileSelected, setFileSelected] = useState(false);
  const [responseData, setResponseData] = useState<any>(null);
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const { isLoading, error, services } = useServices();
  const data = services?.data.items.find(
    (item: Item) => item.id === parseInt(params.serviceId),
  );
  const serviceId = data?.id;

  const {
    mutate: userServiceRequest,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: () => serviceRequest(serviceId, formData),
    onSuccess: (data) => {
      console.log(data);
      setResponseData(data);
    },
    onError: (err) => console.log(err),
  });

  useEffect(() => {
    if (responseData) {
      console.log("Response data changed:", responseData);
      window.location.href = responseData?.data?.payment_url;
    }
  }, [responseData]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsButtonClicked(true);
    try {
      const data = await userServiceRequest();
      setResponseData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteFile = () => {
    const fileInput = document.getElementById(
      "dropzone-file",
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }

    setFileSelected(false);
  };

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ): void => {
    const { name, value } = event.target;

    let files: FileList | null = null;
    if (
      event.target instanceof HTMLInputElement &&
      event.target.type === "file"
    ) {
      files = event.target.files;
    }
    if (name === "attachments" && files && files.length > 0) {
      setFormData((prevData) => ({
        ...prevData,
        attachments: files[0],
      }));
      setFileSelected(true);
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  return (
    <main className="py-30">
      <div className="max-w-[896px] mx-auto px-4 text-gray-600 md:px-8">
        <p className="text-[#252525] mt-10 text-start text-[30px] font-[700]">
          {" "}
          الملكية الفكرية
        </p>
        <div className="mt-8 max-w-full mx-auto">
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="font-medium text-[#696F79] text-[16px]">
                مستوى الطلب
              </label>
              <select
                className="text-sm text-[#9D9D9E] mt-2 w-full border bg-white p-3 pl-5 border-none rounded-lg h-full outline-none"
                name="level"
                onChange={handleChange}
                value={formData.level}
              >
                {data?.services?.map((service: any) => {
                  return (
                    service.ymtaz_levels_prices &&
                    service.ymtaz_levels_prices.map((priceData: any) => (
                      <option key={priceData.id} value={priceData.level.id}>
                        {priceData.level.name} - {priceData.price}
                      </option>
                    ))
                  );
                })}
              </select>
            </div>
            <div>
              <label className="font-medium text-[#696F79] text-[16px]">
                محتوى الطلب
              </label>
              <textarea
                placeholder="اكتب رسالتك هنا"
                required
                className="w-full mt-2 h-36 outline-[#DDB762] px-3 py-2 resize-none appearance-none bg-white border-none shadow-sm rounded-lg"
                name="content"
                onChange={handleChange}
                value={formData.content}
              ></textarea>
            </div>
            <div>
              <label className="block text-[16px] text-[#696F79]">
                المرفقات
              </label>

              <label className="flex flex-col cursor-pointer items-center w-full  p-6 mx-auto mt-2 text-center bg-white border-none  rounded-xl">
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  name="attachments"
                  onChange={handleChange}
                />
                {fileSelected ? (
                  <>
                    <div className="text-[20px] text-[#696F79] p-8 flex items-center gap-4">
                      {" "}
                      تم ارفاق الملف بنجاح
                      <span className="text-green-500">
                        <FaCircleCheck size="25px" />
                      </span>{" "}
                    </div>
                    <button
                      onClick={handleDeleteFile}
                      className="text-[#696F79] hover:text-red-500"
                    >
                      حذف الملف
                    </button>
                  </>
                ) : (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-12 h-12 text-[#9D9D9E]"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                      />
                    </svg>
                    <h2 className="mt-1 font-medium tracking-wide text-[14px] text-[#9D9D9E]">
                      مرفقات الطلب (اختياري)
                    </h2>
                  </>
                )}
              </label>
            </div>
            <div className="w-full text-center">
              <button
                type="submit"
                className={`w-[50%] mt-6 py-4 text-[16px] text-white text-center  ${
                  isButtonClicked || isPending
                    ? "bg-[#6d6a64]"
                    : "bg-[#DDB762] hover:#e9ca86"
                } font-medium rounded-[6px] duration-150`}
                disabled={isButtonClicked || isPending}
              >
                {isButtonClicked ? (
                  " تم الطلب بنجاح"
                ) : isPending ? (
                  <div className="w-6 h-6 mx-auto border-4 border-white border-t-[#DDB762] rounded-full animate-spin"></div>
                ) : (
                  "تأكيد الطلب"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Page;
