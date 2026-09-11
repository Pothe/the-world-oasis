import { IoIosLogOut } from "react-icons/io";
import styled from "styled-components";
import Button from "./Button";
import useLogout from "../features/authentication/useLogout";
import Spinner from "./Spinner";
import UserAvatar from "../features/authentication/UserAvatar";

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);
  align-items: center;
  justify-content: flex-end;
  display: flex;
  gap: 5px;
`;

function Header() {
  const { logout, isPending } = useLogout();
  if (isPending) return <Spinner />;
  return (
    <StyledHeader>
      <UserAvatar  />
      <Button onClick={logout}>
        <IoIosLogOut />
      </Button>
    </StyledHeader>
  );
}

export default Header;
