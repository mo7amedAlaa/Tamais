import { UserData } from "@/app/_api/interfaces/Profile";
import { clientProfile } from "@/app/_api/queries/profile.query";
import { useQuery } from "@tanstack/react-query";
import { HttpStatusCode } from "axios";

export function useClientProfile() {
  const { isLoading, data, error } = useQuery<{
    data: UserData;
    status: HttpStatusCode;
  }>({
    queryKey: ["profile"],
    queryFn: clientProfile,
  });
  return { isLoading, error, profile: data?.data };
}
