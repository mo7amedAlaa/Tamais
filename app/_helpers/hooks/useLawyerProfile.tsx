import { lawyerProfile } from "@/app/_api/queries/profile.query";
import { useQuery } from "@tanstack/react-query";

export function useLawyerProfile() {
  const {
    isLoading,
    data: profile,
    error,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: () => lawyerProfile(),
  });
  return { isLoading, error, profile };
}
