import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

function useCabins() {
  const { isLoading, data: Cabins } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });
  return { Cabins, isLoading };
}

export default useCabins;
