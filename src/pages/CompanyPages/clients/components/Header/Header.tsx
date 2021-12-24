import { ButtonsWrapper, Flex, SubTitle } from '../../style/style';
import Title from 'components/Custom/Title';
import Input from 'components/Custom/Input';
import { useTranslation } from 'react-i18next';
import { MFilter } from './components/Filter';
import NewDatePicker from 'components/Custom/DatePicker';
import { SearchIcon } from 'components/Layout/Header/style';
import { PlanshetHeader, SelectedFilters, Wrapper } from './style';
import { useHandleGetFilters } from '../../utils/getSelectedFilters';
import { useAppDispatch, useAppSelector } from 'services/redux/hooks';
import { removeFilter, setPeriod } from 'services/redux/Slices/clients';
import { useWindowSize } from '../../hooks/useWindowSize';
import Button from 'components/Custom/Buttons/Button';
import { QRIcon } from 'assets/icons/ClientsPageIcons/ClientIcons';

interface IProps {
  query: string;
  setQuery: any;
  setModals: (arg: any) => void;
}

export const Header = ({ query, setQuery, setModals }: IProps) => {
  const { t } = useTranslation();
  const { totalCount, filters, referals } = useAppSelector(
    (state) => state.clients
  );
  const activeFilters = useHandleGetFilters({
    filters,
    handleRemove,
    referals,
  });

  const dispatch = useAppDispatch();
  const { width } = useWindowSize();
  function handleRemove(key: string) {
    dispatch(removeFilter(key));
  }

  const handlePickDate = (date: string) => {
    dispatch(setPeriod(date));
  };

  return (
    <Wrapper>
      <Flex>
        <Title>{t('clients')}</Title>
        <SubTitle>{`${t('totalClients')}: ${totalCount}`}</SubTitle>
      </Flex>
      <PlanshetHeader>
        <Input
          placeholder='Поиск по клиентам'
          inputStyle={{ border: 'none' }}
          IconStart={<SearchIcon style={{ marginLeft: 20 }} />}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          width={{ maxwidth: 700 }}
        />
        <ButtonsWrapper marginBottom={20} marginTop={20}>
          <MFilter />
          {width > 1000 && (
            <NewDatePicker onChange={(e) => handlePickDate(e)} />
          )}
          <Button
            margin={{
              laptop: '0 20px',
              mobile: '0 0 0 8px',
              planshet: '0 15px 0 0',
            }}
            onClick={() =>
              setModals((prev: any) => ({ ...prev, qrModal: true }))
            }
            buttonStyle={{
              shadow: '0px 4px 4px rgba(0, 0, 0, 0.04)',
              bgcolor: 'white',
              color: '#223367',
              weight: 500,
              height: {
                mobile: 36,
              },
            }}
            startIcon={
              <QRIcon style={width <= 600 ? { height: 16, width: 16 } : {}} />
            }
          >
            {t('invite')}
          </Button>
        </ButtonsWrapper>
      </PlanshetHeader>
      {Boolean(activeFilters.length) && (
        <SelectedFilters>{activeFilters}</SelectedFilters>
      )}
    </Wrapper>
  );
};
