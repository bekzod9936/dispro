import { IconButton } from "@material-ui/core";
import styled from "styled-components";
import { device } from "styles/device";
import { XIcon } from "newassets/icons/icons";

interface Props {
  children: any;
  onClick?: () => void;
}

export const FilterButton = ({ children, onClick = () => {} }: Props) => {
  return (
    <ButtonKeyWord className="buttonkey">
      {children}
      <IconButton onClick={onClick}>
        <XIcon />
      </IconButton>
    </ButtonKeyWord>
  );
};

const ButtonKeyWord = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #c4c4c4;
  border-radius: 46px;
  font-weight: 300;
  font-size: 13px;
  color: #223367;
  padding: 0 5px 0 15px;

  height: 30px;
  .MuiIconButton-root {
    padding: 6px !important;
    margin-left: 5px;
  }
  @media (max-width: ${device.mobile}) {
    height: 25px;
    font-weight: 300;
    font-size: 12px;
    color: #223367;
  }
  @media (min-width: ${device.laptop}) {
    height: 35px;
    font-size: 14px;
  }
`;
