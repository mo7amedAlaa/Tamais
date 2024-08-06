import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ACCESS_TOKEN, PROFILE_TYPE } from "../config/constants";
import Cookies from "js-cookie";
import { UserTypes } from "@/app/types/enums";
import { clientProfile, lawyerProfile } from "@/app/_api/queries/profile.query";
import { UserProfileResponse } from "@/app/_api/interfaces/UserProfileResponse";
import {
  LawyerSignin,
  LawyerSigninResponse,
} from "@/app/_api/interfaces/SigninResponses";
const fetchUserProfile = async () => {
  const profileType = Cookies.get(PROFILE_TYPE);

  let response;
  let data;
  if (profileType == UserTypes.CLIENT) {
    response = await clientProfile();
    if (response.status === 200) {
      return response.data.data.client;
    } else {
      throw new Error("Unable to fetch profile data");
    }
  } else {
    response = await lawyerProfile();
    if (response.status === 200) {
      return response.data.data.lawyer;
    } else {
      throw new Error("Unable to fetch profile data");
    }
  }
};

const useUserProfile = () => {
  return useQuery<UserProfileResponse>({
    queryKey: ["profile"],
    queryFn: fetchUserProfile,
  });
};

export default useUserProfile;
