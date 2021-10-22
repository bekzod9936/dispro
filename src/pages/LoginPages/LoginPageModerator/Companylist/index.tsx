import { useState, useEffect } from 'react';
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
import Cookies from 'js-cookie';
import AddCompany from '../AddCompany';
import useLayout from 'components/Layout/useLayout';
import io from 'socket.io-client';
import { SOCKET_EVENT } from 'services/constants/chat';

const Companylist = () => {
  const history = useHistory();
  const { t } = useTranslation();
  const [id, setId] = useState(null);
  const [openPlus, setOpenPlus] = useState(false);

  const { headerData } = useLayout();

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
    setOpenPlus(true);
  };

  const handleEnterCompany = (values: any) => {
    company.mutate(values, {
      onSuccess: (data) => {
        localStorage.setItem('companyId', data.data.data.companyId);
        localStorage.setItem('companyToken', data.data.data.accessToken);
        if (
          Cookies.get('companyState') === 'new' ||
          !headerData.filled ||
          !headerData.filledAddress
        ) {
          history.push('/info');
        } else {
          history.push('/statistics');
        }
      },
    });
  };

  useEffect(() => {
    if (
      headerData.filled &&
      headerData.filledAddress &&
      Cookies.get('companyState') !== 'new'
    ) {
      console.log('connected');
      const socket = io(
        `${process.env.REACT_APP_WEBSOCKET_URL}/nsp_staff_svdfv8732f5rycf76f8732rvuy23cfi77c3u6fr2387frv8237vfidu23vf2vdd7324df4`,
        {
          path: '/',
          auth: {
            token: `Bearer ${localStorage.getItem('companyToken')}`,
          },
        }
      );

      socket.on(SOCKET_EVENT.CHAT_MODERATOR_TO_PARTNER, function (data: any) {
        console.log(data, 'm');
      });

      socket.on(SOCKET_EVENT.CHAT_CLIENT_TO_PARTNER, function (data: any) {
        console.log(data, 'p');
      });

      // dispatch(setSocketAction(socket));
      // dispatch(setModeratorSocket(socket));
    }
  }, [headerData.filled, headerData.filledAddress]);

  return openPlus ? (
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
                  onError={(e: any) => {
                    e.target.onerror = null;
                    e.target.src = LogoDef;
                  }}
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
