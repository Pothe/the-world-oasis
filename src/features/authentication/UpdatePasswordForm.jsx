import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Button from "../../ui/Button";

function UpdatePasswordForm() {
  return (
    <form>
      <FormRow label="Password (min 8 characters)">
        <Input
          type="password"
          id="password"
          // this makes the form better for password managers
          autoComplete="current-password"
        />
      </FormRow>

      <FormRow label="Confirm password">
        <Input
          type="password"
          autoComplete="new-password"
          id="passwordConfirm"
        />
      </FormRow>
      <FormRow>
        <Button type="reset" variation="secondary">
          Cancel
        </Button>
        <Button>Update password</Button>
      </FormRow>
    </form>
  );
}

export default UpdatePasswordForm;
