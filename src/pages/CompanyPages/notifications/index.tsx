import Title from 'components/Custom/Title';
import { useTranslation } from 'react-i18next';
import Pagination from 'components/Custom/Pagination';
import { useState } from 'react';
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
import {
  Container,
  Card,
  CardImg,
  TitleCard,
  Text,
  Date,
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

  const [open, setOpen] = useState(false);
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
            objectFit: 'contain',
            userSelect: 'none',
          }}
        />
      </SideImgWrap>
      <WrapScroll>
        <WrapInfoBox>
          <WrapTitle>
            <Titletext>{info.title}</Titletext>
            <Date>{dayjs(info.createdAt).format('DD MMMM YYYY')}</Date>
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

  return (
    <Container>
      <Title>
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
                        objectFit: 'contain',
                        borderRadius: '14px 14px 0 0',
                      }}
                      effect='blur'
                    />
                  </CardImg>
                  <CardBody open={open && v.id === id}>
                    <WrapTitle>
                      <TitleCard> {v.title}</TitleCard>
                      <Date>{dayjs(v.createdAt).format('DD MMMM YYYY')}</Date>
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
            <Pagination
              page={filterValues.page}
              count={totalCount}
              onChange={handlechangePage}
              disabled={response.isLoading || response.isFetching}
              siblingCount={0}
            />
          </WrapPag>
        </Wrap>
      ) : (
        <WrapDefault>
          <img src={notification} alt='notification.png' />
          <span>{t('notificationsfromdiscount')}</span>
        </WrapDefault>
      )}
      {width > 600 ? (
        <SideDrawer open={open}>{content}</SideDrawer>
      ) : (
        <FullModal open={open}>{content}</FullModal>
      )}
    </Container>
  );
};

export default Notifications;
