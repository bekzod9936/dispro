import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation, useQuery } from 'react-query';
import { useHistory } from 'react-router';
import Spinner from '../../../../components/Helpers/Spinner';
import {
  fetchPartnerCompanies,
  enterCompany,
} from '../../../../services/queries/PartnerQueries';
import {
  Container,
  PlusIcon,
  Wrap,
  Box,
  Text,
  Img,
  Main,
  ChooseText,
} from './style';
import { useAppDispatch } from '../../../../services/redux/hooks';
import { refetchCompanyList } from '../../../../services/redux/Slices/authSlice';
import LogoDef from '../../../../assets/icons/SideBar/logodefault.png';

const Companylist = () => {
  const history = useHistory();
  const { t } = useTranslation();
  const [id, setId] = useState(null);

  const company = useMutation((values: any) => enterCompany(values));

  const { data, isLoading, refetch, isFetching } = useQuery(
    'ListCompany',
    () => fetchPartnerCompanies(),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );

  const dispatch = useAppDispatch();
  dispatch(refetchCompanyList(refetch));

  const handleAddCompany = () => {
    history.push('/info');
  };

  const handleEnterCompany = (values: any) => {
    company.mutate(values, {
      onSuccess: (data) => {
        localStorage.setItem('companyId', data.data.data.companyId);
        localStorage.setItem('companyToken', data.data.data.accessToken);
        history.push('/statistics');
      },
    });
  };

  return (
    <Main>
      <ChooseText>{t('choose-company')}</ChooseText>
      {isLoading || isFetching ? (
        <Spinner />
      ) : data?.data.data.length === 0 ? (
        <Box onClick={handleAddCompany}>
          <Wrap border='1.5px dashed #606eea'>
            <PlusIcon />
          </Wrap>
          <Text color='#606EEA'>{t('addCompany')}</Text>
        </Box>
      ) : (
        <Container>
          <Box onClick={handleAddCompany}>
            <Wrap border='1.5px dashed #606eea'>
              <PlusIcon />
            </Wrap>
            <Text color='#606EEA'>{t('addCompany')}</Text>
          </Box>
          {data?.data.data.map((v: any) => (
            <Box
              key={v.company.id}
              onClick={() => {
                setId(v.company.id);
                handleEnterCompany({
                  companyId: v.company.id,
                  companyType: v.company.type,
                });
              }}
              loading={v.company.id === id ? company.isLoading : false}
            >
              <Wrap>
                <Img
                  src={v.company.logo === '' ? LogoDef : v.company.logo}
                  alt='Company-Logo'
                />
              </Wrap>
              <Text color='#223367'>{v.company.name}</Text>
            </Box>
          ))}
        </Container>
      )}
    </Main>
  );
};

export default Companylist;
