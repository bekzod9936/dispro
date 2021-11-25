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
  const { width } = useWindowWidth();
  const [open, setOpen] = useState<boolean>(false);

  const { t } = useTranslation();
  dayjs.extend(isYesterday);
  dayjs.extend(isToday);

  dayjs().isYesterday();

  const companyId = localStorage.getItem('companyId');
  useLayout({ id: companyId });
  const badgeInfo = useRecoilState(badgeData);

  const date = 'Wed Nov 23 2021 14:11:49 GMT+0500 (Uzbekistan Standard Time)';

  const a =
    dayjs(Date.now()).diff(date, 'minute') < 60
      ? `${dayjs(Date.now()).diff(date, 'minute')}Minut ago`
      : dayjs(Date.now()).diff(date, 'hour') < 24
      ? `${dayjs(Date.now()).diff(date, 'hour')}hours ago`
      : dayjs(Date.now()).diff(date, 'month') === 0
      ? `${dayjs(Date.now()).diff(date, 'day')} day ago`
      : dayjs(Date.now()).diff(date, 'year') === 0
      ? dayjs('').format('DD MMMM HH:mm')
      : dayjs('').format('DD MMMM YYYY');

  console.log(a, 'ssss');

  return (
    <Container>
      {width > 600 ? (
        <Popover
          click={
            <IconButton style={{ margin: '0 10px' }}>
              <BadgeWrap>
                <BadgeContent>{badgeInfo[0].totalCount}</BadgeContent>
                <BellIcon />
              </BadgeWrap>
            </IconButton>
          }
          anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
        >
          <Wrapper>
            <Title>{t('notification')}</Title>
            <Wrap>
              <div>
                <WrapNotification>
                  <Avatar>
                    <DisIcon />
                    {
                      // <LazyLoadImage
                      //   src={''}
                      //   alt='user'
                      //   style={{
                      //     objectFit: 'cover',
                      //   }}
                      //   height='100%'
                      //   width='100%'
                      // />
                    }
                  </Avatar>
                  <WrapData>
                    <LastMessage>
                      sssssssssssssssssssssssssssssssssssssssssssssssss
                    </LastMessage>
                    <Name>
                      <span>{t('from')}</span>
                      sssssssssssssssssssssssssssssssssssssssssssssssssss
                    </Name>
                    <Date1>12kds sdcsd</Date1>
                  </WrapData>
                </WrapNotification>
              </div>
            </Wrap>
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
              <div>
                <WrapNotification>
                  <Avatar>
                    <DisIcon />
                  </Avatar>
                  <WrapData>
                    <LastMessage>
                      sssssssssssssssssssssssssssssssssssssssssssssssss
                    </LastMessage>
                    <Name>
                      <span>{t('from')}</span>
                      sssssssssssssssssssssssssssssssssssssssssssssssssss
                    </Name>
                    <Date1>12kds sdcsd</Date1>
                  </WrapData>
                </WrapNotification>
              </div>
            </ModalWrap>
          </FullModal>
        </>
      )}
    </Container>
  );
};

export default Badge;
