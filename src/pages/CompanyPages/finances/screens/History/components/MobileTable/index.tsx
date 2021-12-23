import { ReactComponent as LeftBack } from 'assets/icons/FinanceIcons/leftback.svg';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import FullModal from 'components/Custom/FullModal';
import { useState } from 'react';
import { IconButton } from '@material-ui/core';
import { ReactComponent as EditPen } from 'assets/icons/editpen.svg';
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
  BoxTitle,
  BoxInfo,
  WrapMain,
  WrapIcon,
  PinkIcon,
  WrapAvatar,
  WrapSideBody,
  WrapSideHeader,
  WrapSideFooter,
  BodyTitle,
  Comment,
  CloseIcon,
  DeleteIcon1,
  WarpButton,
} from './style';
import Button from 'components/Custom/Button';
import { useTranslation } from 'react-i18next';
import Modal from 'components/Custom/Modal';
import { TextArea } from 'components/Custom/TextArea';
import {
  SaveIcon,
  CancelIcon,
  WrapButtonsModal,
  WrapModalComment,
  WarpBodyComModel,
  WrapComTitle,
  LabelCom,
  CloseWrapBut,
  WrapDeleteModal,
  WrapDeleteTitle,
  WrapDeleteComment,
  WrapDeleteButtons,
} from '../../style';
import useWindowWidth from 'services/hooks/useWindowWidth';
import { useAppDispatch, useAppSelector } from 'services/redux/hooks';
import { setId } from 'services/redux/Slices/finance';

interface Props {
  data?: {
    title?: any;
    info?: {
      title?: any;
      avatar?: any;
      value?: any;
      values?: any;
      body?: { title?: any; value?: any }[];
    }[];
  };
  headertitle?: string;
  isAvatar?: boolean;
  onAllClose?: () => void;
  handleEdit?: (e: any) => void;
  handleDelete?: (e: any) => void;
  onClickRow?: (e: any) => void;
  resComment?: any;
}

