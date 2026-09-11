import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { deleteBooking } from "../../services/apiBookings";

function useDeleteBooking() {
  const queryClient = useQueryClient();
  const { mutate: deletebooking, isPending: deletePending } = useMutation({
    mutationFn: (bookingId) => deleteBooking(bookingId),
    onSuccess: () => {
      toast.success(`has successfull delete `);
      queryClient.invalidateQueries({
        active: true,
      });
    },
    onError: () => {
      toast.error("delete booking fail");
    },
  });
  return { deletebooking, deletePending };
}

export default useDeleteBooking;
