import { API_ENDPOINTS } from "@/app/_helpers/config/constants";
import { defaultAPI } from "../axios";

export const getNewAdvisories = async () => {
  const { data, status } = await defaultAPI.get(
    API_ENDPOINTS.FETCH_NEW_ADVISORIES,
  );
  return data.data.newAdvisories;
};
