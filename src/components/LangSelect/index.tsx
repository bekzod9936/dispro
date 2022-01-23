import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core';
import useWindowWidth from 'services/hooks/useWindowWidth';
import { Container, MSelect, IconWrap, ArrowIcon, Option } from './style';
import { RuFlagIcons } from '../../assets/icons/LoginPage/LoginPageIcons';
import { EnFlagIcons } from '../../assets/icons/LoginPage/LoginPageIcons';
import { UzFlagIcons } from '../../assets/icons/LoginPage/LoginPageIcons';

interface Props {
  border?: string;
}

const LangSelect = ({ border }: Props) => {
  const { t, i18n } = useTranslation();
  const { width } = useWindowWidth();

  const handleChange = (lang: string) => {
    localStorage.setItem('language', lang);
    i18n.changeLanguage(lang);
  };

  const [open, setOpen] = useState(false);
  const useStyles = makeStyles({
    paper: {
      marginTop:
        width > 1500
          ? 75
          : width < 1500 && width > 600
          ? 65
          : width < 600
          ? 55
          : 0,
    },
  });

  const classes = useStyles();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const renderValue = (e: any) => {
    return e === 'ru'
      ? t('rus')
      : e === 'uz'
      ? t('uzb')
      : e === 'en'
      ? t('ang')
      : t('rus');
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
      <MSelect
        disableUnderline
        defaultValue={localStorage.getItem('language') || 'ru'}
        border={border}
        onChange={(e: any) => handleChange(e.target.value)}
        IconComponent={() => (
          <IconWrap display={border} open={open}>
            <ArrowIcon />
          </IconWrap>
        )}
        onOpen={handleOpen}
        onClose={handleClose}
        MenuProps={{
          style: {
            zIndex: width < 600 ? 9999999 : 1300,
          },
          PaperProps: {
            className: classes.paper,
          },
        }}
        renderValue={width < 600 && !border ? renderValue : undefined}
      >
        {options?.map((v, i) => (
          <Option key={i} value={v?.id}>
            {v?.value}
          </Option>
        ))}
      </MSelect>
    </Container>
  );
};

export default LangSelect;
