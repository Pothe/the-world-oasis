import styled from "styled-components";
import useCabins from "../features/cabins/useCabins";
import TodayActivity from "../features/check-in-out/TodayActivity";
import Spinner from "../ui/Spinner";
import DurationChart from "./DurationChart";
import SalesChart from "./SalesChart";
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

      <TodayActivity />
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart bookings={bookings} numDays={stays?.length} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
