import { DeleteProfileParams } from "@/app/_api/interfaces/Profile";
import { deleteProfile } from "@/app/_api/queries/profile.query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useDeleteProfile = () => {
  const queryClient = useQueryClient();

  const { mutate: deletingProfile, isPending: isDeleting } = useMutation({
    mutationFn: ({ id, otherField }: DeleteProfileParams) =>
      deleteProfile(id, otherField),
    onSuccess: () => {
      toast.success("Profile Successfully Deleted");
      queryClient.invalidateQueries({
        queryKey: ["profile"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { deletingProfile, isDeleting };
};

export default useDeleteProfile;
