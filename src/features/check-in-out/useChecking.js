import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useChecking() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: checkin, isPending: checkingLoading } = useMutation({
    mutationFn: ({ bookingId, breakFast }) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...breakFast,
      }),
    onSuccess: (data) => {
      toast.success(`Booking update ${data.id} successfull`);
      queryClient.invalidateQueries({ active: true });
      navigate("/bookings");
    },
  });
  return { checkin, checkingLoading };
}
