import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useUpdateSetting } from "./useUpdateSetting";
import { useSetttings } from "./useSetttings";

function UpdateSettingsForm() {
  const { mutate: updateSetting, isPending: isEditing } = useUpdateSetting();
  const {
    isLoading,

    settings: {
      minBooklength,
      maxBookinglength,
      maxGuestPerBooking,
      breakfastPrice,
    } = {},
  } = useSetttings();
  const isWorking = isLoading || isEditing;
  function handleUpdate(e, fieldName) {
    const { value } = e.target;
    if (!value) return;
    updateSetting({ [fieldName]: value });
  }

  if (isWorking) return <p>Loading...</p>;
  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          defaultValue={minBooklength}
          onBlur={(e) => handleUpdate(e, "minBooklength")}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          defaultValue={maxBookinglength}
          disabled={isWorking}
          onBlur={(e) => handleUpdate(e, "maxBookinglength")}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          defaultValue={maxBookinglength}
          disabled={isWorking}
          onBlur={(e) => handleUpdate(e, "maxBookinglength")}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          defaultValue={maxGuestPerBooking}
          disabled={isWorking}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={breakfastPrice}
          disabled={isWorking}
          onBlur={(e) => handleUpdate(e, "breakfastPrice")}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
