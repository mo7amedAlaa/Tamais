import { getGeneralLawyerData } from "@/app/_api/queries/LawyerData.query";
import { useQuery } from "@tanstack/react-query";

interface GeneralSpecialty {
  id: number;
  title: string;
}

interface GeneralSpecialtyResponse {
  status: boolean;
  code: number;
  message: string;
  data: {
    GeneralSpecialty: GeneralSpecialty[];
  };
}

export function useLawyerData(): {
  isLoading: boolean;
  error: any;
  generalSpecialties: GeneralSpecialtyResponse | undefined;
} {
  const {
    isLoading,
    data: generalSpecialties,
    error,
  } = useQuery({
    queryKey: ["General Specialties Data"],
    queryFn: () => getGeneralLawyerData(),
  });

  return { isLoading, error, generalSpecialties };
}
