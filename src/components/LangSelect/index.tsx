import React from 'react';
import Select from '../Custom/Select';
import { Container } from './style';
import { useTranslation } from 'react-i18next';
import { Arrow } from '../../assets/icons/LoginPage/LoginPageIcons';
import { RuFlagIcons } from '../../assets/icons/LoginPage/LoginPageIcons';
import { EnFlagIcons } from '../../assets/icons/LoginPage/LoginPageIcons';
import { UzFlagIcons } from '../../assets/icons/LoginPage/LoginPageIcons';

interface Props {
  border?: string;
}

const LangSelect = ({ border }: Props) => {
  const { t } = useTranslation();

  const handleChange = (v: any) => {
    localStorage.setItem('language', v);
  };

  const options = [
    {
      id: 'ru',
      value: (
        <>
          <RuFlagIcons />
          {t('russian')}
        </>
      ),
    },
    {
      id: 'uz',
      value: (
        <>
          <UzFlagIcons />
          {t('uzbek')}
        </>
      ),
    },
    {
      id: 'en',
      value: (
        <>
          <EnFlagIcons />
          {t('english')}
        </>
      ),
    },
  ];

  return (
    <Container>
      <Select
        onChange={handleChange}
        width='fit-content'
        minWidth={200}
        height='70px'
        minHeight={45}
        maxHeight={60}
        radius={46}
        bgcolor='transparent'
        border={border ? border : '1px solid #223367'}
        tcolor='#223367'
        defaultValue={localStorage.getItem('language') || 'ru'}
        options={options}
        Icon={Arrow}
        paddingLeft={20}
      />
    </Container>
  );
};

export default LangSelect;
