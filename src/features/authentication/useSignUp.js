import { useMutation } from "@tanstack/react-query";
import { Signup } from "../../services/apiAuth";
import toast from "react-hot-toast";

export default function useSignUp() {
  const { mutate: signup, isPending } = useMutation({
    mutationFn: Signup,
    onSuccess: (user) => {
      toast.success(
        "a new user is created successfull, please verify your email to access ",
      );
    },
  });
  return { signup, isPending };
}
