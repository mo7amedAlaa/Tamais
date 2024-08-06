import { getAccurateLawyerData } from "@/app/_api/queries/LawyerData.query";
import { useQuery } from "@tanstack/react-query";

interface AccurateSpecialty {
  id: number;
  title: string;
}

interface AccurateSpecialtyResponse {
  status: boolean;
  code: number;
  message: string;
  data: {
    AccurateSpecialty: AccurateSpecialty[];
  };
}

export function useAccurateData(): {
  isLoading: boolean;
  error: any;
  lawyerAccurateData: AccurateSpecialtyResponse | undefined;
} {
  const {
    isLoading,
    data: lawyerAccurateData,
    error,
  } = useQuery({
    queryKey: ["Lawyer Data Accurate"],
    queryFn: () => getAccurateLawyerData(),
  });
  return { isLoading, error, lawyerAccurateData };
}
