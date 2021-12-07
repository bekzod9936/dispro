import FilterReview from '../../components/FilterReview';
import Input from 'components/Custom/Input';
import { useState } from 'react';
import { useAppSelector } from 'services/redux/hooks';
import { useTranslation } from 'react-i18next';
import { formatPagination } from '../../utils';
import feedDef from 'assets/images/feedback.png';
import User from '../../components/User';
import Spinner from 'components/Custom/Spinner';
import useFeedBack from '../../hooks/useFeedBack';
import { NewPagination } from 'components/Custom/NewPagination';
import {
  SearchIcon,
  FilterWarp,
  WrapPag,
  Info,
  Content,
  Img,
  WrapDef,
  WrapDefPhoto,
  NoResult,
  Container,
} from './style';
import useWindowWidth from 'services/hooks/useWindowWidth';
import Stars from '../../components/Stars';

interface intialFilterProps {
  page?: number;
  cashierStaffId?: number | string;
  perPage?: number;
  rating?: number | string;
}

const Reviews = () => {
  const { t } = useTranslation();
  const { width } = useWindowWidth();

  const intialFilter = {
    page: 1,
    cashierStaffId: '',
    perPage: 6,
    rating: '',
  };

  const [filterValues, setFilterValues] =
    useState<intialFilterProps>(intialFilter);

  const [inpuSearch, setInpuSearch] = useState<string>('');
  const [searchFocus, setSearchFocus] = useState<boolean>(false);
  const [searchRes, setSearchRes] = useState<any[]>([]);
  const clients: any = useAppSelector((state) => state.feedbackPost.clients);

  const { resClients, totalCount, between } = useFeedBack({
    filterValues,
  });

  const handleSearch = (e: any) => {
    setInpuSearch(e.target.value);

    const searchResult: any = clients.filter((v: any) => {
      return (
        v.clientFirstName
          .toLowerCase()
          .includes(e.target.value?.toLowerCase()) ||
        v.clientLastName.toLowerCase().includes(e.target.value?.toLowerCase())
      );
    });

    setSearchRes(searchResult);
  };

  const handleChangePage = async (e: any) => {
    await setFilterValues({ ...filterValues, page: e });
    await resClients.refetch();
  };

  const isValue =
    (filterValues.cashierStaffId !== '' &&
      filterValues.cashierStaffId !== undefined) ||
    (filterValues.rating !== '' && filterValues.rating !== undefined);

  return (
    <Container>
      <FilterWarp isValue={isValue}>
        <Input
          IconStart={<SearchIcon />}
          inputStyle={{
            border: 'none',
            shadow: '0px 4px 4px rgba(0, 0, 0, 0.04)',
            outpadding: width > 600 ? '0 0 0 25px' : '0 0 0 10px',
            inpadding: width > 600 ? '0 20px 0 10px' : '0 10px 0 0',
            height: {
              desktop: 50,
              laptop: 45,
              planshet: 40,
              mobile: 36,
            },
          }}
          type='search'
          onChange={handleSearch}
          width={{ maxwidth: 280 }}
          margin={{ laptop: '0 20px 0 0', mobile: '0 10px 0 0' }}
          placeholder={t('searchbyclients')}
          onFocus={() => setSearchFocus(true)}
          onBlur={() => (inpuSearch === '' ? setSearchFocus(false) : null)}
          value={inpuSearch}
        />
        <FilterReview
          setFilterValues={setFilterValues}
          filterValues={filterValues}
        />
      </FilterWarp>

      {resClients.isLoading || resClients.isFetching ? (
        <Spinner />
      ) : clients.length === 0 ? (
        <WrapDefPhoto>
          <Img src={feedDef} alt='feedback' />
          <span>{t('feeddef')}</span>
        </WrapDefPhoto>
      ) : (
        <>
          {width > 600 ? null : <Stars />}
          <Content>
            <WrapDef>
              {!searchFocus || inpuSearch === '' ? (
                clients?.map((v: any) => <User value={v} />)
              ) : searchRes?.length === 0 ? (
                <NoResult>{t('noresult')}</NoResult>
              ) : (
                searchRes?.map((v: any) => <User value={v} />)
              )}
            </WrapDef>
            {clients.length > 0 ? (
              <WrapPag>
                <Info>
                  {t('shown')}
                  <span>{between}</span>
                  {t('from1')} <span>{totalCount}</span>
                  {formatPagination({
                    count: totalCount,
                    firstWord: t('review1'),
                    secondWord: t('review23'),
                  })}
                </Info>
                <NewPagination
                  onChange={handleChangePage}
                  currentPage={Number(filterValues.page)}
                  totalCount={Math.ceil(totalCount / intialFilter?.perPage)}
                />
              </WrapPag>
            ) : null}
          </Content>
        </>
      )}
    </Container>
  );
};

export default Reviews;
