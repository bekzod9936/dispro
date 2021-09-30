import React from 'react';
import { PopoverM, WrapClick } from './style';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';

export interface Props {
  children?: any;
  click?: any;
  openBgColor?: string;
  radius?: number;
  anchorOrigin?: {
    horizontal: 'center' | 'left' | 'right' | number;
    vertical: 'bottom' | 'center' | 'top' | number;
  };
  popoverStyle?: {};
  clickStyle?: {};
}

const MPopover = ({
  children,
  click,
  openBgColor = 'white',
  radius = 0,
  anchorOrigin,
  popoverStyle,
  clickStyle,
}: Props) => {
  return (
    <PopupState variant='popover' popupId='demo-popup-popover'>
      {(popupState) => {
        return (
          <div>
            <WrapClick
              openBgColor={popupState.isOpen ? openBgColor : 'transparent'}
              radius={radius}
              {...bindTrigger(popupState)}
              style={clickStyle}
            >
              {click}
            </WrapClick>
            <PopoverM
              style={popoverStyle}
              {...bindPopover(popupState)}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
              anchorOrigin={anchorOrigin}
            >
              {children}
            </PopoverM>
          </div>
        );
      }}
    </PopupState>
  );
};

export default MPopover;
