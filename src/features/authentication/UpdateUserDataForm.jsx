import { useState } from "react";

import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import useUser from "./useUser";
import useEditinguser from "./useEditinguser";
import Spinner from "../../ui/Spinner";

function UpdateUserDataForm() {
  const { updateCurrentUser, currentUserPending } = useEditinguser();
  const {
    user: { email, user_metadata: { fullName: currentName } = "" },
  } = useUser();
  const [fullName, setfullName] = useState(currentName);
  const [avatar, setavatar] = useState(null);
  function handleUpdate(e) {
    e.preventDefault();
    if (!fullName) return;
    updateCurrentUser(
      { fullName, avatar },
      {
        onSuccess: () => {
          setavatar(null);
          e.target.reset(); // Resets file input element
        },
      },
    );
  }
  if (currentUserPending) return <Spinner />;
  return (
    <Form onSubmit={handleUpdate}>
      <FormRow label="Email address">
        <Input value={email} disabled />
      </FormRow>

      <FormRow label="Full name">
        <Input
          type="text"
          id="fullName"
          value={fullName}
          disabled={currentUserPending}
          onChange={(e) => setfullName(e.target.value)}
        />
      </FormRow>

      <FormRow label="Avatar image">
        <FileInput
          id="avatar"
          accept="image/*"
          onChange={(e) => setavatar(e.target.files[0])}
        />
      </FormRow>

      <FormRow>
        <Button type="reset" variation="secondary">
          Cancel
        </Button>
        <Button>Update account</Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
