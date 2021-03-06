import {
  CancelIcon,
  CloseIcon,
} from 'assets/icons/ClientsPageIcons/ClientIcons';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import {
  WatchIcons,
  WatchIconsWhite,
  DeleteIcon,
  DeletePlanshetIcon,
  PublishIcon,
  RepairNewsIcon,
  PenIconPlanshet,
  WhitePublishIcon,
} from 'assets/icons/news/newsIcons';

import Button from 'components/Custom/Buttons/Button';
import Modal from 'components/Custom/Modal';

import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router';
import { deleteNews } from 'services/queries/newPageQuery';
import { IDeferred } from 'services/redux/Slices/news/types';
import { PublicModal } from './components/PublicModal';
import { PenIcon } from 'assets/icons/news/newsIcons';
import useWindowWidth from 'services/hooks/useWindowWidth';
import { usePermissions } from "services/hooks/usePermissions";
import {
  Wrapper,
  Header,
  DeleteModal,
  ContentInfo,
  ContentSideBar,
  PreviewDivNews,
  ContentButton,
  LeftRound,
  PreviewBgNews,
  WrapperModal,
  CloseButton,
  WrapIcon,
  WrapAvatar,
  Box,
  WrapBoxDetail,
  BoxinfoDetail,
  TitleSideBar,
  ButtonView,
} from './style';

import { useTranslation } from 'react-i18next';

