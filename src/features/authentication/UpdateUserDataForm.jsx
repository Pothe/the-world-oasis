import { useState } from "react";

import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import useUser from "./useUser";

function UpdateUserDataForm() {
  const {
    user: {
      email,
      user_metadata: { fullName: currectName },
    },
  } = useUser();
  const [fullName, setfullName] = useState(currectName);
  const [avatar, setavatar] = useState(null);

  return (
    <Form>
      <FormRow label="Email address">
        <Input value={email} disabled />
      </FormRow>

      <FormRow label="Full name">
        <Input
          type="text"
          id="fullName"
          value={fullName}
          onChange={(e) => setfullName(e.target.value)}
        />
      </FormRow>

      <FormRow label="Avatar image">
        <FileInput id="avatar" accept="image/*" />
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
