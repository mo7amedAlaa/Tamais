import { getServices } from "@/app/_api/queries/service.query";
import { useQuery } from "@tanstack/react-query";

export function useServices() {
  const {
    isLoading,
    data: services,
    error,
  } = useQuery({
    queryKey: ["Services"],
    queryFn: () => getServices(),
  });
  return { isLoading, error, services };
}
