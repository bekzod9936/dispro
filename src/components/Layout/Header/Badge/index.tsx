import { IconButton } from '@material-ui/core';
import useLayout from 'components/Layout/useLayout';
import { useRecoilState } from 'recoil';
import { badgeData } from 'services/atoms/info/badge';
import Popover from 'components/Custom/Popover';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import isYesterday from 'dayjs/plugin/isYesterday';
import isToday from 'dayjs/plugin/isToday';

import { ReactComponent as LeftBack } from 'assets/icons/FinanceIcons/leftback.svg';
import {
  Container,
  BadgeWrap,
  BadgeContent,
  BellIcon,
  Avatar,
  DisIcon,
  WrapNotification,
  LastMessage,
  Name,
  Date1,
  Wrapper,
  WrapData,
  Title,
  Header,
  Wrap,
  ModalWrap,
} from './style';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import useWindowWidth from 'services/hooks/useWindowWidth';
import FullModal from 'components/Custom/FullModal';
import { useState } from 'react';

const Badge = () => {
  const { t } = useTranslation();
  const { width } = useWindowWidth();
  const [open, setOpen] = useState<boolean>(false);

  dayjs.extend(isYesterday);
  dayjs.extend(isToday);

  dayjs().isYesterday();

  const companyId = localStorage.getItem('companyId');
  useLayout({ id: companyId });
  const badgeInfo = useRecoilState(badgeData);

  const date = 'Wed Nov 25 2020 11:11:49 GMT+0500 (Uzbekistan Standard Time)';
  const dd = new Date();

  console.log(badgeInfo, 'ssss');

  const getTime = (date: any) => {
    const time =
      dayjs(Date.now()).diff(date, 'minute') < 60
        ? `${dayjs(Date.now()).diff(date, 'minute')}M ${t('ago')}`
        : dayjs(Date.now()).diff(date, 'hour') < 24
        ? `${dayjs(Date.now()).diff(date, 'hour')}hours ${t('ago')}`
        : dayjs(Date.now()).diff(date, 'month') === 0
        ? `${dayjs(Date.now()).diff(date, 'day')} ${t('day')} ${t(
            'ago'
          )} ${dayjs(date).format('HH:mm')}`
        : dayjs(Date.now()).diff(date, 'year') === 0
        ? dayjs(date).format('DD MMMM HH:mm')
        : dayjs(date).format('DD MMMM YYYY');
    return time;
  };

  const content = (
    <div>
      {badgeInfo[0]?.histories?.map((v: any) => {
        return (
          <WrapNotification>
            <Avatar>
              {v.chatType === 6 ? (
                <DisIcon />
              ) : (
                <LazyLoadImage
                  src={v.image}
                  alt='user'
                  style={{
                    objectFit: 'cover',
                  }}
                  height='100%'
                  width='100%'
                />
              )}
            </Avatar>
            <WrapData>
              <LastMessage>{v.lastMsg}</LastMessage>
              <Name>
                <span>{t('from')}</span>
                {v.chatType === 6
                  ? `Dis-count`
                  : `${v.lastName} ${v.firstName}`}
              </Name>
              <Date1>{getTime(v.date)}</Date1>
            </WrapData>
          </WrapNotification>
        );
      })}
    </div>
  );

  return (
    <Container>
      {width > 600 ? (
        <Popover
          click={
            <IconButton style={{ margin: '0 10px' }}>
              <BadgeWrap>
                <BadgeContent>
                  {badgeInfo[0].totalCount ? badgeInfo[0].totalCount : 0}
                </BadgeContent>
                <BellIcon />
              </BadgeWrap>
            </IconButton>
          }
          anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
        >
          <Wrapper>
            <Title>{t('notification')}</Title>
            <Wrap>{content}</Wrap>
          </Wrapper>
        </Popover>
      ) : (
        <>
          <IconButton
            onClick={() => setOpen(true)}
            style={{ margin: '0 10px' }}
          >
            <BadgeWrap>
              <BadgeContent>{badgeInfo[0].totalCount}</BadgeContent>
              <BellIcon />
            </BadgeWrap>
          </IconButton>
          <FullModal open={open}>
            <ModalWrap>
              <Header>
                <IconButton
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  <LeftBack />
                </IconButton>
                <span>{t('notifications')}</span>
              </Header>
              {content}
            </ModalWrap>
          </FullModal>
        </>
      )}
    </Container>
  );
};

export default Badge;
