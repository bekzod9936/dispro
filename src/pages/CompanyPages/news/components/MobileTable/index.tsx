import { ReactComponent as LeftBack } from 'assets/icons/FinanceIcons/leftback.svg';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { useState } from 'react';
import Button from 'components/Custom/Buttons/Button';
import { PenIcon } from 'assets/icons/news/newsIcons';
import { CancelIcon } from 'assets/icons/news/newsIcons';
import {
  WhitePublishIcon,
  BluePenIcon,
  RepairNewsIcon,
} from 'assets/icons/news/newsIcons';
import { IconButton } from '@material-ui/core';

import { useAppDispatch } from 'services/redux/hooks';
import { deleteNews } from 'services/queries/newPageQuery';
import { setSelectedNews } from 'services/redux/Slices/news';
import useWindowWidth from 'services/hooks/useWindowWidth';
import { DeleteIcon } from 'assets/icons/proposals/ProposalsIcons';
import { useLocation } from 'react-router-dom';
import FullModal from 'components/Custom/FullModal';
import { useTranslation } from 'react-i18next';
import Modal from 'components/Custom/Modal';
import { PublicModal } from '../NewsBar/components/PublicModal';
import { useHistory } from 'react-router-dom';
import {
  Container,
  Data,
  FullName,
  Title,
  Amount,
  Wrapper,
  Header,
  ModalContent,
  WrapBox,
  Box,
  MobileContent,
  WrapBoxDetail,
  BoxinfoDetail,
  BoxInfo,
  WrapMain,
  WrapIcon,
  PinkIcon,
  WrapAvatar,
  DeleteModal,
  Buttons,
} from './style';
import { WrapperModal, CloseButton } from '../NewsBar/style';
import { CloseIcon } from 'assets/icons/news/newsIcons';
interface Props {
  data?: any;
  refetch: any;
}

