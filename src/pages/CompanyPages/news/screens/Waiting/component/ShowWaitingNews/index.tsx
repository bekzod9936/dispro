import React, { useState } from 'react';
import Title from 'components/Custom/Title';
import { deleteNews } from 'services/queries/newPageQuery';
import { useHistory } from 'react-router-dom';
import Button from 'components/Custom/Buttons/Button';
import Modal from 'components/Custom/Modal';
import dayjs from 'dayjs';
import { months } from '../../../useData/index';
import { CancelIcon } from 'assets/icons/news/newsIcons';
import { PenIcon } from 'assets/icons/news/newsIcons';
import { DeleteIcon } from 'assets/icons/proposals/ProposalsIcons';
import useWindowWidth from 'services/hooks/useWindowWidth';
import { useTranslation } from 'react-i18next';

import {
  Wrapper,
  DeleteModal,
  Content,
  Preview,
  MainWrapper,
  PreviewContent,
  ContentView,
  TitleNews,
  LongDescriptionNews,
  DescriptionNews,
  ContentButton,
} from './style';
import { GoBackIcon } from 'assets/icons/proposals/ProposalsIcons';
import iphone from 'assets/images/iphone.png';
import { useAppSelector } from 'services/redux/hooks';

const ShowWaitingNews = () => {
  const history = useHistory();
  const { t } = useTranslation();

  const selectedNews = useAppSelector((state) => state.news.selectedNews);
  const newsById = selectedNews?.fullData;
  const [isDeleteOpen, setDeleteOpen] = React.useState<boolean>(false);

  const [open, setOpen] = useState(true);
  const handleBack = () => {
    history.goBack();
  };
  const handleBackLaptop = () => {
    setOpen(false);
    history.goBack();
  };
  const editNews = () => {
    history.push('/news/edit');
  };

  React.useEffect(() => {
    if (newsById === undefined) {
      handleBack();
      handleBackLaptop();
    }
  }, []);
  const onDelete = async (id: number) => {
    await deleteNews(id);
    history.goBack();
  };

  const startDate = dayjs(newsById?.data?.startLifeTime).format('YYYY-MM-DD');
  const endDate = dayjs(newsById?.data?.endLifeTime).format('YYYY-MM-DD');
  const startdates = new Date(startDate);
  const enddates = new Date(endDate);
  const startmonthName = months[startdates.getMonth()];
  const endmonthName = months[enddates.getMonth()];
  const startDays = startdates.getDate();
  const endDays = enddates.getDate();
  const years = enddates.getFullYear();

  const date =
    startDays +
    ' ' +
    startmonthName +
    ' - ' +
    endDays +
    ' ' +
    endmonthName +
    '' +
    years;

  return (
    <MainWrapper>
      <div style={{ display: 'flex', marginBottom: 30, alignItems: 'center' }}>
        <GoBackIcon
          onClick={handleBack}
          style={{ marginRight: '25px', cursor: 'pointer' }}
        />
        <Title>
          {newsById?.data?.title?.length > 30
            ? newsById?.data?.title?.slice(0, 30) + '...'
            : newsById?.data?.title}
        </Title>
      </div>
      <Wrapper>
        <Preview>
          <img
            style={{ objectFit: 'fill' }}
            className='couponImg'
            src={newsById?.data?.image}
            alt=''
          />
          <img className='iphoneImg' max-width='300px' src={iphone} />
          <PreviewContent>
            <h5>
              <span>{newsById?.data?.title}</span>
            </h5>
            <p>
              {newsById?.data?.description.length > 250
                ? newsById?.data?.description?.slice(0, 250) + '...'
                : newsById?.data?.description}
            </p>
            <div>
              <span style={{ color: 'white', fontSize: '12px' }}>
                {t('Написать нам')}
              </span>
            </div>
          </PreviewContent>
          <div>
            <Content>
              <ContentView>
                <div style={{ padding: '0 0 0 50px' }}>
                  <h5>{t('Название новости')}</h5>
                  <TitleNews>{newsById?.data?.title}</TitleNews>
                  <h5>{t('Описание новости')}</h5>
                  {newsById?.data?.description?.length > 790 ? (
                    <LongDescriptionNews>
                      {newsById?.data?.description}
                    </LongDescriptionNews>
                  ) : (
                    <DescriptionNews>
                      {newsById?.data?.description}
                    </DescriptionNews>
                  )}

                  <div style={{ display: 'flex' }}>
                    <ContentButton
                      style={{
                        paddingRight: '5%',
                      }}
                    >
                      <Button
                        onClick={() => editNews()}
                        buttonStyle={{
                          color: 'white',
                          bgcolor: '#606EEA',
                          shadow: '0px 4px 9px rgba(96, 110, 234, 0.46)',
                        }}
                        startIcon={<PenIcon />}
                      >
                        {t('Редактировать')}
                      </Button>
                    </ContentButton>
                    <ContentButton style={{ paddingRight: '50%' }}>
                      <Button
                        onClick={() => setDeleteOpen(true)}
                        buttonStyle={{
                          color: '#ffffff',
                          bgcolor: '#FF5E68',
                          shadow: '0px 4px 9px rgba(255, 94, 104, 0.46)',
                        }}
                        startIcon={<DeleteIcon />}
                      >
                        {t('Удалить')}
                      </Button>
                    </ContentButton>
                  </div>
                </div>
                <div style={{ padding: '0 20px 0 50px' }}>
                  {' '}
                  <h5>{t('Информация')}</h5>
                  <p>
                    {newsById?.data?.genderType === 1
                      ? 'Только для мужчин'
                      : newsById?.data?.genderType === 2
                      ? 'Только для женщины'
                      : 'Для всех'}
                  </p>
                  <p>
                    {t('Срок публикации')}: {date}
                  </p>
                  <p>
                    {t('Возрастное ограничение')}:{' '}
                    {newsById?.data?.ageFrom + '+'}
                  </p>
                </div>
              </ContentView>
            </Content>
          </div>
        </Preview>
        <Modal open={isDeleteOpen}>
          <DeleteModal>
            <h5>{t('deleteNewsTitle')}</h5>
            <p>{t('deleteNewsText')}</p>
            <Button
              buttonStyle={{ color: '#223367', bgcolor: '#ffffff' }}
              margin={{ laptop: '0 22px 0 0' }}
              onClick={() => setDeleteOpen(false)}
              startIcon={<CancelIcon />}
            >
              {t('Отмена')}
            </Button>
            <Button
              buttonStyle={{
                bgcolor: '#FF5E68 ',
                shadow: '0px 4px 9px rgba(255, 94, 104, 0.46)',
              }}
              onClick={() => onDelete(newsById?.data?.id)}
              startIcon={<DeleteIcon />}
            >
              {t('Удалить')}
            </Button>
          </DeleteModal>
        </Modal>
      </Wrapper>
    </MainWrapper>
  );
};

export default ShowWaitingNews;
