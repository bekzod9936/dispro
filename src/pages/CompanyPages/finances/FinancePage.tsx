import React, { useState } from 'react';
import {
  TiTle,
  Container,
  InfoBox,
  InfoHeader,
  InfoBody,
  InfoWarpper,
  Wrap,
} from './style';
import { Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import HorizontalMenu from '../../../components/Custom/HorizontalMenu';
import SuggestionSection from './SuggestionSection';
import PaymentInPlace from './PaymentInPlace';
import Cashback from './Cashback';
import HistoryCasher from './HistoryCasher';

const FinancePage = () => {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState<string>('suggest');

  const menuItems = [
    {
      key: 'suggest',
      title: t('proposals'),
    },
    {
      key: 'payment',
      title: t('p2p'),
    },
    {
      key: 'cashback',
      title: t('cashbackSum'),
    },
    {
      key: 'casher',
      title: t('byCashiers'),
    },
  ];

  const renderSection = () => {
    switch (currentPage) {
      case 'suggest':
        return <SuggestionSection />;
      case 'payment':
        return <PaymentInPlace />;
      case 'cashback':
        return <Cashback />;
      case 'casher':
        return <HistoryCasher />;
    }
  };

  const menuItemClickHandler = (value: string) => {
    setCurrentPage(value);
  };

  return (
    <Container>
      <Wrap>
        <TiTle>{t('finances')}</TiTle>
        <Grid container style={{ height: '100%', margin: '5px 0' }}>
          <Grid item lg={12}>
            <Grid item lg={7}>
              <HorizontalMenu
                section={currentPage}
                menuItems={menuItems}
                menuItemClickHandler={menuItemClickHandler}
              />
            </Grid>
            {renderSection()}
          </Grid>
        </Grid>
        {currentPage !== 'casher' ? (
          <InfoWarpper>
            <InfoBox>
              <InfoHeader>Всего оплачено UZS</InfoHeader>
              <InfoBody margin='6px 0'>5 670 260</InfoBody>
            </InfoBox>
            <InfoBox>
              <InfoHeader>Комиссия DIS (UZS)</InfoHeader>
              <InfoBody margin='6px 0 0'>56 702,6</InfoBody>
            </InfoBox>
          </InfoWarpper>
        ) : null}
      </Wrap>
    </Container>
  );
};

export default FinancePage;
