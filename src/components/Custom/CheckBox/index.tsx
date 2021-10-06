import React from 'react';
import { MCheckBox, Label } from './style';

interface Props {
  id: string;
  onChange: (e: any) => void;
}

const CheckBox = () => {
  return (
    <>
      {/* <MCheckBox
        id='aroundTheClock'
        color='primary'
        checked={check}
        onChange={handleCheck}
      />
      <Label htmlFor='aroundTheClock'>{t('24/7')}</Label>; */}
    </>
  );
};

export default CheckBox;
