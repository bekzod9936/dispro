import React, { useState } from 'react';
import Filter from '../../../components/Custom/Filter';
import { FilterIcon } from '../../../assets/icons/ClientStatisticsIcons/ClientStatisticsIcons';
import { Text, UnderSectionButton } from '../../../styles/CustomStyles';
import { IClientStatisticFilter } from '../../../services/Types/Components';
import { useTranslation } from 'react-i18next';
import { SectionWrapper } from '../../../styles/CustomStyles';
import {
  FilterWrap,
  CasherHeaderWrap,
  CasherInfo,
  CasherInfoWrap,
} from './style';
import Button from '../../../components/Custom/Button';
import {
  ExportIcon,
  DeleteIcon,
} from '../../../assets/icons/FinancePageIcons/FinaceIcons';
import IconButton from '@material-ui/core/IconButton';
import CustomTableMaterial from '../../../components/Custom/CustomTableMaterial';
import { casherColumns, casherBody } from './data';
const HistoryCasher = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(3);
  const [state, setstate] = useState(false);
  const filters: IClientStatisticFilter[] = [
    {
      title: 'byDate',
      inputType: 'date',
      request: 'chose_date',
      numOfInputs: ['from', 'to'],
      inputHandler: (value: any, index: number) => {
        if (index === 1) {
          console.log(value, 'true');
        } else {
          console.log(value, 'false');
        }
      },
      // dateFrom: clientState.dateFrom,
      // dateTo: clientState.dateTo,
    },
  ];
  const handlePageChange = (p: number) => {
    setPage(p);
  };
  return (
    <div>
      <CasherHeaderWrap>
        <CasherInfoWrap>
          <FilterWrap>
            <UnderSectionButton
              onClick={() => {
                setstate(!state);
              }}
              width='170px'
            >
              <span style={{ minHeight: '28px', minWidth: '28px' }}>
                <FilterIcon />
              </span>
              <Text>{t('filters')}</Text>
            </UnderSectionButton>

            {state && (
              <Filter
                top='60px'
                onApply={() => console.log(true)}
                filters={filters}
              />
            )}
          </FilterWrap>
          <CasherInfo margin='0 0 0 25px'>
            28 августа - 28 октября, 2020
            <IconButton
              size='small'
              style={{
                marginLeft: '7px',
              }}
            >
              <DeleteIcon />
            </IconButton>
          </CasherInfo>
          <CasherInfo margin='0 0 0 15px'>
            Ли Александра
            <IconButton
              size='small'
              style={{
                marginLeft: '7px',
              }}
            >
              <DeleteIcon />
            </IconButton>
          </CasherInfo>
        </CasherInfoWrap>
        <Button
          buttonStyle={{
            bgcolor: '#45A13B',
            shadow: '0px 4px 9pxrgba(96, 110, 234, 0.46)',
          }}
        >
          <ExportIcon />
          Экспортировать
        </Button>
      </CasherHeaderWrap>
      <CustomTableMaterial
        header={casherColumns}
        body={casherBody}
        onChange={handlePageChange}
        page={page}
        total={total}
        disabled={false}
        visable={10}
        headerHeight={120}
        twoheader={true}
      />
    </div>
  );
};

export default HistoryCasher;
