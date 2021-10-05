import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import CustomModal from '../../../components/Custom/CustomModal';
import HorizontalMenu from '../../../components/Custom/HorizontalMenu';
import { fetchInfo } from '../../../services/queries/PartnerQueries';
import { Flex } from '../../../styles/BuildingBlocks';
import {
  CustomButton,
  ModalComponent,
  PageWrapper,
  PageWrapperNoScroll,
} from '../../../styles/CustomStyles';
import AboutSection from './AboutSection';
import AddressSection from './AddressSection';
import PhotosSection from './PhotosSection';
import { Text } from '../../../styles/CustomStyles';
import { CancelIcon } from '../../../assets/icons/ClientsPageIcons/ClientIcons';
import {
  QuitBlackIcon,
  QuitWhiteIcon,
} from '../../../assets/icons/InfoPageIcons/InfoPageIcons';
import { useHistory } from 'react-router';
import { useAppDispatch } from '../../../services/redux/hooks';
import { setCompanyState } from '../../../services/redux/Slices/authSlice';

const InfoPage = () => {
  const [section, setSection] = useState('aboutCompany');
  const [infoState, setInfoState] = useState<any>();
  const history = useHistory();
  const dispatch = useAppDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const response = useQuery(['info'], fetchInfo, {
    onSuccess: (data) => {
      setInfoState(data.data.data);
      if (!data.data.data.annotation) {
        dispatch(setCompanyState('new'));
      }
    },
    refetchOnWindowFocus: false,
    retry: 0,
  });
  const handleCancel = () => {
    setModalVisible(false);
  };
  const { t } = useTranslation();
  const menuItems = [
    {
      key: 'aboutCompany',
      title: t('aboutCompany'),
    },
    {
      key: 'address',
      title: t('address'),
    },
    {
      key: 'photos',
      title: t('photos'),
    },
  ];
  const handleQuit = () => {
    localStorage.removeItem('companyId');
    localStorage.removeItem('companyToken');
    history.push('/partner/company');
  };

  const renderSection = () => {
    switch (section) {
      case 'aboutCompany':
        return (
          <AboutSection currentFilial={infoState} setSection={setSection} />
        );
      case 'address':
        return <AddressSection setSection={setSection} />;
      case 'photos':
        return <PhotosSection imgs={infoState.images} />;
    }
  };
  return (
    <PageWrapperNoScroll>
      <Flex margin='0px' justifyContent='space-between' width='90%'>
        <Flex
          width='40%'
          alignItems='center'
          margin='0px'
          justifyContent='space-between'
        >
          <HorizontalMenu
            menuItems={menuItems}
            section={section}
            menuItemClickHandler={(key: string) => setSection(key)}
          />
        </Flex>
        <div
          onClick={() => {
            setModalVisible(true);
          }}
        >
          <span style={{ marginRight: '10px' }}>{t('quit')} </span>
          <QuitBlackIcon />
        </div>
      </Flex>

      {infoState && renderSection()}
      <CustomModal open={modalVisible}>
        <ModalComponent style={{ padding: '40px' }}>
          <Flex
            justifyContent='space-between'
            flexDirection='column'
            alignItems='flex-start'
          >
            <div>
              <Text fontSize='18px'> Вы действительно хотите выйти?</Text>
            </div>
            <div style={{ width: '310px' }}>
              <Text fontSize='14px' fontWeight={300}>
                При выходе все данные которые вы заполнили автоматически
                удалятся
              </Text>
            </div>
            <div
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <CustomButton background='white' onClick={handleCancel}>
                <CancelIcon />
                <Text color='#223367' fontSize='16px' fontWeight={500}>
                  {t('cancel')}
                </Text>
              </CustomButton>
              <CustomButton onClick={handleQuit} background='#FF5E68'>
                <Text color='white'>{t('quit')}</Text>
                <QuitWhiteIcon />
              </CustomButton>
            </div>
          </Flex>
        </ModalComponent>
      </CustomModal>
    </PageWrapperNoScroll>
  );
};

export default InfoPage;
