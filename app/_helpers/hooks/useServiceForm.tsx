import { serviceRequest } from "@/app/_api/queries/service.query";
import { useMutation } from "@tanstack/react-query";

export const useServiceForm = (serviceId: number, formData: FormData) => {
  const {
    mutate: userServiceRequest,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: () => serviceRequest(serviceId, formData),
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (err) => console.log(err),
  });

  return { userServiceRequest, isPending, isSuccess };
};
