import { useEffect } from "react";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { getCabins } from "../services/apiCabins";
import { useQuery } from "@tanstack/react-query";

function Cabins() {
  const { data, isLoading } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });
  console.log(data);
  return (
    <Row type="horizontal">
      <Heading as="h1">All cabins</Heading>
      <p>TEST</p>
      <img src="https://dclaevazetcjjkrzczpc.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg" />
    </Row>
  );
}

export default Cabins;
