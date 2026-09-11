import { useParams } from "react-router-dom";
import { useMoveBack } from "../../hooks/useMoveBack";
import Button from "../../ui/Button";
import ButtonGroup from "../../ui/ButtonGroup";
import ButtonText from "../../ui/ButtonText";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import BookingDataBox from "../bookings/BookingDataBox";
import useBooking from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import { useEffect, useState } from "react";
import Checkbox from "../../ui/Checkbox";
import { formatCurrency } from "../../utils/helpers";

import { useChecking } from "./useChecking";
import Box from "../../ui/Box";
import { useSetttings } from "../settings/useSetttings";

function CheckinBooking() {
  const { bookingId } = useParams();
  const [Confirmed, setConfirmed] = useState(false);
  const [addBreakfast, setaddBreakfast] = useState(false);

  const { booking, isLoading } = useBooking();

  const {
    numNights,
    numGuests,
    hasBreakfast,
    extrasPrice,
    totalPrice,
    cabinPrice,
  } = booking || {};

  const { checkin, checkingLoading } = useChecking();
  useEffect(() => setConfirmed(booking?.isPaid ?? false), [booking]);
  const moveBack = useMoveBack();
  function handleCheckin() {
    if (!Confirmed) return;
    if (addBreakfast) {
      checkin({
        bookingId,
        breakFast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakPrice,
          totalPrice: totalPrice + optionalBreakPrice,
        },
      });
    } else {
      checkin({ bookingId, breakFast: {} });
    }
  }
  const { settings } = useSetttings();

  const optionalBreakPrice = settings?.breakfastPrice * numNights * numGuests;

  if (isLoading || checkingLoading) return <Spinner />;
  return (
    <>
      <Row type="horizontal">
        <Heading type="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />
      {!hasBreakfast && (
        <Box>
          <Checkbox
            checked={addBreakfast}
            onChange={() => {
              setaddBreakfast((add) => !add);
              setConfirmed(false);
            }}
          >
            add breadfast for {formatCurrency(optionalBreakPrice)}
          </Checkbox>
        </Box>
      )}
      <Box>
        <Checkbox
          onChange={() => setConfirmed((confirm) => !confirm)}
          disabled={Confirmed || checkingLoading}
          checked={Confirmed}
          id={`${bookingId}`}
        >
          i confirm that i will pay when i arrive || total Price{" "}
          {formatCurrency(
            cabinPrice * numNights * numGuests + optionalBreakPrice,
          )}{" "}
          (
          {`${formatCurrency(cabinPrice * numNights * numGuests)} total Cabin Price  + ${formatCurrency(optionalBreakPrice)} total breakFast`}
          )
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!Confirmed}>
          Check in booking #{bookingId}
        </Button>

        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