const MobileTable = ({ refetch, data }: Props) => {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState<any>(null);
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { t } = useTranslation();

  const [isDeleteOpen, setDeleteOpen] = useState<boolean>(false);
  const [isPublishOpen, setPublisOpen] = useState<boolean>(false);
  const { width } = useWindowWidth();

  const location = useLocation();

  const onDeleteOpen = async () => {
    setDeleteOpen(true);
  };
  const onDeleteAction = async (id: number) => {
    await deleteNews(id);
    await refetch.refetch();
    setDeleteOpen(false);
  };
  const handlePublic = async (id: any) => {
    await dispatch(setSelectedNews(id));
    setPublisOpen(true);
  };
  const handleEdit = async (id: any) => {
    await dispatch(setSelectedNews(id));
    if (id) {
      setTimeout(() => history.push('/news/edit'), 1000);
    }
  };

  const handleRepair = async (id: any) => {
    await dispatch(setSelectedNews(id));
    if (id) {
      setTimeout(() => history.push('/news/repair'), 1000);
    }
  };

  return (
    <Container>
      {data?.map((a: any, i: number) => {
        const info = a.fullData?.data;
        const weekdays = a.fullData?.data?.settings?.weekDays?.map(
          (label: any) => {
            return {
              item:
                label === 1
                  ? '????'
                  : label === 2
                  ? '????'
                  : label === 3
                  ? '????'
                  : label === 4
                  ? '????'
                  : label === 5
                  ? '????'
                  : label === 6
                  ? '????'
                  : '????',
            };
          }
        );

        return (
          <>
            <Data
              onClick={() => {
                setOpen(true);
                setId(i);
              }}
            >
              {a ? (
                info.image ? (
                  <WrapIcon>
                    <LazyLoadImage
                      alt='avatar'
                      height='40px'
                      src={info.image}
                      width='40px'
                      effect='blur'
                      style={{ objectFit: 'cover', borderRadius: '14px' }}
                    />
                  </WrapIcon>
                ) : (
                  <PinkIcon />
                )
              ) : null}
              <WrapMain isAvatar={info?.image}>
                <FullName>
                  {info?.title?.length > 20
                    ? info?.title?.charAt(0).toUpperCase() +
                      info?.title?.slice(1, 20) +
                      '...'
                    : info?.title?.charAt(0).toUpperCase() +
                      info?.title?.slice(1)}
                </FullName>
                <Wrapper>
                  <Title>
                    {info?.description?.length > 20
                      ? info?.description?.charAt(0).toUpperCase() +
                        info?.description?.slice(1, 20) +
                        '...'
                      : info?.description?.charAt(0).toUpperCase() +
                        info?.description?.slice(1)}
                  </Title>
                </Wrapper>
              </WrapMain>
            </Data>
            {id === i ? (
              <FullModal open={open}>
                <ModalContent
                  style={{ display: 'flex', flex: 1, flexDirection: 'column' }}
                >
                  <div>
                    <Header>
                      <IconButton
                        onClick={() => {
                          setOpen(false);
                          setId(null);
                        }}
                      >
                        <LeftBack />
                      </IconButton>
                      <WrapAvatar>
                        <>
                          <WrapIcon>
                            <LazyLoadImage
                              alt='avatar'
                              height='50px'
                              src={info?.image}
                              width='50px'
                              effect='blur'
                              style={{
                                objectFit: 'cover',
                                borderRadius: '14px',
                              }}
                            />
                          </WrapIcon>
                          <div style={{ display: 'block' }}>
                            <p
                              style={{
                                whiteSpace: 'pre-wrap',
                                wordBreak: 'break-all',

                                fontSize: '16px',
                                color: '#223367',
                                fontWeight: 500,
                              }}
                            >
                              {info?.title}
                            </p>
                            <span
                              style={{ fontSize: '14px', color: '#223367' }}
                            >
                              {info?.pushUp ? 'Push-up' : ''}
                            </span>
                          </div>
                        </>
                      </WrapAvatar>
                    </Header>
                  </div>
                  <MobileContent>
                    <div>
                      <WrapBox>
                        <p style={{ color: '#C7C7C7' }}>{t('????????????????')}</p>
                        <Box>
                          <BoxInfo>
                            <p>{info?.description}</p>
                          </BoxInfo>
                        </Box>
                      </WrapBox>
                      <WrapBoxDetail>
                        <p style={{ color: '#C7C7C7' }}>{t('????????????????????')}</p>
                        <Box>
                          {console.log(
                            'a.fullData?.genderType',
                            a.fullData?.genderType
                          )}
                          <BoxinfoDetail>{`${a.fullData?.genderType}`}</BoxinfoDetail>
                          <BoxinfoDetail>{`???????? ????????????????????: ${a.fullData?.date}`}</BoxinfoDetail>
                          <BoxinfoDetail>{`???????????????????? ??????????????????????: ${
                            info?.ageFrom + '+'
                          }`}</BoxinfoDetail>

                          {info?.pushUp && (
                            <>
                              <BoxinfoDetail>
                                {`?????? ???????????????????? Push:  ${
                                  weekdays[1]?.item ? weekdays[1]?.item : ''
                                } ${
                                  weekdays[2]?.item ? weekdays[2]?.item : ''
                                } ${
                                  weekdays[3]?.item ? weekdays[3]?.item : ''
                                } ${
                                  weekdays[4]?.item ? weekdays[4]?.item : ''
                                } ${
                                  weekdays[5]?.item ? weekdays[5]?.item : ''
                                } ${
                                  weekdays[6]?.item ? weekdays[6]?.item : ''
                                } ${
                                  weekdays[0]?.item ? weekdays[0]?.item : ''
                                }`}
                              </BoxinfoDetail>
                              <BoxinfoDetail>{`???????? ???????????????????? Push: ${
                                info?.settings?.time?.from +
                                '-' +
                                info?.settings?.time?.to
                              }`}</BoxinfoDetail>
                            </>
                          )}
                        </Box>
                      </WrapBoxDetail>

                      <WrapBoxDetail>
                        <p style={{ color: '#C7C7C7' }}>
                          {t('Push up ????????????????????')}
                        </p>
                        <Box>
                          <BoxinfoDetail>{`?????????????????????? ????????????????: ${info?.stat?.get?.total} ??????`}</BoxinfoDetail>
                          <BoxinfoDetail>
                            {`?????????????????????? ??????????????????????:${info?.stat?.view?.total} ??????`}
                            <br />
                            <span
                              style={{ fontSize: '14px', color: '#606EEA' }}
                            >{`${info?.stat?.view?.male} ??????`}</span>
                            <span
                              style={{ fontSize: '14px', color: '#FF56BB' }}
                            >
                              {' ' + `${info?.stat?.view?.female} ??????`}
                            </span>
                          </BoxinfoDetail>
                          <BoxinfoDetail>
                            {`?????????????????? ????????????: ${info?.stat?.paid?.total} ??????`}
                            <br />
                            <span
                              style={{ fontSize: '14px', color: '#606EEA' }}
                            >{`${info?.stat?.paid?.male} ??????`}</span>
                            <span
                              style={{ fontSize: '14px', color: '#FF56BB' }}
                            >
                              {' ' + `${info?.stat?.paid?.female} ??????`}
                            </span>
                          </BoxinfoDetail>
                        </Box>
                      </WrapBoxDetail>
                    </div>
                    <div>
                      {location.pathname === '/news/active' && (
                        <Buttons>
                          <Button
                            onClick={() => onDeleteOpen()}
                            margin={{ mobile: '0 8px 0 0' }}
                            buttonStyle={{
                              bgcolor: '#FF5E68',
                              color: '#fff',
                              weight: '700',
                            }}
                            // startIcon={<DeleteIcon />}

                            endIcon={
                              width > 325 && (
                                <DeleteIcon
                                  style={{ height: 15, width: 13.5 }}
                                />
                              )
                            }
                          >
                            {t('??????????????')}
                          </Button>
                          <Button
                            onClick={() => handleEdit(a)}
                            margin={{ desktop: '0 20px 0 20px' }}
                            buttonStyle={{
                              bgcolor: '#606EEA',
                              color: '#fff',
                              weight: '500',
                            }}
                            endIcon={
                              width > 325 && (
                                <PenIcon style={{ height: 15, width: 13.5 }} />
                              )
                            }
                          >
                            {'??????????????????????????'}
                          </Button>
                        </Buttons>
                      )}
                      {location.pathname === '/news/waiting' && (
                        <>
                          <Buttons>
                            <Button
                              onClick={() => handleEdit(a)}
                              margin={{
                                desktop: '0 20px 0 20px',
                                mobile: '0px 10px 10px 10px ',
                              }}
                              buttonStyle={{
                                bgcolor: 'rgba(96, 110, 234, 0.1)',
                                color: '#606EEA',
                                weight: '500',
                              }}
                              endIcon={
                                width > 325 && (
                                  <BluePenIcon
                                    style={{ height: 15, width: 13.5 }}
                                  />
                                )
                              }
                            >
                              {'??????????????????????????'}
                            </Button>
                          </Buttons>
                          <Buttons>
                            <Button
                              // onClick={''}
                              margin={{ mobile: '0 8px 0 0' }}
                              onClick={() => onDeleteOpen()}
                              buttonStyle={{
                                bgcolor: '#FF5E68',
                                color: '#fff',
                                weight: '700',
                              }}
                              // startIcon={<DeleteIcon />}

                              endIcon={
                                width > 325 && (
                                  <DeleteIcon
                                    style={{ height: 15, width: 13.5 }}
                                  />
                                )
                              }
                            >
                              {t('??????????????')}
                            </Button>
                            <Button
                              onClick={() => handlePublic(a)}
                              margin={{ desktop: '0 20px 0 20px' }}
                              buttonStyle={{
                                bgcolor: '#606EEA',
                                color: '#fff',
                                weight: '500',
                                shadow: '0px 4px 9px rgba(96, 110, 234, 0.46)',
                              }}
                              //  endIcon={<MobileCancelIcon />}
                              endIcon={width > 325 && <WhitePublishIcon />}
                            >
                              {t('????????????????????????')}
                            </Button>
                          </Buttons>
                        </>
                      )}
                    </div>
                  </MobileContent>
                  {location.pathname === '/news/archive' && (
                    <Buttons>
                      <Button
                        onClick={() => handleRepair(a)}
                        margin={{ desktop: '0 20px 0 20px' }}
                        buttonStyle={{
                          bgcolor: '#606EEA',
                          color: '#fff',
                          weight: '500',
                          shadow: '0px 4px 9px rgba(96, 110, 234, 0.46)',
                        }}
                        endIcon={
                          width > 325 && (
                            <RepairNewsIcon
                              style={{ height: 15, width: 13.5 }}
                            />
                          )
                        }
                      >
                        {t('????????????????????????')}
                      </Button>
                    </Buttons>
                  )}
                </ModalContent>
                <Modal open={isDeleteOpen}>
                  <DeleteModal>
                    <h5>{t('???? ?????????????????????????? ???????????? ?????????????? ???????????????')}</h5>
                    <p>{t('deleteNewsText')}</p>
                    <Buttons>
                      <Button
                        margin={{
                          desktop: '0 20px 0 20px',
                          mobile: '0 10px 0 0',
                        }}
                        onClick={() => setDeleteOpen(false)}
                        buttonStyle={{
                          bgcolor: 'rgba(96, 110, 234, 0.1)',
                          color: '#606EEA',
                          weight: '500',
                        }}
                        endIcon={
                          width > 325 && (
                            <CancelIcon style={{ height: 15, width: 13.5 }} />
                          )
                        }
                      >
                        {t('????????????????')}
                      </Button>
                      <Button
                        onClick={() => onDeleteAction(info?.id)}
                        margin={{ mobile: '0 8px 0 0' }}
                        buttonStyle={{
                          bgcolor: '#FF5E68',
                          color: '#fff',
                          weight: '700',
                        }}
                        // startIcon={<DeleteIcon />}

                        endIcon={
                          width > 325 && (
                            <DeleteIcon style={{ height: 15, width: 13.5 }} />
                          )
                        }
                      >
                        {t('??????????????')}
                      </Button>
                    </Buttons>
                  </DeleteModal>
                </Modal>
                {width > 600 && (
                  <Modal modalStyle={{ bgcolor: '#fff' }} open={isPublishOpen}>
                    <WrapperModal>
                      <CloseButton onClick={() => setPublisOpen(false)}>
                        <CloseIcon />
                      </CloseButton>
                      <h3>{t('???????????????? ???????? ????????????????????')}</h3>
                      <PublicModal setPublisOpen={setPublisOpen} />
                    </WrapperModal>
                  </Modal>
                )}

                {width <= 600 && (
                  <FullModal open={isPublishOpen}>
                    <PublicModal setPublisOpen={setPublisOpen} />
                  </FullModal>
                )}
              </FullModal>
            ) : null}
          </>
        );
      })}
    </Container>
  );
};

export default MobileTable;
