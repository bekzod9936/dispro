import { IconButton } from '@material-ui/core';
import useLayout from 'components/Layout/useLayout';
import { useRecoilState } from 'recoil';
import { badgeData } from 'services/atoms/info/badge';
import Popover from 'components/Custom/Popover';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import isYesterday from 'dayjs/plugin/isYesterday';
import isToday from 'dayjs/plugin/isToday';
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
  Date,
  Wrapper,
  WrapData,
  Title,
  Wrap,
} from './style';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const Badge = () => {
  const { t } = useTranslation();
  dayjs.extend(isYesterday);
  dayjs.extend(isToday);
  dayjs().isYesterday();

  const companyId = localStorage.getItem('companyId');
  useLayout({ id: companyId });
  const badgeInfo = useRecoilState(badgeData);
  return (
    <Container>
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
                  <Date>12kds sdcsd</Date>
                </WrapData>
              </WrapNotification>
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
                  <Date>12kds sdcsd</Date>
                </WrapData>
              </WrapNotification>
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
                  <Date>12kds sdcsd</Date>
                </WrapData>
              </WrapNotification>
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
                  <Date>12kds sdcsd</Date>
                </WrapData>
              </WrapNotification>
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
                  <Date>12kds sdcsd</Date>
                </WrapData>
              </WrapNotification>
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
                  <Date>12kds sdcsd</Date>
                </WrapData>
              </WrapNotification>
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
                  <Date>12kds sdcsd</Date>
                </WrapData>
              </WrapNotification>
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
                  <Date>12kds sdcsd</Date>
                </WrapData>
              </WrapNotification>
            </div>
          </Wrap>
        </Wrapper>
      </Popover>
    </Container>
  );
};

export default Badge;
