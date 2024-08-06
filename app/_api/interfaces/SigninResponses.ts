export interface ClientSignin {
  client: {
    id: number;
    name: string;
    phone_code: number;
    mobile: string;
    type: number;
    email: string;
    image: string;
    nationality: {
      id: number;
      name: string;
    };
    country: {
      id: number;
      name: string;
    };
    region: {
      id: number;
      name: string;
    };
    city: {
      id: number;
      title: string;
    };
    longitude: number;
    latitude: number;
    gender: string;
    token: string;
  };
}
export interface LawyerSignin {
  lawyer: {
    id: number;
    first_name: string;
    second_name: string;
    third_name: any;
    fourth_name: string;
    name: string;
    email: string;
    gender: string;
    phone: string;
    about: string;
    birthday: string;
    photo: string;
    is_favorite: number;
    office_request_status: number;
    special: number;
    sections: {
      id: number;
      section: {
        id: number;
        title: string;
        image: string;
        need_license: number;
        lawyers_count: number;
      };
      lawyer_license_no: any;
      lawyer_license_file: any;
    }[];
    rates_count: any;
    rates_avg: any;
    token: string;
  };
}
export type ClientSigninResponse = Response<ClientSignin>;
export type LawyerSigninResponse = Response<LawyerSignin>;
