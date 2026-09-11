import { useNavigate } from "react-router-dom";
import useUser from "../features/authentication/useUser";
import { useEffect } from "react";
import Spinner from "./Spinner";

export default function ProtectRoute({ children }) {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useUser();

  useEffect(
    function () {
      if (!isAuthenticated && !isLoading)
        return navigate("/login", { replace: true });
    },
    [isAuthenticated, isLoading, navigate],
  );
  if (isLoading) return <Spinner />;

  return children;
}
