import {
  CancelIcon,
  CloseIcon,
} from 'assets/icons/ClientsPageIcons/ClientIcons';
import {
  DeleteIcon,
  EyeIcon,
  PenIcon,
  PublishIcon,
  ReUseIcon,
} from 'assets/icons/proposals/ProposalsIcons';
import Button from 'components/Custom/Buttons/Button';
import Modal from 'components/Custom/Modal';
import React from 'react';
import { useMutation } from 'react-query';
import { useHistory } from 'react-router';
import { deleteCoupon, putCoupon } from 'services/queries/proposalQuery';
import { IDeferred } from 'services/redux/Slices/proposals/types';
import { SetDate } from '../../screens/Coupons/components/SetDate';
import {
  Wrapper,
  Header,
  DeleteModal,
  Content,
  Preview,
  PreviewContent,
} from './style';
import iphone from 'assets/images/iphone.png';
import { useAppSelector } from 'services/redux/hooks';
import { RootState } from 'services/redux/store';
import { useTranslation } from 'react-i18next';
import { useFetchCategories } from '../../screens/UpdateCoupon/useFetchCategories';
interface IProps {
  onClose: (arg: boolean) => void;
  currentCoupon: IDeferred;
  disableUpdate?: boolean;
  resetCoupon: any;
  canceled?: boolean;
  refetch: () => void;
}

export const CouponBar = ({
  onClose,
  currentCoupon,
  disableUpdate,
  resetCoupon,
  canceled,
  refetch,
}: IProps) => {
  const isCoupon = currentCoupon.type === 2;
  const history = useHistory();
  const { t } = useTranslation();
  const [isDeleteOpen, setDeleteOpen] = React.useState<boolean>(false);
  const [isPublishOpen, setPublisOpen] = React.useState<boolean>(false);
  const { logo, name } = useAppSelector(
    (state: RootState) => state.partner.companyInfo
  );
  const [categories, setCategories] = React.useState<any>();
  const handleClose = () => {
    onClose(false);
    resetCoupon();
  };
  const { mutate } = useMutation(({ id, data }: any) => putCoupon(id, data));

  const handleUpdate = () => {
    if (isCoupon) {
      history.push('/proposals/update_coupon');
    } else {
      history.push('/proposals/update_certificate');
    }
  };
  const _ = useFetchCategories(setCategories, currentCoupon.categoryIds);

  const handleRePublish = () => {
    if (isCoupon) {
      history.push('/proposals/create_republishcoupon');
    } else {
      history.push('/proposals/create_republishcertificate');
    }
  };

  const onDelete = async () => {
    await deleteCoupon(currentCoupon.id);
    refetch();
    resetCoupon();
    setDeleteOpen(false);
    onClose(false);
  };

  const handleCheck = () => {
    if (isCoupon) {
      history.push('check_coupon');
    } else {
      history.push('/proposals/check_certificate');
    }
  };
  return (
    <Wrapper>
      <Header>
        <h6>{isCoupon ? '??????????' : '????????????????????'}</h6>
        <CloseIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
      </Header>
      <Preview>
        <img className='couponImg' src={currentCoupon.image} alt='' />
        <img className='iphoneImg' width='300' src={iphone} />
        <PreviewContent>
          <img src={logo} />
          <span>{name}</span>
          <p>{isCoupon ? t('coupon') : t('certificate')}</p>
          {isCoupon ? (
            <h5>
              <span>{currentCoupon.value} %</span> {t('sale')}
            </h5>
          ) : (
            <h5>
              <span>{currentCoupon.value} ??????</span>
            </h5>
          )}
        </PreviewContent>
      </Preview>
      <Content>
        <h5>????????????????????</h5>
        <p>
          {isCoupon ? '???????????? ????????????' : '?????????? ??????????????????????'}:{' '}
          {currentCoupon.value} {isCoupon ? '%' : '??????'}
        </p>
        <p>
          ???????????????????? {isCoupon ? '??????????????' : '????????????????????????'}:{' '}
          {currentCoupon.count} ????
        </p>
        <p>
          ?????????????????? {isCoupon ? '????????????' : '??????????????????????'}: {currentCoupon.price}{' '}
          ??????
        </p>
        <p>
          ???????????????????? ??????????????????????:{' '}
          {currentCoupon.ageUnlimited || currentCoupon.ageFrom === 0
            ? '??????'
            : currentCoupon.ageFrom + '+'}
        </p>
      </Content>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}
      >
        {disableUpdate ? (
          <Button
            onClick={() => setDeleteOpen(true)}
            buttonStyle={{ color: '#ffffff', bgcolor: '#FF5E68' }}
            startIcon={<DeleteIcon />}
          >
            ?????????????? ??????????
          </Button>
        ) : canceled ? (
          <>
            <Button
              onClick={handleCheck}
              startIcon={<EyeIcon />}
              buttonStyle={{ color: '#606EEA', bgcolor: '#ffffff' }}
            >
              ???????????????? ??????????????????
            </Button>
            <Button
              onClick={handleRePublish}
              startIcon={<ReUseIcon />}
              margin={{ laptop: '25px 0' }}
            >
              ????????????????????????
            </Button>
          </>
        ) : (
          <>
            <Button
              onClick={handleUpdate}
              startIcon={<PenIcon />}
              buttonStyle={{
                color: '#606EEA',
                bgcolor: 'rgba(96, 110, 234, 0.1)',
              }}
            >
              ??????????????????????????
            </Button>
            <Button
              startIcon={<PublishIcon />}
              onClick={() => setPublisOpen(true)}
              margin={{ laptop: '25px 0' }}
            >
              ????????????????????????
            </Button>
            <Button
              onClick={() => setDeleteOpen(true)}
              buttonStyle={{ color: '#ffffff', bgcolor: '#FF5E68' }}
              startIcon={<DeleteIcon />}
            >
              ?????????????? ??????????
            </Button>
          </>
        )}
      </div>
      <Modal open={isDeleteOpen}>
        <DeleteModal>
          <h5>
            ???? ?????????????????????????? ???????????? ??????????????{' '}
            {isCoupon ? t('coupon') : t('certificate')}?
          </h5>
          <p>{currentCoupon.title}</p>
          <Button
            buttonStyle={{ color: '#223367', bgcolor: '#ffffff' }}
            margin={{ laptop: '0 22px 0 0' }}
            onClick={() => setDeleteOpen(false)}
            startIcon={<CancelIcon />}
          >
            ????????????
          </Button>
          <Button
            buttonStyle={{ bgcolor: '#FF5E68 ' }}
            onClick={onDelete}
            startIcon={<DeleteIcon />}
          >
            ??????????????
          </Button>
        </DeleteModal>
      </Modal>
      <Modal open={isPublishOpen}>
        <SetDate
          handleClose={() => setPublisOpen(false)}
          coupon={currentCoupon}
          mutation={mutate}
          shouldPublish
          handlePost={mutate}
        />
      </Modal>
    </Wrapper>
  );
};
