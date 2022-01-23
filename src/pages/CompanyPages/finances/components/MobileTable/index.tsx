import { ReactComponent as LeftBack } from 'assets/icons/FinanceIcons/leftback.svg';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import FullModal from 'components/Custom/FullModal';
import { useState } from 'react';
import { IconButton } from '@material-ui/core';
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
} from './style';

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
}

const MobileTable = ({ data, headertitle, isAvatar }: Props) => {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState<any>(null);

  return (
    <Container>
      {data?.info?.map((a: any, i: number) => {
        return (
          <>
            <Data
              onClick={() => {
                setOpen(true);
                setId(i);
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
              <WrapMain isAvatar={isAvatar}>
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
                        setId(null);
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
              </FullModal>
            ) : null}
          </>
        );
      })}
    </Container>
  );
};

export default MobileTable;