interface IProps {
  onClose: (arg: boolean) => void;
  currentNews: IDeferred;
  refetch: any;
}
export const NewsBar = ({ refetch, onClose, currentNews }: IProps) => {
  const history = useHistory();
  const location = useLocation();
  const { width } = useWindowWidth();
  const { t } = useTranslation();
  const [isDeleteOpen, setDeleteOpen] = React.useState<boolean>(false);
  const [isPublishOpen, setPublisOpen] = React.useState<boolean>(false);
  const isEditable=usePermissions('news')

  const showNew = () => {
    if (currentNews) {
      history.push('/news/showwaiting');
    }
  };

  const editNews = () => {
    history.push('/news/edit');
  };

  const restoreNews = () => {
    if (currentNews) {
      history.push('/news/repair');
    }
  };

  const onDelete = async () => {
    await deleteNews(currentNews?.data?.id);
    await refetch.refetch();
    setDeleteOpen(false);
    onClose(false);
  };

  return (
    <Wrapper>
      <Header>
        <h6>{t('??????????????')}</h6>
        <CloseIcon onClick={onClose} style={{ cursor: 'pointer' }} />
      </Header>
      {/* <Preview> */}
      {width > 1000 ? (
        <LeftRound>
          <PreviewDivNews>
            {currentNews?.data?.image?.length > 6 && (
              <PreviewBgNews src={currentNews?.data?.image} alt='' />
            )}
            <img
              style={{ zIndex: 20, position: 'relative', objectFit: 'fill' }}
              width='320'
              height='180'
              alt=''
            />
          </PreviewDivNews>
          <h5>
            {currentNews?.data?.title?.length > 50
              ? currentNews?.data?.title?.slice(0, 30) + '...'
              : currentNews?.data?.title}
          </h5>
          <p style={{ wordBreak: 'break-all' }}>
            {currentNews?.data?.description?.length > 66
              ? currentNews?.data?.description?.slice(0, 66) + '...'
              : currentNews?.data?.description}
          </p>
        </LeftRound>
      ) : (
        <WrapAvatar>
          <>
            <WrapIcon>
              <LazyLoadImage
                alt='avatar'
                height='50px'
                src={currentNews?.data?.image}
                width='50px'
                effect='blur'
                style={{
                  objectFit: 'cover',
                  borderRadius: '14px',
                }}
              />
            </WrapIcon>
            <TitleSideBar>
              <div style={{ display: 'block', marginLeft: '10px' }}>
                <p>{currentNews?.data?.title}</p>
                <span>{currentNews?.data?.pushUp ? 'Push-up' : ''}</span>
              </div>
            </TitleSideBar>
          </>
        </WrapAvatar>
      )}

      <ContentSideBar>
        {width > 600 && width <= 1000 ? (
          <ContentInfo>
            <h5>{t('description')}</h5>
            <TitleSideBar>
              <h4>{currentNews?.data?.description}</h4>
            </TitleSideBar>

            <h5>{t('information')}</h5>
            <p>
              {currentNews?.data?.genderType === 0
                ? t('?????? ????????')
                : currentNews?.data?.genderType === 1
                ? t('???????????? ?????? ????????????')
                : t('???????????? ?????? ????????????')}
            </p>
            <p>
              {t('publishDate')}: {currentNews?.date}
            </p>
            <p style={{ marginBottom: '20px' }}>
              {t('age_limit')}: {currentNews?.data?.ageFrom}+
            </p>
            {currentNews?.data?.pushUp ? (
              <div>
                <h5>{t('pushUpStatistics')}</h5>
                <WrapBoxDetail>
                  <Box>
                    <BoxinfoDetail>{`?????????????????????? ????????????????: ${currentNews?.data?.stat?.get?.total} ??????`}</BoxinfoDetail>
                    <BoxinfoDetail>
                      {`?????????????????????? ??????????????????????:${currentNews?.data?.stat?.view?.total} ??????`}
                      <br />
                      <span
                        style={{ fontSize: '14px', color: '#606EEA' }}
                      >{`${currentNews?.data?.stat?.view?.male} ??????`}</span>
                      <span style={{ fontSize: '14px', color: '#FF56BB' }}>
                        {' ' + `${currentNews?.data?.stat?.view?.female} ??????`}
                      </span>
                    </BoxinfoDetail>
                    <BoxinfoDetail>
                      {`?????????????????? ????????????: ${currentNews?.data?.stat?.paid?.total} ??????`}
                      <br />
                      <span
                        style={{ fontSize: '14px', color: '#606EEA' }}
                      >{`${currentNews?.data?.stat?.paid?.male} ??????`}</span>
                      <span style={{ fontSize: '14px', color: '#FF56BB' }}>
                        {' ' + `${currentNews?.data?.stat?.paid?.female} ??????`}
                      </span>
                    </BoxinfoDetail>
                  </Box>
                </WrapBoxDetail>
              </div>
            ) : (
              ''
            )}
          </ContentInfo>
        ) : (
          <ContentInfo>
            <h5>{t('information')}</h5>
            <p>
              {currentNews?.data?.genderType === 0
                ? '?????? ????????'
                : currentNews?.data?.genderType === 1
                ? '???????????? ?????? ????????????'
                : `???????????? ?????? ????????????`}
            </p>
            <p>
              {t('publishDate')}: {currentNews?.date}
            </p>
            <p>
              {t('age_limit')}: {currentNews?.data?.ageFrom}+
            </p>
          </ContentInfo>
        )}

        <ContentButton>
          {location.pathname === '/news/waiting' && width > 1000 && (
            <ButtonView>
              <Button
                onClick={() => showNew()}
                buttonStyle={{
                  color: '#606EEA',
                  bgcolor: ' rgba(96,110,234,0.1)',
                }}
                startIcon={<WatchIcons />}
              >
                {t('seeFull')}
              </Button>
            </ButtonView>
          )}
          {location.pathname === '/news/active' && width > 1000 && (
            <ButtonView>
              <Button
                onClick={() => showNew()}
                buttonStyle={{
                  color: '#fff',
                  bgcolor: '#606EEA',
                  shadow: '0px 4px 9px rgba(96, 110, 234, 0.46)',
                }}
                startIcon={<WatchIconsWhite />}
              >
                {t('seeFull')}
              </Button>
            </ButtonView>
          )}
          {location.pathname === '/news/active' &&
            width > 600 &&
            width <= 1000 && (
              <ButtonView>
                <Button
                     disabled={isEditable==false}
                  onClick={() => editNews()}
                  buttonStyle={{
                    color: '#fff',
                    bgcolor: '#606EEA',
                    shadow: '0px 4px 9px rgba(96, 110, 234, 0.46)',
                    height: { planshet: 45 },
                  }}
                  endIcon={
                    width > 325 && (
                      <PenIcon style={{ height: 15, width: 13.5 }} />
                    )
                  }
                >
                  {t('edit')}
                </Button>
              </ButtonView>
            )}
          {location.pathname === '/news/waiting' && width > 1000 && (
            <ButtonView
              style={{
                marginTop: '25px',
              }}
            >
              <Button
                onClick={() => setPublisOpen(true)}
                buttonStyle={{
                  color: '#606EEA',
                  bgcolor: ' rgba(96,110,234,0.1)',
                }}
                startIcon={<PublishIcon />}
              >
                {t('publish')}
              </Button>
            </ButtonView>
          )}

          {location.pathname === '/news/waiting' &&
            width > 600 &&
            width <= 1000 && (
              <ButtonView
                style={{
                  marginTop: '25px',
                }}
              >
                <Button
                  onClick={() => setPublisOpen(true)}
                  buttonStyle={{
                    color: '#fff',
                    bgcolor: '#606EEA',
                    shadow: ' 0px 4px 9px rgba(96, 110, 234, 0.46)',
                    height: { planshet: 45 },
                  }}
                  endIcon={width > 325 && <WhitePublishIcon />}
                >
                  {t('publish')}
                </Button>
                <ButtonView
                  style={{
                    marginTop: '25px',
                  }}
                >
                  <Button
                       disabled={isEditable==false}
                    onClick={() => editNews()}
                    buttonStyle={{
                      color: '#606EEA',
                      bgcolor: ' rgba(96,110,234,0.1)',
                      height: { planshet: 45 },
                    }}
                    endIcon={
                      width > 325 && (
                        <PenIconPlanshet style={{ height: 15, width: 13.5 }} />
                      )
                    }
                  >
                    {t('edit')}
                  </Button>
                </ButtonView>
              </ButtonView>
            )}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'flex-end',
              paddingTop: '5%',
            }}
          >
            {location.pathname !== '/news/archive' && width > 1000 && (
              <Button
              disabled={isEditable==false}
                onClick={() => setDeleteOpen(true)}
                buttonStyle={{
                  color: '#ffffff',
                  bgcolor: '#FF5E68',
                  shadow: '0px 4px 9px rgba(255, 94, 104, 0.46)',
                }}
                startIcon={<DeleteIcon />}
              >
                {t('delete')}
              </Button>
            )}
            {location.pathname !== '/news/archive' &&
              width > 600 &&
              width <= 1000 && (
                <Button
                disabled={isEditable==false}
                  onClick={() => setDeleteOpen(true)}
                  buttonStyle={{
                    color: '#ffffff',
                    bgcolor: '#FF5E68',
                  }}
                  endIcon={<DeletePlanshetIcon />}
                >
                  {t('delete')}
                </Button>
              )}
            {location.pathname === '/news/archive' && width > 1000 && (
              <Button
              disabled={isEditable==false}
                onClick={() => restoreNews()}
                buttonStyle={{
                  color: '#ffffff',
                  bgcolor: '#606EEA',
                  shadow: '0px 4px 9px rgba(96, 110, 234, 0.46)',
                }}
                startIcon={<RepairNewsIcon />}
              >
                {t('resetNews')}
              </Button>
            )}
            {location.pathname === '/news/archive' &&
              width > 600 &&
              width < 1000 && (
                <Button
                disabled={isEditable==false}
                  onClick={() => restoreNews()}
                  buttonStyle={{
                    color: '#ffffff',
                    bgcolor: '#606EEA',
                    shadow: '0px 4px 9px rgba(96, 110, 234, 0.46)',
                    height: { planshet: 45 },
                  }}
                  endIcon={<RepairNewsIcon />}
                >
                  {t('resetNews')}
                </Button>
              )}
          </div>
        </ContentButton>
      </ContentSideBar>
      <Modal open={isDeleteOpen}>
        <DeleteModal>
          <h5> {t('deleteNewsTitle')} </h5>
          <p>{t('deleteNewsText')}</p>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              buttonStyle={{ color: '#223367', bgcolor: '#ffffff' }}
              margin={{ laptop: '0 22px 0 0' }}
              onClick={() => setDeleteOpen(false)}
              startIcon={<CancelIcon />}
            >
              {t('cancellation')}
            </Button>
            <Button
             disabled={isEditable==false}
              buttonStyle={{
                bgcolor: '#FF5E68 ',
                shadow: '0px 4px 9px rgba(255, 94, 104, 0.46)',
              }}
              onClick={onDelete}
              startIcon={<DeleteIcon />}
            >
              {t('delete')}
            </Button>
          </div>
        </DeleteModal>
      </Modal>
      <Modal modalStyle={{ bgcolor: '#fff' }} open={isPublishOpen}>
        <WrapperModal>
          <CloseButton onClick={() => setPublisOpen(false)}>
            <CloseIcon />
          </CloseButton>
          <h3>{t('datePicker')}</h3>
          <PublicModal setPublisOpen={setPublisOpen} />
        </WrapperModal>
      </Modal>
    </Wrapper>
  );
};
