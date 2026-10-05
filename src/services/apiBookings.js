import { PAGE_SIZE } from "../utils/cooparator";
import { getToday } from "../utils/helpers";
import supabase from "./supabase";
export async function getBookings({ filter, sortBy, page }) {
  // collect all bookings from supabase and return them to the function, if filter is not null then it will return data with filter applied, otherwise it will return all data
  let query = supabase
    .from("Bookings")
    .select(
      "id, startDate, endDate, numNights, numGuests, totalPrice, status, cabins(name), guests(fullName, email)",
      { count: "exact" },
    );

  // const {data, error} = await supabase.from('Bookings').select('*,cabins(name),guests(fullName,email)'),status
  // to check if filter not equal to null then data will return to function with filter applied, otherwise it will return all data

  if (filter)
    query = query[filter.method || "eq"](filter.filterField, filter.value);
  // query = query.eq(filter.filterField, filter.value);

  // 2) sortBy
  if (sortBy)
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === "asc",
    });

  if (page) {
    const from = (page - 1) * (PAGE_SIZE - 1);
    const to = from + (PAGE_SIZE - 1);
    query = query.range(from, to);
  }

  const { data, error, count } = await query;
  // to check if it has error then it will display error message, otherwise it will return data to function
  if (error) {
    throw new Error("Bookings could not get loaded");
  }
  return { data, count };
}
export async function getBooking(id) {
  const { data, error } = await supabase
    .from("Bookings")
    .select("*, cabins(*), guests(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking not found");
  }

  return data;
}

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
export async function getBookingsAfterDate(date) {
  const { data, error } = await supabase
    .from("Bookings")
    .select("created_at, totalPrice, extrasPrice")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date) {
  const { data, error } = await supabase
    .from("Bookings")
    .select("*, guests(fullName)")
    // .or(`and(status.eq.unconfirmed,startDate.eq.${getToday()})`)
    .gte("startDate", date)
    .lte("startDate", getToday());

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullName, nationality, countryFlag)")
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`,
    )
    .order("created_at");

  // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
  // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
  // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }
  return data;
}

export async function updateBooking(id, obj) {
  const { data, error } = await supabase
    .from("Bookings")
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  return data;
}

export async function deleteBooking(id) {
  // REMEMBER RLS POLICIES
  const { data, error } = await supabase.from("Bookings").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  return data;
}
