"use client";
import { SecondFormProps } from "@/app/_api/interfaces/Profile";
import {
  useGetCountries,
  useGetNationalities,
} from "@/app/_helpers/hooks/useLawyerGeneralData";
import React, { useState } from "react";
import { FaLocationArrow } from "react-icons/fa6";

const SecondForm = ({
  country,
  city,
  region,
  lawyerNationality,
  longitude,
  latitude,
  setFormData,
  updateFields,
}: SecondFormProps) => {
  const { countries } = useGetCountries();
  const { nationality } = useGetNationalities();
  const [getLocationButtonDisabled, setGetLocationButtonDisabled] =
    useState(false);

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const longitudeNum = position.coords.longitude.toString();
        const latitudeNum = position.coords.latitude.toString();

        setFormData((prev: any) => ({
          ...prev,
          longitude: longitudeNum,
          latitude: latitudeNum,
        }));

        setGetLocationButtonDisabled(true);

        console.log(longitudeNum, latitudeNum);
      });
    }
  }

  const selectedCountry = countries?.data?.Countries?.find(
    (c) => c.id === parseInt(country),
  );
  const selectedRegion = selectedCountry?.regions?.find(
    (r) => r.id === parseInt(region),
  );

  return (
    <>
      <div className="w-full flex flex-col gap-4 mb-4">
        <select
          name="lawyerNationality"
          value={lawyerNationality}
          onChange={updateFields}
          className="w-full px-2 py-1 outline-[#DDB762] text-[#696F79] border border-gray-300 rounded"
        >
          <option disabled value="">
            الجنسية
          </option>
          {nationality?.data?.nationalities?.map((n) => (
            <option key={n.id} value={n.id}>
              {n.name}
            </option>
          ))}
        </select>

        <select
          name="country"
          value={country}
          onChange={updateFields}
          className="w-full px-2 py-1 outline-[#DDB762] text-[#696F79] border border-gray-300 rounded"
        >
          <option disabled value="">
            {" "}
            الدولة{" "}
          </option>
          {countries?.data?.Countries?.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        {selectedCountry && selectedCountry?.regions?.length > 0 && (
          <select
            name="region"
            value={region}
            onChange={updateFields}
            className="w-full px-2 py-1 outline-[#DDB762] text-[#696F79] border border-gray-300 rounded"
          >
            <option disabled value="">
              المدينة
            </option>
            {selectedCountry?.regions?.map((region) => (
              <option key={region.id} value={region.id}>
                {region.name}
              </option>
            ))}
          </select>
        )}

        {selectedRegion && selectedRegion?.cities?.length > 0 && (
          <select
            name="city"
            value={city}
            onChange={updateFields}
            className="w-full px-2 py-1 outline-[#DDB762] text-[#696F79] border border-gray-300 rounded"
          >
            <option disabled value="">
              المدينة
            </option>
            {selectedRegion?.cities?.map((c) => (
              <option key={c.id} value={c.id}>
                {c.title}
              </option>
            ))}
          </select>
        )}

        <button
          onClick={getLocation}
          disabled={getLocationButtonDisabled}
          className="bg-blue group flex disabled:justify-center justify-between items-center  relative font-medium w-full  text-white  rounded-lg p-[15px] text-[18px] disabled:bg-green-500"
        >
          <p>
            {getLocationButtonDisabled
              ? "تم اختيار الموقع بنجاح"
              : "اختر الموقع"}
          </p>
          <FaLocationArrow className="block group-disabled:hidden" />
        </button>
      </div>
    </>
  );
};

export default SecondForm;
