import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateUser } from "../../services/apiAuth";
import toast from "react-hot-toast";

function useEditinguser() {
  const queryClient = useQueryClient();
  const { mutate: updateCurrentUser, isPending: currentUserPending } =
    useMutation({
      mutationFn: UpdateUser,
      onSuccess: (user) => {
        queryClient.setQueryData(["user"], user.user);
        // queryClient.invalidateQueries({ queryKey: ["user"] });
        toast.success("updated successfull");
      },
      onError: () => {
        toast.error("something wrong with udpate user");
      },
    });
  return { updateCurrentUser, currentUserPending };
}

export default useEditinguser;
