import Button from "../../ui/Button";
import useCheckout from "../bookings/useCheckout";

function CheckoutButton({ bookingId }) {
  const { checkout, checkLoading } = useCheckout();

  return (
    <Button
      variation="primary"
      size="small"
      onClick={() => checkout(bookingId)}
      disabled={checkLoading}
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
