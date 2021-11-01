import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import Spinner from 'components/Helpers/Spinner';
import { enterCompany } from 'services/queries/PartnerQueries';
import { useAppDispatch, useAppSelector } from 'services/redux/hooks';
import {
  refetchCompanyList,
  setBackAddCompany,
  setRegFilled,
} from 'services/redux/Slices/authSlice';
import LogoDef from 'assets/icons/SideBar/logodefault.png';
import AddCompany from '../AddCompany';
import useLayout from 'components/Layout/useLayout';
import useList from './useList';
import {
  Container,
  PlusIcon,
  Wrap,
  Box,
  Text,
  Img,
  Main,
  ChooseText,
  ImgDiv,
} from './style';
import { useHistory } from 'react-router';

const Companylist = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [id, setId] = useState(null);
  const history = useHistory();

  const { data, isLoading, refetch, isFetching } = useList();

  const backAddCompany = useAppSelector((state) => {
    return state.auth.backAddCompany;
  });

  const regFilled = useAppSelector((state) => {
    return state.auth.regFilled;
  });

  const company = useMutation((values: any) => enterCompany(values), {
    onSuccess: async (data) => {
      await localStorage.setItem('companyId', data.data.data.companyId);
      await localStorage.setItem('companyToken', data.data.data.accessToken);
      if (regFilled?.filled && regFilled.filledAddress) {
        await history.push('/statistics');
      } else {
        await history.push('/info');
      }
    },
  });

  dispatch(refetchCompanyList(refetch));

  const handleAddCompany = () => {
    dispatch(setBackAddCompany(true));
  };

  const handleEnterCompany = async (values: any) => {
    await company.mutate(values);
  };

  return backAddCompany ? (
    <AddCompany />
  ) : (
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
              onClick={async () => {
                await setId(v.company.id);
                await dispatch(
                  setRegFilled({
                    filled: v.company.filled,
                    filledAddress: v.company.filledAddress,
                  })
                );
                await handleEnterCompany({
                  companyId: v.company.id,
                  companyType: v.company.type,
                });
              }}
              style={{
                pointerEvents: company.isLoading ? 'none' : 'all',
              }}
              loading={v.company.id === id ? company.isLoading : false}
            >
              <Wrap>
                <ImgDiv>
                  <Img
                    src={v.company.logo === '' ? LogoDef : v.company.logo}
                    alt='Company-Logo'
                    objectFit='contain'
                  />
                </ImgDiv>
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
