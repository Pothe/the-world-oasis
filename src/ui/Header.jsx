import { IoIosLogOut } from "react-icons/io";
import { IoIosMoon } from "react-icons/io";
import { WiDayHaze } from "react-icons/wi";
import styled from "styled-components";
import { IoIosNotificationsOutline } from "react-icons/io";
import useLogout from "../features/authentication/useLogout";
import Spinner from "./Spinner";
import UserAvatar from "../features/authentication/UserAvatar";
import ButtonText from "./ButtonText";
import { useDarkMode } from "../context/DarkModeProvider";

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
  const { isDarkMode, ToggleMode } = useDarkMode();
  if (isPending) return <Spinner />;
  return (
    <StyledHeader>
      <UserAvatar />
      <ButtonText>
        <IoIosNotificationsOutline />
      </ButtonText>
      <ButtonText onClick={ToggleMode}>
        {isDarkMode ? <IoIosMoon /> : <WiDayHaze />}
      </ButtonText>
      <ButtonText onClick={logout}>
        <IoIosLogOut />
      </ButtonText>
    </StyledHeader>
  );
}

export default Header;
