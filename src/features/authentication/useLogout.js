import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Logout } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: logout, isPending } = useMutation({
    mutationFn: Logout,
    onSuccess: () => {
      toast.success("logout was successfull");
      queryClient.removeQueries();
      navigate("/login", { replace: true });
    },
  });
  return { logout, isPending };
}