const MobileTable = ({
  data,
  headertitle,
  isAvatar,
  onAllClose = () => {},
  resComment,
}: Props) => {
  const { t } = useTranslation();
  const [comment, setComment] = useState<string>('');
  const { width } = useWindowWidth();
  const dispatch = useAppDispatch();
  const checkid = useAppSelector((state) => state.finance.historyFinance.id);

  const [open, setOpen] = useState(false);
  const [openSave, setOpenSave] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [id, setIdd] = useState<any>(null);

  return (
    <Container>
      {data?.info?.map((a: any, i: number) => {
        return (
          <>
            <Data
              onClick={() => {
                setOpen(true);
                setIdd(i);
              }}
            >
              {a.icon ? a.icon : null}
              {isAvatar ? (
                a.avatar ? (
                  <WrapIcon>
                    <LazyLoadImage
                      alt='avatar'
                      height='40px'
                      src={a.avatar}
                      width='40px'
                      effect='blur'
                      style={{ objectFit: 'cover', borderRadius: '14px' }}
                    />
                  </WrapIcon>
                ) : (
                  <PinkIcon />
                )
              ) : null}
              <WrapMain
                onClick={() => {
                  dispatch(setId(a.values.id));
                }}
                isAvatar={isAvatar}
              >
                <FullName>{a?.title}</FullName>
                <Wrapper>
                  <Title>{data?.title}:</Title>
                  <Amount>{a?.value}</Amount>
                </Wrapper>
              </WrapMain>
            </Data>
            {id === i ? (
              <FullModal open={open}>
                <ModalContent>
                  <Header>
                    <IconButton
                      onClick={() => {
                        setOpen(false);
                        setIdd(null);
                      }}
                    >
                      <LeftBack />
                    </IconButton>
                    <WrapAvatar>
                      {isAvatar ? (
                        a.avatar ? (
                          <>
                            <WrapIcon>
                              <LazyLoadImage
                                alt='avatar'
                                height='40px'
                                src={a.avatar}
                                width='40px'
                                effect='blur'
                                style={{
                                  objectFit: 'cover',
                                  borderRadius: '14px',
                                }}
                              />
                            </WrapIcon>
                            <span>{a?.title}</span>
                          </>
                        ) : (
                          <>
                            <PinkIcon />
                            <span>{a?.title}</span>
                          </>
                        )
                      ) : (
                        <span>{headertitle}</span>
                      )}
                    </WrapAvatar>
                  </Header>
                  <WrapBox>
                    {a.body?.map((v: any) => {
                      return (
                        <Box>
                          <BoxTitle>{v.title}</BoxTitle>
                          <BoxInfo>{v.value}</BoxInfo>
                        </Box>
                      );
                    })}
                  </WrapBox>
                </ModalContent>
                {a.values.col13 === '' ? (
                  <WarpButton>
                    <Button
                      buttonStyle={{
                        bgcolor: '#e1e3fb',
                        color: '#3492FF',
                        radius: 12,
                        weight: 300,
                        height: {
                          laptop: 36,
                          desktop: 36,
                          planshet: 36,
                          mobile: 36,
                        },
                        fontSize: {
                          desktop: 14,
                          laptop: 14,
                          planshet: 14,
                        },
                      }}
                      onClick={() => setOpenSave(true)}
                    >
                      {t('addcomment')}
                    </Button>
                  </WarpButton>
                ) : (
                  <>
                    <WrapSideBody>
                      <WrapSideHeader>
                        {t('operation')}
                        <IconButton onClick={() => onAllClose()}>
                          <CloseIcon />
                        </IconButton>
                      </WrapSideHeader>
                      <BodyTitle>{t('commentoperation')}</BodyTitle>
                      <Comment>
                        <div>{a.values.col13}</div>
                      </Comment>
                    </WrapSideBody>
                    <WrapSideFooter>
                      <Button
                        startIcon={<EditPen />}
                        onClick={() => {
                          setOpenSave(true);
                          setComment(a.values.col13);
                        }}
                      >
                        {t('edit')}
                      </Button>
                      <Button
                        buttonStyle={{
                          color: 'white',
                          bgcolor: '#FF5E68',
                          weight: 500,
                          shadow: '0px 4px 9px rgba(255, 94, 104, 0.46)',
                        }}
                        margin={{ mobile: '0 0 20px 0' }}
                        startIcon={<DeleteIcon1 />}
                        onClick={() => setDeleteOpen(true)}
                      >
                        {t('deletecomment')}
                      </Button>
                    </WrapSideFooter>
                  </>
                )}
                <Modal open={openSave}>
                  <WrapModalComment>
                    <WarpBodyComModel>
                      <WrapComTitle>
                        <div>
                          {a.values.col13 !== ''
                            ? t('changingcomment')
                            : t('addingcomment')}
                        </div>
                        <CloseWrapBut>
                          <IconButton
                            onClick={() => {
                              setOpenSave(false);
                            }}
                          >
                            <CloseIcon />
                          </IconButton>
                        </CloseWrapBut>
                      </WrapComTitle>
                      <div>
                        <TextArea
                          minHeight={'120px'}
                          maxHeight={'300px'}
                          resize={'vertical'}
                          value={comment}
                          onChange={(e: any) => {
                            if (width > 1000) {
                              setComment(e.target.value);
                            } else {
                              if (e.target.value.length <= 100) {
                                setComment(e.target.value);
                              } else {
                                setComment(e.target.value.substring(0, 100));
                              }
                            }
                          }}
                          maxLength={100}
                          title={
                            <LabelCom>
                              <span>{t('commentoperation')}</span>
                              <span>{comment.length}/100</span>
                            </LabelCom>
                          }
                        />
                      </div>
                    </WarpBodyComModel>
                    <WrapButtonsModal>
                      <Button
                        buttonStyle={{
                          bgcolor: width > 600 ? 'white' : '#eff0fd',
                          color: width > 600 ? '#223367' : '#606EEA',
                          weight: 500,
                        }}
                        margin={{
                          laptop: '0 30px 0 0',
                          mobile: '0 10px 0 0',
                        }}
                        padding={{ mobile: '0 10px' }}
                        startIcon={width > 600 ? <CancelIcon /> : null}
                        endIcon={width < 600 ? <CancelIcon /> : null}
                        onClick={() => {
                          setDeleteOpen(false);
                        }}
                      >
                        {t('cancel')}
                      </Button>
                      <Button
                        buttonStyle={{
                          color: 'white',
                          bgcolor: '#606EEA',
                        }}
                        padding={{ mobile: '0 10px' }}
                        startIcon={width > 600 ? <SaveIcon /> : null}
                        endIcon={width < 600 ? <SaveIcon /> : null}
                        disabled={resComment.isLoading}
                        onClick={() =>
                          resComment.mutate(
                            {
                              chequeId: checkid,
                              chequeComment: comment,
                            },
                            {
                              onSuccess: () => {
                                setDeleteOpen(false);
                              },
                            }
                          )
                        }
                      >
                        {t('save')}
                      </Button>
                    </WrapButtonsModal>
                  </WrapModalComment>
                </Modal>
                <Modal open={deleteOpen}>
                  <WrapDeleteModal>
                    <WrapDeleteTitle>{t('areyousuredelete')}</WrapDeleteTitle>
                    <WrapDeleteComment>{comment}</WrapDeleteComment>
                    <WrapDeleteButtons>
                      <Button
                        buttonStyle={{
                          bgcolor: width > 600 ? 'white' : '#eff0fd',
                          color: width > 600 ? '#223367' : '#606EEA',
                          weight: 500,
                        }}
                        margin={{
                          laptop: '0 30px 0 0',
                          mobile: '0 10px 0 0',
                        }}
                        padding={{ mobile: '0 10px' }}
                        startIcon={width > 600 ? <CancelIcon /> : null}
                        endIcon={width < 600 ? <CancelIcon /> : null}
                        onClick={() => {
                          setDeleteOpen(false);
                        }}
                      >
                        {t('cancel')}
                      </Button>
                      <Button
                        buttonStyle={{
                          color: 'white',
                          bgcolor: '#FF5E68',
                          weight: 500,
                        }}
                        padding={{ mobile: '0 10px' }}
                        startIcon={width > 600 ? <DeleteIcon1 /> : null}
                        endIcon={width < 600 ? <DeleteIcon1 /> : null}
                        disabled={resComment.isLoading}
                        onClick={() =>
                          resComment.mutate(
                            {
                              chequeId: checkid,
                              chequeComment: '',
                            },
                            {
                              onSuccess: () => {
                                setDeleteOpen(false);
                              },
                            }
                          )
                        }
                      >
                        {t('delete')}
                      </Button>
                    </WrapDeleteButtons>
                  </WrapDeleteModal>
                </Modal>
              </FullModal>
            ) : null}
          </>
        );
      })}
    </Container>
  );
};

export default MobileTable;
