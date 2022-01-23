import { Button, Input } from '@material-ui/core';
import styled from 'styled-components';
import { ReactComponent as PaginationIcon } from 'assets/icons/PaginationIcon.svg';
import { device } from 'styles/device';
interface StyleProps {
  rotated?: boolean;
  last?: boolean;
  disabled?: boolean;
}
export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  span.text:first-child {
    @media (max-width: ${device.mobile}) {
      margin: 0 10px 0 0;
    }
  }
  span.text {
    margin: 0 15px;
    font-size: 18px;
    line-height: 21px;
    color: #223367;
    @media (max-width: ${device.mobile}) {
      font-size: 16px;
      line-height: 18.75px;
      margin: 0 10px;
    }
  }
`;
export const PInput = styled(Input)`
  max-width: 76px;
  width: 100%;
  background-color: #fff;
  border: 1px solid #c2c2c2;
  box-sizing: border-box;
  border-radius: 14px;
  padding: 13px 0;
  input {
    text-align: center;
  }
  @media (max-width: ${device.mobile}) {
    padding: 11px 0;
    max-width: 65px;
  }
  input {
    padding: 0;
    font-size: 18px;
    line-height: 24px;
    color: #606eea;
    font-weight: 900;
    @media (max-width: ${device.mobile}) {
      font-size: 16px;
      line-height: 21px;
    }
  }
  &:after,
  &:before {
    display: none;
  }
`;
export const PButton = styled(Button)`
  padding: 13px;
  width: 50px;
  min-width: auto;
  height: 50px;
  border: 1px solid #c2c2c2;
  border-radius: 14px;
  margin: ${({ last }: StyleProps) => (last ? '0 0 0 10px' : '')};
  cursor: ${({ disabled }: StyleProps) =>
    disabled ? 'not-allowed !important;' : 'pointer'};
  background-color: ${({ disabled }: StyleProps) =>
    disabled ? 'rgba(0, 0, 0, 0.2);' : ''};
  @media (max-width: ${device.mobile}) {
    padding: 11px;
    width: 43px;
    height: 43px;
    margin: ${({ last }: StyleProps) => (last ? '0 0 0 5px' : '')};
  }
`;

export const Icon = styled(PaginationIcon)`
  transform: ${({ rotated }: StyleProps) => (rotated ? 'rotate(180deg)' : '')};
  @media (max-width: ${device.mobile}) {
    width: 21px;
    height: 21px;
  }
`;
