import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import ButtonGroup from "../../ui/ButtonGroup";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import useSignUp from "./useSignUp";
import Spinner from "../../ui/Spinner";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const { signup, isPending } = useSignUp();
  const { register, formState, getValues, reset, handleSubmit } = useForm();
  const { errors } = formState;
  const onSubmit = ({ fullName, email, password }) => {
    signup({ fullName, email, password }, { onSettled: () => reset });
  };
  if (isPending) return <Spinner />;
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          disabled={isPending}
          {...register("fullName", { required: "need fullName" })}
        />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          disabled={isPending}
          {...register("email", {
            required: "this field is require",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "provide email is wrong",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Password (min 8 characters)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          disabled={isPending}
          {...register("password", {
            required: "this field is require",
            minLength: {
              value: 8,
              message: "at least 8 letters",
            },
            maxLength: {
              value: 18,
              message: "max letter 18",
            },
          })}
        />
      </FormRow>

      <FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
        <Input
          type="password"
          id="passwordConfirm"
          disabled={isPending}
          {...register("passwordConfirm", {
            required: "this field is require",
            validate: (value) =>
              value === getValues("password") || "this not match password",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <ButtonGroup>
          <Button variation="secondary" onClick={() => reset()}>
            cancel
          </Button>
          <Button>Create new user</Button>
        </ButtonGroup>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
