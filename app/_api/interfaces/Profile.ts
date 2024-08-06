import { Section } from "./UserProfileResponse";

export type shortLawyer = {
  id: number;
  name: string;
  photo: string;
  city: number;
  city_rel: {
    id: number;
    title: string;
  };
};
export type UserData = {
  city: { id: number; title: string };
  country: { id: number; name: string };
  email: string;
  gender: string;
  id: number;
  image: string;
  latitude: string;
  longitude: string;
  mobile: string;
  name: string;
  nationality: { id: number; name: string };
  phone_code: string;
  region: { id: number; name: string };
  token: null;
  type: number;
};

export type DeleteProfileParams = {
  id: number;
  otherField: any;
};

export type LawyerFormData = {
  discription: string;
  day: string;
  month: string;
  year: string;
  gender: string;
  degree: string;
  accurateSpeciality: string;
  generalSpeciality: string;
  city: string;
  district: string;
  region: string;
  section: string;
  country: string;
  idType: string;
  idNumber: string;
  lawyerSection: {
    id: string;
    section: Section;
    section_id: string;
    sectionLicenseNo: string;
    secondLicenseFile: any;
  }[];
  lawyerNationality: string;
  functionalCase: string;
  lawyerType: string;

  userCvFile: File | null;
  companyLicensesFile: File | null;

  userIdFile: File | null;
  licensesNumFile: File | null;
  degreeCertificateFile: File | null;

  imageFile: File | null;
  logoFile: File | null;

  companyName: string;
  companyId: string;
  licensesNum: string;

  firstName: string;
  secondName: string;
  thirdName: string;
  forthName: string;
  phoneNum: string;
  phoneCode: string;
  email: string;
  password: string;
  confirmPassword: string;

  longitude: string;
  latitude: string;
  needLicencesFile: string;
  needLicencesNum: string;
  needCompanyName: string;
};

export type FirstFormProps = {
  discription: string;
  day: string;
  month: string;
  year: string;
  gender: string;
  degree: string;
  accurateSpeciality: string;
  generalSpeciality: string;
  userCvFile: File | null;
  companyLicensesFile: File | null;
  companyName: string;
  companyId: string;
  lawyerType: string;
  formRef: React.RefObject<HTMLFormElement>;
  updateFields: (
    e: React.ChangeEvent<
      HTMLTextAreaElement | HTMLSelectElement | HTMLInputElement
    >,
  ) => void;
  selectUserCvFile: boolean;
  setSelectUserCvFile: React.Dispatch<React.SetStateAction<boolean>>;
  selectCompanyLicensesFile: boolean;
  setSelectCompanyLicensesFile: React.Dispatch<React.SetStateAction<boolean>>;
  needLicencesFile: string;
  needLicencesNum: string;
  needCompanyName: string;
};

export type SecondFormProps = {
  country: string;
  setFormData: any;
  lawyerNationality: string;
  city: string;
  region: string;
  district: string;
  longitude: string;
  latitude: string;
  updateFields: (
    e: React.ChangeEvent<
      HTMLTextAreaElement | HTMLSelectElement | HTMLInputElement
    >,
  ) => void;
};

export type ThirdFormProps = {
  degree: string;
  lawyerSection: {
    id: string;
    section: Section;
    section_id: string;
    sectionLicenseNo: string;
    secondLicenseFile: any;
  }[];
  accurateSpeciality: string;
  selectuserIdFile: boolean;
  selectLicensesNumFile: boolean;
  selectDegreeCertificateFile: boolean;
  setSelectLicensesNumFile: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectDegreeCertificateFile: React.Dispatch<React.SetStateAction<boolean>>;
  setFormData: any;
  setSelectUserIdFile: React.Dispatch<React.SetStateAction<boolean>>;
  generalSpeciality: string;
  idType: string;
  idNumber: string;
  functionalCase: string;
  userIdFile: File | null;
  licensesNumFile: File | null;
  degreeCertificateFile: File | null;
  licensesNum: string;
  updateFields: (
    e: React.ChangeEvent<
      HTMLTextAreaElement | HTMLSelectElement | HTMLInputElement
    >,
  ) => void;
};

export type LawyerSignUpForm = {
  firstName: string;
  secondName: string;
  thirdName: string;
  forthName: string;
  phoneNum: string;
  email: string;
  password: string;
  phoneCode: string;
  confirmPassword: string;
  updateFields: (
    e: React.ChangeEvent<
      HTMLTextAreaElement | HTMLSelectElement | HTMLInputElement
    >,
  ) => void;

  firstNameError: string;
  secondNameError: string;
  forthNameError: string;
  confirmPasswordError: string;
  passwordError: string;
  emailError: string;
  phoneError: string;

  handleFirstNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSecondNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;

  handleForthNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;

  handleEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePhoneChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export type ForthFormProps = {
  imageFile: File | null;
  logoFile: File | null;
  selectImageFile: Boolean;
  setSelectImageFile: React.Dispatch<React.SetStateAction<boolean>>;
  selectLogoFile: Boolean;
  setSelectLogoFile: React.Dispatch<React.SetStateAction<boolean>>;
  updateFields: (
    e: React.ChangeEvent<
      HTMLTextAreaElement | HTMLSelectElement | HTMLInputElement
    >,
  ) => void;
};
