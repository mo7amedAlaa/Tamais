import { API_ENDPOINTS } from "@/app/_helpers/config/constants";
import { defaultAPI } from "../axios";

/*
export const clientForgotPasswordEmail = async (body: {
  credential: string;
}) => {
  const { data } = await defaultAPI.post(
    API_ENDPOINTS.CLIENT_FORGOT_PASSWORD_EMAIL,
    { ...body, type: 1 },
  );
  return data;
};

export const lawyerForgotPasswordEmail = async (body: {
  credential: string;
}) => {
  const { data } = await defaultAPI.post(
    API_ENDPOINTS.LAWYER_FORGOT_PASSWORD_EMAIL,
    body,
  );
  return data;
};
*/

export const LawyerForgetPassFirstRequest = async (email: string) => {
  let body = new FormData();

  body.append("email", email);

  try {
    const { data } = await defaultAPI.post(
      API_ENDPOINTS.LAWYER_FORGOT_PASSWORD_EMAIL,
      body,
    );
    return data;
  } catch (error) {
    console.error("Error in the Lawyer Email request:", error);
    throw error;
  }
};
export const ClientForgetPassFirstRequest = async (email: string) => {
  let body = new FormData();

  body.append("credential", email);
  body.append("type", "1");

  try {
    const { data } = await defaultAPI.post(
      API_ENDPOINTS.CLIENT_FORGOT_PASSWORD_EMAIL,
      body,
    );
    return data;
  } catch (error) {
    console.error("Error in the Lawyer Email request:", error);
    throw error;
  }
};

export const LawyerPasswordReset = async (
  password: string,
  confirmPassword: string,
  otp: string,
) => {
  let body = new FormData();

  body.append("password", password);
  body.append("password_confirmation", confirmPassword);
  body.append("code", otp);
  try {
    const { data } = await defaultAPI.post(
      API_ENDPOINTS.LAWYER_RESET_PASSWORD,
      body,
    );
    return data;
  } catch (error) {
    console.error("Error in the Reset Password request:", error);
    throw error;
  }
};
export const ClientPasswordReset = async (
  password: string,
  confirmPassword: string,
  OTP: string,
) => {
  let body = new FormData();

  body.append("password", password);
  body.append("password_confirmation", confirmPassword);
  body.append("code", OTP);

  try {
    const { data } = await defaultAPI.post(
      API_ENDPOINTS.CLIENT_RESET_PASSWORD,
      body,
    );
    return data;
  } catch (error) {
    console.error("Error in the Reset Password request:", error);
    throw error;
  }
};

export const LawyerForgetPasswordVerificationCode = async (
  OTP: string,
  email: string,
) => {
  let body = new FormData();

  body.append("code", OTP);
  body.append("credential", email);

  try {
    const { data } = await defaultAPI.post(
      API_ENDPOINTS.LAWYER_FORGET_PASS_VERIFYCODE,
      body,
    );
    return data;
  } catch (error) {
    console.error("Error in the Lawyer Verify Code:", error);
    throw error;
  }
};

export const ClientForgetPasswordVerificationCode = async (
  OTP: string,
  email: string,
) => {
  let body = new FormData();

  body.append("code", OTP);
  body.append("credential", email);

  try {
    const { data } = await defaultAPI.post(
      API_ENDPOINTS.CLIENT_FORGET_PASS_VERIFYCODE,
      body,
    );
    return data;
  } catch (error) {
    console.error("Error in the Client Verify Code:", error);
    throw error;
  }
};
