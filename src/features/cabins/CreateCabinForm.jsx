import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { Textarea } from "../../ui/Textarea";
import Spinner from "../../ui/Spinner";

import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

function CreateCabinForm({ cabinToedit = {}, onCloseModal }) {
  // get data cabin
  const { id: editId, ...editValue } = cabinToedit;
  const isEditsession = Boolean(editId);

  const { createCabin, createPending } = useCreateCabin();
  const { editCabin, editPending } = useEditCabin();
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditsession ? editValue : {},
  });
  const { errors } = formState;

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image?.[0];
    isEditsession
      ? editCabin(
          { updateCabin: { ...data, image: image }, id: editId },
          {
            onSuccess: (data) => {
              reset();
              onCloseModal?.();
            },
          },
        )
      : createCabin(
          { ...data, image: image },
          {
            onSuccess: (data) => {
              reset();
              onCloseModal?.();
            },
          },
        );
  }
  const isWorking = editPending || createPending;
  if (isWorking) return <Spinner />;
  return (
    <div>
      <h1>{isEditsession ? "update cabin" : "Create Cabin"}</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormRow label="Cabin name" error={errors.name?.message}>
          <Input
            type="text"
            id="name"
            disabled={isWorking}
            {...register("name", { required: "cabin name" })}
          />
        </FormRow>

        <FormRow label="Maximum capacity" error={errors.maxCapacity?.message}>
          <Input
            type="number"
            id="maxCapacity"
            disabled={isWorking}
            {...register("maxCapacity", {
              required: "Please enter a maximum capacity",
              min: { value: 1, message: "at least 1" },
              max: { value: 500, message: "at most 500" },
            })}
          />
        </FormRow>

        <FormRow label="Regular price" error={errors.regularPrice?.message}>
          <Input
            type="number"
            id="regularPrice"
            disabled={isWorking}
            {...register("regularPrice", {
              required: "Please enter a regular price",
              min: { value: 0, message: "Price must be a positive number" },
              max: { value: 10000, message: "Price must be at most 10000" },
            })}
          />
        </FormRow>

        <FormRow label="Discount" error={errors.discount?.message}>
          <Input
            type="number"
            id="discount"
            disabled={isWorking}
            defaultValue={0}
            {...register("discount", {
              required: "Please enter a discount",
              validate: (value) => {
                const regularPrice = getValues("regularPrice");
                if (Number(value) >= Number(regularPrice)) {
                  return "Discount cannot be greater than regular price";
                }
                return true;
              },
            })}
          />
        </FormRow>

        <FormRow
          label="Description for website"
          error={errors.description?.message}
        >
          <Textarea
            type="text"
            id="description"
            disabled={isWorking}
            {...register("description")}
          />
        </FormRow>

        <FormRow label="Cabin photo" error={errors.image?.message}>
          <FileInput
            id="image"
            accept="image/*"
            disabled={isWorking}
            {...register("image", {
              required: isEditsession ? false : "this fiel required",
            })}
          />
        </FormRow>

        <FormRow>
          {/* type is an HTML attribute! */}
          <Button
            variation="secondary"
            type="reset"
            disabled={isWorking}
            onClick={() => onCloseModal?.()}
          >
            Cancel
          </Button>
          <Button
            disabled={isWorking}
          >{`${isWorking ? "Adding..." : "Add cabin"}`}</Button>
        </FormRow>
      </Form>
    </div>
  );
}

export default CreateCabinForm;
