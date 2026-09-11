import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

function useCheckout() {
  const queryClient = useQueryClient();
  const { mutate: checkout, isPending: checkLoading } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),
    onSuccess: () => {
      toast.success("Booking has updated succesfull");
      queryClient.invalidateQueries({ active: true });
    },
  });
  return { checkout, checkLoading };
}

export default useCheckout;
