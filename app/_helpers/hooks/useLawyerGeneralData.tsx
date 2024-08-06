import {
  fetchCountries,
  fetchFunctionalCases,
  fetchNationalities,
  getLawyerSections,
  getLawyerTypes,
} from "@/app/_api/queries/profile.query";
import { useQuery } from "@tanstack/react-query";

interface LawyerType {
  id: number;
  name: string;
  need_company_name: number;
  need_company_licence_no: number;
  need_company_licence_file: number;
}

interface LawyerTypes {
  types: LawyerType[];
}

interface LawyerTypesResponse {
  status: boolean;
  code: number;
  message: string;
  data: LawyerTypes;
}

type City = {
  id: number;
  title: string;
};

type Region = {
  id: number;
  name: string;
  cities: City[];
};

type Country = {
  id: number;
  name: string;
  phone_code: number;
  regions: Region[];
};

type CountriesResponse = {
  status: boolean;
  code: number;
  message: string;
  data: {
    Countries: Country[];
  };
};

type FunctionalCase = {
  id: number;
  title: string;
};

type FunctionalCasesResponse = {
  status: boolean;
  code: number;
  message: string;
  data: {
    FunctionalCases: FunctionalCase[];
  };
};

type Nationality = {
  id: number;
  name: string;
};

type NationalitiesResponse = {
  status: boolean;
  code: number;
  message: string;
  data: {
    nationalities: Nationality[];
  };
};

export type DigitalGuideCategory = {
  id: number;
  title: string;
  image: string;
  need_license: number;
  lawyers_count: number;
};

type DigitalGuideCategoriesResponse = {
  status: boolean;
  code: number;
  message: string;
  data: {
    DigitalGuideCategories: DigitalGuideCategory[];
  };
};

export function useGetNationalities(): {
  isLoading: boolean;
  error: any;
  nationality: NationalitiesResponse | undefined;
} {
  const { isLoading, data, error } = useQuery({
    queryKey: ["Nationality"],
    queryFn: () => fetchNationalities(),
  });
  const nationality = data?.data;
  return { isLoading, error, nationality };
}

export function useGetCountries(): {
  isLoading: boolean;
  error: any;
  countries: CountriesResponse | undefined;
} {
  const { isLoading, data, error } = useQuery({
    queryKey: ["Country"],
    queryFn: () => fetchCountries(),
  });
  const countries = data?.data;
  return { isLoading, error, countries };
}

export function useLawyerTypes(): {
  isLoading: boolean;
  error: any;
  lawyerTypes: LawyerTypesResponse | undefined;
} {
  const { isLoading, data, error } = useQuery({
    queryKey: ["Lawyer Types"],
    queryFn: () => getLawyerTypes(),
  });
  const lawyerTypes = data?.data;
  return { isLoading, error, lawyerTypes };
}

export function useLawyerFunctionalCases(): {
  isLoading: boolean;
  error: any;
  functionalCases: FunctionalCasesResponse | undefined;
} {
  const { isLoading, data, error } = useQuery({
    queryKey: ["Lawyer FunctionalCases"],
    queryFn: () => fetchFunctionalCases(),
  });
  const functionalCases = data?.data;
  return { isLoading, error, functionalCases };
}

export function useLawyerSection(): {
  isLoading: boolean;
  error: any;
  lawyerSections: DigitalGuideCategoriesResponse | undefined;
} {
  const { isLoading, data, error } = useQuery({
    queryKey: ["Lawyer Section"],
    queryFn: () => getLawyerSections(),
  });
  const lawyerSections = data?.data;
  return { isLoading, error, lawyerSections };
}
