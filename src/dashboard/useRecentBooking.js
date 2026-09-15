import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getBookingsAfterDate } from "../services/apiBookings";

function useRecentBooking() {
  const [searchParams] = useSearchParams();
  const numDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));
  const queryDays = subDays(new Date(), numDays).toISOString();
  const { data: stays, isLoading } = useQuery({
    queryKey: ["stays", `last-${numDays}`],
    queryFn: () => getBookingsAfterDate(queryDays),
  });

  const confirmedStays = stays?.filter(
    (stay) => stay?.status === "checked-in" || stay?.status === "checked-out",
  );
  return { stays, isLoading, confirmedStays };
}

export default useRecentBooking;
