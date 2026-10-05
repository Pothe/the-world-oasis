import styled from "styled-components";
import useCabins from "../features/cabins/useCabins";
import Spinner from "../ui/Spinner";
import Stats from "./Stats";
import { useRecentBookings } from "./useRecentBookings";
import { useRecentStays } from "./useRecentStays";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { Cabins, isLoading: Cabinloading } = useCabins();
  const { bookings, isLoading: bookingLoading } = useRecentBookings();
  const { stays, confirmedStays, isLoading: staysLoading } = useRecentStays();
  if (Cabinloading || bookingLoading || staysLoading) return <Spinner />;
  const cabinCount = Cabins?.length;

  return (
    <StyledDashboardLayout>
      <Stats
        cabinCount={cabinCount}
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={stays?.length}
      />
      <div>Chart stay duration</div>
      <div>Today's activity</div>
      <div>Chart stay duration</div>
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
