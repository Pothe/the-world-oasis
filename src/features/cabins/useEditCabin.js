import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export  function useEditCabin() {
  const queryClient = useQueryClient();

  const { mutate: editCabin, isPending: editPending } = useMutation({
    mutationFn: ({ updateCabin, id }) => CreateEditCabin(updateCabin, id),
    onSuccess: () => {
      toast.success("cabin was updated");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (err) => {
      toast.error(`${err.message}`);
    },
  });
  return { editCabin, editPending };
}
