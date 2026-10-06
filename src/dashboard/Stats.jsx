import {
  HiOutlineBriefcase,
  HiOutlineCalendar,
  HiOutlineCurrencyDollar,
  HiOutlinePresentationChartLine,
} from "react-icons/hi2";
import { formatCurrency } from "../utils/helpers";
import Stat from "./Stat";

function Stats({ bookings, confirmedStays, numDays, cabinCount }) {
  // num checked in nights / all available nights (num days * num cabins)
  const numBooking = bookings?.length || 0;
  const Sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);
  const occupancyRate =
    (confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
      (numDays * cabinCount)) *
    100;

  const checkedIn = confirmedStays.length;

  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBooking}
      />
      <Stat
        title="Sales"
        color="blue"
        icon={<HiOutlineCurrencyDollar />}
        value={formatCurrency(Sales)}
      />
      <Stat
        title="checked-in"
        color="green"
        icon={<HiOutlineCalendar />}
        value={checkedIn}
      />

      <Stat
        title="Occupancy Rate"
        color="green"
        icon={<HiOutlinePresentationChartLine />}
        value={Math.round(occupancyRate) + "%"}
      />
    </>
  );
}

export default Stats;
