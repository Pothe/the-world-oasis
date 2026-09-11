import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Login } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: apiAuth, isPending: loginLoading } = useMutation({
    mutationFn: ({ email, password }) => Login({ email, password }),
    onSuccess: (user) => {
      toast.success("successfull login");

      queryClient.setQueriesData(["user"], user.user);
      navigate("/dashboard", { replace: true });
    },

    onError: (err) => {
      console.log(err);
      toast.error("Provide wrong email or password");
    },
  });

  return { apiAuth, loginLoading };
}
