import React from 'react';
import { CustomSearchInput, Header } from '../../styles/CustomStyles';
import DepositIcon from '../../assets/icons/DepositIcon';
import ShieldIcon from '../../assets/icons/ShieldIcon';
import SectionItem, { ISectionItem } from './Section';
import LanguageSelectComponent from './LanguageSelectComponent';
import BellIcon from '../../assets/icons/BellIcon';
import CompanySelect from './CompanySelect';
import { Grid, Input, InputAdornment } from '@material-ui/core';
import { SearchIcon } from '../../assets/icons/Others/LayoutIcons';
const PartnerHeader = () => {
  const SectionItems: ISectionItem[] = [
    {
      Icon: DepositIcon,
      title: 'Депозит:',
      extra: `3750000UZS`,
    },
    {
      Icon: ShieldIcon,
      title: 'Лимит:',
      extra: `100000UZS`,
    },
  ];

  return (
    <Header>
      <Grid container alignItems='center'>
        <Grid item lg={4} md={4}>
          <Grid item lg={11}>
            <Input
              disableUnderline
              style={{
                background: '#F4F4F4',
                padding: '12px 25px',
                borderRadius: '35px',
                width: '100%',
              }}
              placeholder='Поиск'
              startAdornment={
                <InputAdornment position='start'>
                  <SearchIcon />
                </InputAdornment>
              }
            />
          </Grid>
        </Grid>
        <Grid container lg={3} md={4}>
          {SectionItems.map((item: ISectionItem, index) => {
            return (
              <Grid item lg={index === 0 ? 6 : 5}>
                {' '}
                <SectionItem {...item} />{' '}
              </Grid>
            );
          })}
        </Grid>
        <Grid container lg={5}>
          <Grid container lg={2} md={2}>
            <Grid item lg={6}></Grid>
            <Grid item lg={6}>
              <BellIcon />
            </Grid>
          </Grid>

          <Grid item lg={5}>
            <Grid lg={12}>
              <LanguageSelectComponent />
            </Grid>
          </Grid>
          <Grid item lg={5}>
            <Grid lg={12}>
              <CompanySelect />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Header>
  );
};

export default PartnerHeader;
