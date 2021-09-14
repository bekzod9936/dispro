import React, { useState } from 'react';
import { Text, UnderSectionButton } from '../../../styles/CustomStyles';
import CustomTableMaterial from '../../../components/Custom/CustomTableMaterial';
import CustomDatePickerForUndersection from '../../../components/Custom/CustomDatePickerForUndersection';
import { CalendarIcon } from '../../../assets/icons/ClientStatisticsIcons/ClientStatisticsIcons';
import { ArrowDown } from '../../../assets/icons/ClientStatisticsIcons/Filters';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { columns, body } from './data';
import { fetchFinanceSuggestion } from '../../../services/queries/FinanceQueries';
import { useQuery } from 'react-query';

const SuggestionSection = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  let companyId = localStorage.getItem('companyId');
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(3);
  const [date, setDate] = useState(moment(Date.now()).format('YYYY/MM/DD'));

  const res = useQuery(['fetchSuggestionInfo', page], () =>
    fetchFinanceSuggestion({ id: companyId, page: page, perPage: 10 })
  );

  const handleDateChange = (v: string) => {
    setDate(v);
  };
  const handlePageChange = (p: number) => {
    setPage(p);
  };

  return (
    <div>
      <UnderSectionButton width='340px' margin='0px 0px 20px'>
        <span style={{ zIndex: 5000 }} onClick={() => setOpen(!open)}>
          <CalendarIcon />
        </span>
        <div>
          <div>
            <Text>{t('datePicker')}</Text>
          </div>
        </div>
        <CustomDatePickerForUndersection
          style={{ visibility: 'hidden', position: 'absolute' }}
          isOpen={open}
          top={300}
          left={190}
          date={date}
          handleDateChange={handleDateChange}
        />
        <ArrowDown />
      </UnderSectionButton>
      <CustomTableMaterial
        header={columns}
        body={body}
        onChange={handlePageChange}
        page={page}
        total={total}
        disabled={res.isLoading}
        visable={10}
      />
    </div>
  );
};

export default SuggestionSection;
