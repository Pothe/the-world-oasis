import styled from "styled-components";
import useCabins from "../features/cabins/useCabins";
import Spinner from "../ui/Spinner";
import Stats from "./Stats";
import useRecentBooking from "./useRecentBooking";
import { useRecentBookings } from "./useRecentBookings";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { isLoading, bookings = {} } = useRecentBookings();
  const { stays, confirmedStays, isLoading: staying } = useRecentBooking();
  const { Cabins, isLoading: cabinLoading } = useCabins();
  console.log(Cabins);

  if (isLoading || staying || cabinLoading) return <Spinner />;
  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={stays}
        cabinCount={Cabins?.length}
      />
      <div>Today's activity</div>
      <div>Chart stay duration</div>
      <div>Chart Sale</div>
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
