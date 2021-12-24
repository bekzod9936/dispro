import Title from 'components/Custom/Title';
import { useTranslation } from 'react-i18next';
import { useState, useEffect, useRef } from 'react';
import useNotefications from './useNotefications';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Button from 'components/Custom/Button';
import Spinner from 'components/Custom/Spinner';
import dayjs from 'dayjs';
import notification from 'assets/images/notification.png';
import notificationDef from 'assets/images/notificationDefault.png';
import { useHistory } from 'react-router';
import useWindowWidth from 'services/hooks/useWindowWidth';
import FullModal from 'components/Custom/FullModal';
import { countPagination } from './utils';
import isYesterday from 'dayjs/plugin/isYesterday';
import isToday from 'dayjs/plugin/isToday';
import {
  Container,
  Card,
  CardImg,
  TitleCard,
  Text,
  Date1,
  CardBody,
  WrapTitle,
  WrapPag,
  Info,
  WrapperCard,
  Wrap,
  SideDrawer,
  SideImgWrap,
  SideText,
  WrapScroll,
  WrapButton,
  CloseIcon,
  WrapIcon,
  WrapInfoBox,
  WrapDefault,
  MessageIcon,
  Titletext,
} from './style';
import { NewPagination } from 'components/Custom/NewPagination';

interface intialFilterProps {
  page?: number;
  perPage?: number;
}

const intialFilter = {
  page: 1,
  perPage: 6,
};

interface infoProps {
  body?: string;
  createdAt?: string;
  id?: number;
  image?: string;
  isSend?: boolean;
  title?: string;
}

const Notifications = () => {
  const { t } = useTranslation();
  const { width } = useWindowWidth();
  const history = useHistory();
  const currentYear: any = new Date().getFullYear();
  const [open, setOpen] = useState(false);
  const ref: any = useRef(null);

  const handleClickOutside = (event: any) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  });

  dayjs.extend(isYesterday);
  dayjs.extend(isToday);

  const [info, setInfo] = useState<infoProps>({});
  const [id, setId] = useState<number>();
  const [filterValues, setFilterValues] =
    useState<intialFilterProps>(intialFilter);

  const { response, data, totalCount, between, pages } = useNotefications({
    filterValues: filterValues,
  });

  const handlechangePage = async (e: any) => {
    await setFilterValues({ ...filterValues, page: e });
    await response.refetch();
  };

  const content = (
    <>
      <SideImgWrap>
        <WrapIcon
          onClick={() => {
            setOpen(false);
            setInfo({});
            setId(undefined);
          }}
        >
          <CloseIcon />
        </WrapIcon>
        <LazyLoadImage
          alt='image'
          src={info.image ? info.image : notificationDef}
          height='100%'
          width='100%'
          style={{
            objectFit: 'fill',
            userSelect: 'none',
          }}
        />
      </SideImgWrap>
      <WrapScroll>
        <WrapInfoBox>
          <WrapTitle>
            <Titletext>{info.title}</Titletext>
            <Date1>
              {dayjs(info.createdAt).isYesterday()
                ? t('yesterday')
                : dayjs(info.createdAt).isToday()
                ? t('today')
                : dayjs(info.createdAt).format('YYYY') == currentYear
                ? dayjs(info.createdAt).format('DD MMMM')
                : dayjs(info.createdAt).format('DD MMMM YYYY')}
            </Date1>
          </WrapTitle>
          <SideText>{info.body} </SideText>
        </WrapInfoBox>
        <WrapButton>
          <Button
            onClick={() => history.push('/support')}
            startIcon={width > 600 ? <MessageIcon /> : null}
            endIcon={width <= 600 ? <MessageIcon /> : null}
            buttonStyle={{
              height: {
                mobile: 38,
              },
              shadow: '0px 4px 9px rgba(96, 110, 234, 0.46)',
              fontSize: {
                mobile: 14,
              },
            }}
          >
            {t('writetous')}
          </Button>
        </WrapButton>
      </WrapScroll>
    </>
  );

  const mainContent = () => {
    if (width > 1000) {
      return (
        <SideDrawer ref={ref} open={open}>
          {content}
        </SideDrawer>
      );
    } else {
      return <FullModal open={open}>{content}</FullModal>;
    }
  };

  return (
    <Container>
      <Title padding={{ planshet: '0' }}>
        {t('notifications')} {t('from')} DIS-COUNT
      </Title>
      {response.isLoading || response.isFetching ? (
        <Spinner />
      ) : data.length > 0 ? (
        <Wrap>
          <WrapperCard>
            {data.map((v: any) => {
              return (
                <Card
                  key={v.id}
                  onClick={() => {
                    setOpen(true);
                    setInfo(v);
                    setId(v.id);
                  }}
                >
                  <CardImg>
                    <LazyLoadImage
                      alt='image'
                      src={v.image ? v.image : notificationDef}
                      height='100%'
                      width='100%'
                      style={{
                        objectFit: 'fill',
                        borderRadius: '14px 14px 0 0',
                        userSelect: 'none',
                      }}
                      effect='blur'
                    />
                  </CardImg>
                  <CardBody open={open && v.id === id}>
                    <WrapTitle>
                      <TitleCard> {v.title}</TitleCard>
                      <Date1>
                        {dayjs(v.createdAt).isYesterday()
                          ? t('yesterday')
                          : dayjs(v.createdAt).isToday()
                          ? t('today')
                          : dayjs(v.createdAt).format('YYYY') == currentYear
                          ? dayjs(v.createdAt).format('DD MMMM')
                          : dayjs(v.createdAt).format('DD MMMM YYYY')}
                      </Date1>
                    </WrapTitle>
                    <Text>{v.body}</Text>
                  </CardBody>
                </Card>
              );
            })}
          </WrapperCard>
          <WrapPag>
            <Info>
              {t('shown')}
              <span>{between}</span>
              {t('from1')} <span>{pages}</span>
              {countPagination({
                count: pages,
                firstWord: t('notification1'),
                secondWord: t('notification23'),
              })}
            </Info>
            <NewPagination
              onChange={handlechangePage}
              currentPage={Number(filterValues.page)}
              totalCount={Number(totalCount)}
            />
          </WrapPag>
        </Wrap>
      ) : (
        <WrapDefault>
          <img src={notification} alt='notification.png' />
          <span>{t('notificationsfromdiscount')}</span>
        </WrapDefault>
      )}
      {mainContent()}
    </Container>
  );
};

export default Notifications;
