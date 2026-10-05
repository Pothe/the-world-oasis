import { format, isToday } from "date-fns";
import { FaDiagnoses } from "react-icons/fa";
import { HiAcademicCap, HiArrowDownOnSquare, HiEye } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import Tag from "../../ui/Tag";
import { formatCurrency, formatDistanceFromNow } from "../../utils/helpers";
import useCheckout from "./useCheckout";
import useDeleteBooking from "./useDeleteBooking";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

function BookingRow({
  booking: {
    id: bookingId,
    created_at,
    startDate,
    endDate,
    numNights,
    numGuests,
    totalPrice,
    status,
    guests,
    cabins,
  },
}) {
  // Safe destructuring with fallback objects
  const { fullName: guestName, email } = guests || {};
  const { name: cabinName } = cabins || {};

  const { deletebooking, deletePending } = useDeleteBooking();
  const { checkout, checkLoading } = useCheckout();
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };
  const navigate = useNavigate();

  if (deletePending || checkLoading) return <Spinner />;

  return (
    <Table.Row role="row">
      <Cabin>{cabinName}</Cabin>

      <Stacked>
        <span>{guestName}</span>
        <span>{email}</span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}{" "}
          &rarr; {numNights} night stay
        </span>
        <span>
          {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
          {format(new Date(endDate), "MMM dd yyyy")}
        </span>
      </Stacked>

      <Tag type={statusToTagName[status]}>{status?.replace("-", " ")}</Tag>

      <Amount>{formatCurrency(totalPrice)}</Amount>
      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={bookingId}>
            <HiAcademicCap />
          </Menus.Toggle>
          <Menus.List id={bookingId}>
            <Menus.Button
              icon={<HiEye />}
              onClick={() => navigate(`/booking/${bookingId}`)}
            >
              See Detial
            </Menus.Button>
            {status === "unconfirmed" && (
              <Menus.Button
                icon={<HiArrowDownOnSquare />}
                onClick={() => navigate(`/checkin/${bookingId}`)}
              >
                check-in
              </Menus.Button>
            )}
            {status === "checked-in" && (
              <Menus.Button
                icon={<HiArrowDownOnSquare />}
                onClick={() => checkout(bookingId)}
              >
                check out
              </Menus.Button>
            )}
            <Modal.Open opens="delete">
              <Menus.Button icon={<FaDiagnoses />}>Delete booking</Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>
        <Modal.Window name="delete">
          <ConfirmDelete
            resource={`cabin ${cabinName}`}
            disabled={deletePending}
            onConfirm={() => deletebooking(bookingId)}
          />
        </Modal.Window>
      </Modal>

      {/* Converted comment to standard JSX comment syntax */}
      {/* VIDEO: we could export this into own component... */}
    </Table.Row>
  );
}

export default BookingRow;
