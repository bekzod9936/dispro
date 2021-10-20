import Title from 'components/Custom/Title';
import { useTranslation } from 'react-i18next';
import Pagination from 'components/Custom/Pagination';
import { useState } from 'react';
import useNotefications from './useNotefications';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Button from 'components/Custom/Button';
import Spinner from 'components/Custom/Spinner';
import { ReactComponent as MessageIcon } from 'assets/icons/message.svg';
import moment from 'moment';
import notification from 'assets/images/notification.png';
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

  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState<infoProps>({});
  const [id, setId] = useState<number>();
  const [filterValues, setFilterValues] =
    useState<intialFilterProps>(intialFilter);

  const { response, data, totalCount, between } = useNotefications({
    filterValues: filterValues,
  });

  const handlechangePage = async (e: any) => {
    await setFilterValues({ ...filterValues, page: e });
    await response.refetch();
  };

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
                      src={v.image}
                      height='100%'
                      width='100%'
                      style={{
                        objectFit: 'scale-down',
                        borderRadius: '14px',
                      }}
                      effect='blur'
                    />
                  </CardImg>
                  <CardBody open={open && v.id === id}>
                    <WrapTitle>
                      <TitleCard>{v.title}</TitleCard>
                      <Date>{moment(v.createdAt).format('LL')}</Date>
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
              {t('from1')} <span>{totalCount}</span> {t('operations1')}
            </Info>
            <Pagination
              page={filterValues.page}
              count={totalCount}
              onChange={handlechangePage}
              disabled={response.isLoading || response.isFetching}
            />
          </WrapPag>
        </Wrap>
      ) : (
        <WrapDefault>
          <img src={notification} alt='notification.png' />
          <span>{t('notificationsfromdiscount')}</span>
        </WrapDefault>
      )}
      <SideDrawer open={open}>
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
            src={info.image}
            height='100%'
            width='100%'
            style={{
              objectFit: 'scale-down',
              userSelect: 'none',
            }}
          />
        </SideImgWrap>
        <WrapScroll>
          <WrapInfoBox>
            <WrapTitle>
              <TitleCard>{info.title}</TitleCard>
              <Date>{moment(info.createdAt).format('LL')}</Date>
            </WrapTitle>
            <SideText>{info.body} </SideText>
          </WrapInfoBox>
          <WrapButton>
            <Button startIcon={<MessageIcon />}>{t('writetous')}</Button>
          </WrapButton>
        </WrapScroll>
      </SideDrawer>
    </Container>
  );
};

export default Notifications;
