import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useDeleteCabins() {
  const queryClient = useQueryClient();
  const { mutate: DeleteCabin, isPending: deletePending } = useMutation({
    mutationFn: deleteCabin,
    onSuccess: () => {
      toast.success("delete successfull!");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { DeleteCabin, deletePending };
}
