import styled from 'styled-components';
import { Props } from './index';
import Popover from '@material-ui/core/Popover';

export const PopoverM = styled(Popover)`
  .MuiPopover-paper {
    overflow: hidden !important ;
    min-height: fit-content !important ;
    box-shadow: 0px 1px 28px rgba(0, 0, 0, 0.12) !important ;
    border-radius: 14px !important ;
    min-width: fit-content !important ;
  }
`;

export const WrapClick = styled.div`
  background-color: ${({ openBgColor }: Props) =>
    openBgColor ? openBgColor : 'transparent'};
  border-radius: ${({ radius }: Props) => (radius ? `${radius}px` : null)};
`;
