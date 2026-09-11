import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/cooparator";

export function useBookings() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get("status");

  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { filterField: "status", value: filterValue };

  //2) sortBy

  const sortByRaw = searchParams.get("sortBy") || "startDate-desc";

  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  // pagination
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const { data: { data: bookings, count } = {}, isLoading } = useQuery({
    queryKey: ["bookings", filter, sortBy, page], // Include the filter in the query key
    queryFn: () => getBookings({ filter, sortBy, page }),
    // Pass the filter to the API function
  });

  // pre fetching
  const PageCount = Math.ceil(count / PAGE_SIZE);
  if (page < PageCount)
    queryClient.prefetchQuery({
      queryKey: ["booings", filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });
  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["booings", filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    });

  return { bookings, count, isLoading };
}
