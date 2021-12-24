import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { PeriodWrapper } from '../style';
import Button from 'components/Custom/Buttons/Button';
import { useHistory } from 'react-router';
import { ICoupon } from '..';
import { CancelIcon } from 'assets/icons/ClientsPageIcons/ClientIcons';
import {
  MobileCancelIcon,
  MobileGoBackIcon,
  PublishIcon,
} from 'assets/icons/proposals/ProposalsIcons';
import { useMutation } from 'react-query';
import { postCoupon, putCoupon } from 'services/queries/proposalQuery';
import dayjs from 'dayjs';
import Input from 'components/Custom/Input';
import { useTranslation } from 'react-i18next';
import useWindowWidth from 'services/hooks/useWindowWidth';
import DatePicker from 'react-multi-date-picker';
import CustomDatePicker from 'components/Custom/CustomDatePicker';
import { IconButton } from '@material-ui/core';

interface IProps {
  handleClose: any;
  mutation?: any;
  handlePost?: any;
  setPeriod?: (arg: boolean) => void;
  coupon: ICoupon | any;
  shouldPublish?: boolean;
  shouldUpdate?: boolean;
  handleUpdate?: any;
}

export const SetDate = ({
  handleUpdate,
  shouldUpdate,
  handleClose,
  coupon,
  handlePost,
  shouldPublish,
}: IProps) => {
  const [{ startDate, endDate, publishDate }, setValidDate] = React.useState({
    startDate: '',
    endDate: '',
    publishDate: '',
  });
  const { t } = useTranslation();
  const { width } = useWindowWidth();
  const { mutate } = useMutation((data: ICoupon) => postCoupon(data), {
    onSuccess: (data) => {
      putCoupon(data.data.data.id, {
        startDate,
        endDate,
        publishDate,
      });
    },
  });
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm();
  const history = useHistory();

  const onPublish = async (data: any) => {
    let startDate = getValidDate(data.startDate);
    let endDate = getValidDate(data.endDate);
    let publishDate = getValidDate(data.publishDate);
    setValidDate({
      startDate,
      endDate,
      publishDate,
    });

    if (shouldPublish) {
      handlePost({
        id: coupon.id,
        data: {
          startDate,
          endDate,
          publishDate,
        },
      });
    } else if (shouldUpdate) {
      await handleUpdate({
        id: coupon.id,
        data: {
          ...coupon,
        },
      });
      putCoupon(coupon.id, {
        startDate,
        endDate,
        publishDate,
      });
    } else {
      mutate(coupon);
    }
    handleClose();
    setTimeout(() => history.goBack(), 1000);
  };

  const handleFn = (obj: any) => {
    const result = new Date(obj).getTime() + 2592000000;
    return new Date(result);
  };

  function getValidDate(obj: any) {
    return '' + obj.year + '-' + obj.month.number + '-' + obj.day;
  }

  return (
    <form style={{ height: '100%' }} onSubmit={handleSubmit(onPublish)}>
      <PeriodWrapper>
        <div>
          <div className='header'>
            {width <= 600 && (
              <IconButton onClick={handleClose}>
                <MobileGoBackIcon />
              </IconButton>
            )}
            <h5>Выберите дату публикации</h5>
          </div>
          <p>Выберите дату публикации</p>
          <Controller
            control={control}
            name='publishDate'
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <CustomDatePicker
                margin='0 0 30px 0'
                error={errors.publishDate}
                minDate={new Date()}
                maxDate={new Date().getFullYear() + 2 + '-01-01'}
                onChange={field.onChange}
                value={field.value}
              />
            )}
          />
          <p>Выберите период действия купона</p>
          <div className='startAndEndDate'>
            <Controller
              name='startDate'
              rules={{
                required: true,
              }}
              control={control}
              render={({ field }) => (
                <CustomDatePicker
                  disabled={!Boolean(watch('publishDate'))}
                  text={t('from')}
                  margin={width > 430 ? '0 10px 0 0' : '0 0 12px 0'}
                  error={errors.startDate}
                  minDate={watch('publishDate')}
                  maxDate={handleFn(watch('publishDate'))}
                  onChange={field.onChange}
                  value={field.value}
                />
              )}
            />
            <Controller
              rules={{
                required: true,
              }}
              control={control}
              name='endDate'
              render={({ field }) => (
                <CustomDatePicker
                  text={t('to')}
                  disabled={!Boolean(watch('startDate'))}
                  error={errors.endDate}
                  minDate={watch('startDate')}
                  maxDate={handleFn(watch('publishDate'))}
                  onChange={field.onChange}
                  value={field.value}
                />
              )}
            />
          </div>
        </div>
        <div className='buttonsWrapper'>
          <Button
            buttonStyle={
              width > 1000
                ? { color: '#223367', bgcolor: '#ffffff' }
                : { color: '#606EEA', bgcolor: 'rgba(96, 110, 234, 0.1)' }
            }
            margin={{ laptop: '0 20px 0 0', mobile: '0 8px 0 0' }}
            startIcon={width > 1000 ? <CancelIcon /> : <MobileCancelIcon />}
            onClick={handleClose}
          >
            Отменить
          </Button>
          <Button startIcon={width > 335 && <PublishIcon />} type='submit'>
            Опубликовать
          </Button>
        </div>
      </PeriodWrapper>
    </form>
  );
};
