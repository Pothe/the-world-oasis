import styled from "styled-components";

const Stylebox = styled.div`
  padding: 10px;
  background-color: white;
  margin-top: 5px;
  border-radius: 5px;
`;

function Box({ children }) {
  return <Stylebox>{children}</Stylebox>;
}

export default Box;
