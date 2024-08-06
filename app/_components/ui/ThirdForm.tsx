import React, { useEffect, useState } from "react";
import { useLawyerDegree } from "@/app/_helpers/hooks/useLawyerDegree";
import { useAccurateData } from "@/app/_helpers/hooks/useAccurateData";
import { useLawyerData } from "@/app/_helpers/hooks/useLawyerData";
import { FaCircleCheck, FaPlus, FaTrash } from "react-icons/fa6";
import {
  DigitalGuideCategory,
  useLawyerFunctionalCases,
  useLawyerSection,
} from "@/app/_helpers/hooks/useLawyerGeneralData";
import MultiSelectDropdown from "./MultiSelectDropdown";
import SelectGroup from "../pages/auth/common/SelectGroup";
import { ThirdFormProps } from "@/app/_api/interfaces/Profile";

const ThirdForm = ({
  degree,
  accurateSpeciality,
  generalSpeciality,

  idType,
  lawyerSection,
  setFormData,
  idNumber,
  functionalCase,
  licensesNum,
  degreeCertificateFile,

  updateFields,
  selectuserIdFile,
  selectLicensesNumFile,
  selectDegreeCertificateFile,
  setSelectUserIdFile,
  setSelectLicensesNumFile,
  setSelectDegreeCertificateFile,
}: ThirdFormProps) => {
  const { lawyerDegree } = useLawyerDegree();
  const { lawyerAccurateData } = useAccurateData();
  const { generalSpecialties } = useLawyerData();
  const { functionalCases } = useLawyerFunctionalCases();
  const { lawyerSections } = useLawyerSection();
  const [availableSections, setAvailableSections] = useState<
    DigitalGuideCategory[]
  >([]);
  useEffect(() => {
    setAvailableSections(lawyerSections?.data?.DigitalGuideCategories || []);
  }, [lawyerSections]);
  const [selectedSection, setSelectedSection] = useState("");
  useEffect(() => {
    console.log(
      availableSections.find(
        (section) => section.id.toString() == selectedSection,
      ),
    );
  }, [selectedSection]);
  useEffect(() => console.log("ls", lawyerSection), [lawyerSection]);
  const [sectionLicenseNo, setSectionLicenseNo] = useState("");
  const [sectionLicenseFile, setSectionLicenseFile] = useState<File | null>(
    null,
  );
  const handleDeleteFile = (
    fileInputId: string,
    setState: React.Dispatch<React.SetStateAction<boolean>>,
  ) => {
    const fileInput = document.getElementById(fileInputId);

    if (fileInput instanceof HTMLInputElement) {
      fileInput.value = "";
    }
    setState(false);
  };

  console.log(lawyerSections?.data?.DigitalGuideCategories);

  return (
    <>
      <div className="w-full flex flex-col gap-4 mb-4">
        <input
          name="idNumber"
          value={idNumber}
          onChange={updateFields}
          placeholder="رقم الهوية"
          className="w-full text-[#696F79] px-2 py-2 border border-gray-300 rounded outline-[#DDB762]"
        />

        <label className="flex flex-col cursor-pointer items-center w-full p-6 mx-auto mt-2 text-center bg-white border border-[#8692A6] outline-[text-gold] rounded-xl">
          <input
            type="file"
            className="hidden"
            name="userIdFile"
            onChange={updateFields}
          />
          {selectuserIdFile ? (
            <>
              <div className="text-[20px] text-[#696F79] p-8 flex items-center gap-4">
                تم ارفاق الملف بنجاح
                <span className="text-green-500">
                  <FaCircleCheck size="25px" />
                </span>
              </div>
              <button
                onClick={() =>
                  handleDeleteFile("userIdFile", setSelectUserIdFile)
                }
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
                ارفاق نسخة الهوية
              </h2>
            </>
          )}
        </label>

        <select
          name="functionalCase"
          value={functionalCase}
          onChange={updateFields}
          className="w-full px-2 py-1 outline-[#DDB762] text-[#696F79] border border-gray-300 rounded"
          required
        >
          <option value=""> الحالات الوظيفية</option>
          {functionalCases?.data?.FunctionalCases?.map((user) => (
            <option key={user.id} value={user.id}>
              {user.title}
            </option>
          ))}
        </select>

        {/* <MultiSelectDropdown
          options={
            lawyerSections?.data?.DigitalGuideCategories?.map((user) => ({
              id: user.id,
              title: user.title,
            })) ?? []
          }
          selectedOptions={lawyerSection?.map((id) => id)}
          setSelectedOptions={(selectedOptions) =>
            updateFields({
              target: {
                name: "lawyerSection",
                value: selectedOptions?.map((id) => id.toString()),
              },
            })
          }
        /> */}

        {/* {lawyerSection &&
          lawyerSections?.data?.DigitalGuideCategories?.find(
            (d) => d.id === parseInt(lawyerSection)
          )?.need_license === 1 && (
            <>
              <input
                name="licensesNum"
                value={licensesNum}
                onChange={updateFields}
                placeholder="رقم الترخيص"
                className="w-full text-[#696F79] px-2 py-2 border border-gray-300 rounded outline-[#DDB762]"
                required
              />

              <label
                htmlFor="dropzone-file"
                className="flex flex-col cursor-pointer items-center w-full p-6 mx-auto mt-2 text-center bg-white border border-[#8692A6] outline-[text-gold] rounded-xl"
              >
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  onChange={updateFields}
                  name="licensesNumFile"
                />
                {selectLicensesNumFile ? (
                  <>
                    <div className="text-[20px] text-[#696F79] p-8 flex items-center gap-4">
                      تم ارفاق الملف بنجاح
                      <span className="text-green-500">
                        <FaCircleCheck size="25px" />
                      </span>
                    </div>
                    <button
                      onClick={() =>
                        handleDeleteFile(
                          "licensesNumFile",
                          setSelectLicensesNumFile
                        )
                      }
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
                      ارفاق نسخة من ملف رقم الترخيص
                    </h2>
                  </>
                )}
              </label>
            </>
          )} */}
        <table
          className="w-full table-auto overflow-scroll bg-white shadow-md rounded-lg borded border-black "
          style={{ direction: "rtl" }}
        >
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th
                scope="col"
                className="px-4 py-2 border border-gray-300 h-full"
              >
                المهنة
              </th>
              <th
                scope="col"
                className="px-4 py-2 border border-gray-300 h-full"
              >
                المهنة تحتاج ترخيص
              </th>
              <th
                scope="col"
                className="px-4 py-2 border border-gray-300 h-full"
              >
                رقم الترخيص
              </th>
              <th
                scope="col"
                className="px-4 py-2 border border-gray-300 h-full"
              >
                ملف الترخيص
              </th>
              <th
                scope="col"
                className="px-4 py-2 border border-gray-300 h-full"
              >
                عمليات
              </th>
            </tr>
          </thead>
          <tbody>
            {lawyerSection.map((section: any) => (
              <tr key={section.id} className="bg-gray-100">
                <td className="text-center px-4 py-2 border border-gray-300 h-full">
                  {section.title}
                </td>

                {section.need_license == 1 ? (
                  <td className="text-center px-4 py-2 border border-gray-300 h-full">
                    تحتاج ترخيص
                  </td>
                ) : (
                  <td className="text-center px-4 py-2 border border-gray-300 h-full">
                    لا تحتاج ترخيص
                  </td>
                )}
                <td className="text-center px-4 py-2 border border-gray-300 h-full">
                  {section.lawyer_license_no}
                </td>
                <td className="text-center px-4 py-2 border border-gray-300 h-full">
                  {section.lawyer_license_file ? (
                    <a
                      className={`flex w-full justify-center rounded bg-gold p-3 font-medium text-white hover:bg-opacity-90`}
                      href={section.lawyer_license_file}
                      target="_blank"
                    >
                      عرض الملف
                    </a>
                  ) : (
                    <div
                      className={`flex w-full justify-center rounded bg-gray p-3 font-medium text-white hover:bg-opacity-90`}
                    >
                      لا يوجد ملف
                    </div>
                  )}
                </td>
                <td className="text-center px-4 py-6 border-l border-b border-gray-300 flex items-center h-full justify-center">
                  <FaTrash
                    onClick={() => {
                      setAvailableSections((prev) => [
                        ...prev,
                        lawyerSections?.data?.DigitalGuideCategories?.find(
                          (ls) => ls.id == section.id,
                        )!,
                      ]);
                      setFormData((prev: any) => ({
                        ...prev,
                        lawyerSection: prev.lawyerSection.filter(
                          (sec: any) => sec.id != section.id,
                        ),
                      }));
                    }}
                    className="text-red-500 hover:cursor-pointer"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex items-center gap-6 mt-6.5 flex-col ">
          <div className="w-full">
            <SelectGroup
              options={availableSections!}
              title={"الحالة المهنية (يمكنك اضافة اكثر من مهنة)"}
              selectedOption={selectedSection}
              setSelectedOption={setSelectedSection}
            />
          </div>
          {availableSections?.find(
            (section) => section.id.toString() == selectedSection,
          )?.need_license == 1 && (
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex flex-col w-1/2">
                <label className="mb-2.5">الترخيص</label>
                <input
                  type="number"
                  placeholder="الترخيص"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter "
                  value={sectionLicenseNo}
                  onChange={(e) => {
                    setSectionLicenseNo(e.target.value);
                  }}
                />
              </div>
              <div className="flex flex-col w-1/2">
                <label className="mb-2.5">ملف الترخيص</label>
                <input
                  type="file"
                  accept=".png ,.jpg ,.jpeg ,.PNG ,.JPG, .JPEG, .pdf"
                  onChange={(e) => setSectionLicenseFile(e.target.files![0])}
                />
              </div>
            </div>
          )}
          <button
            disabled={
              selectedSection == "" ||
              (availableSections?.find(
                (section) => section.id.toString() == selectedSection,
              )?.need_license == 1 &&
                (sectionLicenseNo.trim() == "" || sectionLicenseFile == null))
            }
            className={`bg-gold p-2 mt-3.5 text-white`}
            onClick={() => {
              setAvailableSections((prev) =>
                prev?.filter((s) => s.id.toString() !== selectedSection),
              );

              setFormData((prev: any) => ({
                ...prev,
                lawyerSection: [
                  ...prev.lawyerSection,
                  {
                    ...availableSections?.find(
                      (section) => section.id.toString() == selectedSection,
                    ),
                    lawyer_license_no: sectionLicenseNo,
                    lawyer_license_file:
                      sectionLicenseFile != null
                        ? URL.createObjectURL(sectionLicenseFile)
                        : null,
                  },
                ],
              }));
              setSelectedSection("");
              setSectionLicenseFile(null);
              setSectionLicenseNo("");
            }}
          >
            <FaPlus />
          </button>
        </div>
        {/* {errors.sections && (
                    <p className="text-red">{errors.sections}</p>
                  )} */}
        <select
          name="degree"
          value={degree}
          onChange={updateFields}
          className="w-full px-2 py-1 outline-[#DDB762] text-[#696F79] border border-gray-300 rounded"
          required
        >
          <option value="">الدرجة العلمية</option>
          {lawyerDegree?.data?.Degrees?.map((degree) => (
            <option key={degree.id} value={degree.id}>
              {degree.title}
            </option>
          ))}
        </select>

        {degree &&
          lawyerDegree?.data?.Degrees?.find((d) => d.id === parseInt(degree))
            ?.need_certificate === 1 && (
            <label className="flex flex-col cursor-pointer items-center w-full p-6 mx-auto mt-2 text-center bg-white border border-[#8692A6] outline-[text-gold] rounded-xl">
              <input
                type="file"
                className="hidden"
                name="degreeCertificateFile"
                onChange={updateFields}
              />
              {selectDegreeCertificateFile ? (
                <>
                  <div className="text-[20px] text-[#696F79] p-8 flex items-center gap-4">
                    تم ارفاق الملف بنجاح
                    <span className="text-green-500">
                      <FaCircleCheck size="25px" />
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      handleDeleteFile(
                        "degree",
                        setSelectDegreeCertificateFile,
                      );
                    }}
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
                    ارفاق ملف الدرجة العلمية (الزامي)
                  </h2>
                </>
              )}
            </label>
          )}

        <select
          name="generalSpeciality"
          value={generalSpeciality}
          onChange={updateFields}
          className="w-full px-2 py-1 outline-[#DDB762] border text-[#696F79] border-gray-300 rounded"
          required
        >
          <option value="">التخصص العام</option>
          <option value="">الدرجة العلمية</option>

          {generalSpecialties?.data?.GeneralSpecialty?.map((item) => (
            <option key={item.id} value={item.id}>
              {item.title}
            </option>
          ))}
        </select>

        <select
          name="accurateSpeciality"
          value={accurateSpeciality}
          onChange={updateFields}
          className="w-full px-2 py-1 outline-[#DDB762] border text-[#696F79] border-gray-300 rounded"
          required
        >
          <option value="">التخصص الدقيق</option>
          {lawyerAccurateData?.data?.AccurateSpecialty?.map((item) => (
            <option key={item.id} value={item.id}>
              {item.title}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default ThirdForm;
