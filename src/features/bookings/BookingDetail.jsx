import styled from "styled-components";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import useBooking from "./useBooking";
import Tag from "../../ui/Tag";

import BookingDataBox from "./BookingDataBox";

import { useMoveBack } from "../../hooks/useMoveBack";
import { HiOutlineArrowSmallLeft } from "react-icons/hi2";
import ButtonText from "../../ui/ButtonText";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import { useNavigate } from "react-router-dom";
import Spinner from "../../ui/Spinner";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const navigate = useNavigate();
  const moveBack = useMoveBack();
  const { booking, isLoading } = useBooking();

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  const { id: bookingId, status } = booking || {};
  if (isLoading) return <Spinner />;
  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading type="h1">
            Booking # {bookingId}{" "}
            <Tag type={statusToTagName[status]}>{status}</Tag>
          </Heading>
        </HeadingGroup>

        <ButtonText onClick={moveBack}>
          <HiOutlineArrowSmallLeft /> Back
        </ButtonText>
      </Row>
      <BookingDataBox booking={booking} />
      <ButtonGroup>
        {(status === "unconfirmed" || status === "checked-in") && (
          <Button
            variation="primary"
            onClick={() => navigate(`/checkin/${bookingId}`)}
          >
            Check in # {bookingId}
          </Button>
        )}
        {status === "checked-out" && (
          <Button
            variation="primary"
            onClick={() => navigate(`/checkin/${bookingId}`)}
          >
            Check in # {bookingId}
          </Button>
        )}
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
