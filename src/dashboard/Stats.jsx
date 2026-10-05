import { HiOutlineBriefcase } from "react-icons/hi2";
import Stat from "./Stat";

function Stats({ bookings, confirmedStays, numDays, cabinCount }) {
  // num checked in nights / all available nights (num days * num cabins)
  const occupancyRate =
    (confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
      (numDays * cabinCount)) *
    100;
  console.log(occupancyRate);
  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={bookings?.length}
      />
      <Stat
        title="Recent Stay"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={bookings?.length}
      />
      <Stat
        title="Occupancy Rate"
        color="green"
        icon={<HiOutlineBriefcase />}
        value={Math.round(occupancyRate) + "%"}
      />
    </>
  );
}

export default Stats;
