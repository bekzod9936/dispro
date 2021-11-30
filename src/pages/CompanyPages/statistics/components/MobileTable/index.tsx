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
  CloseIcon,
  WrapHeader,
  WrapTitle,
} from './style';

interface Props {
  data?: {
    title?: any;
    info?: {
      title?: any;
      avatar?: any;
      value?: any;
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
              {isAvatar ? (
                a.avatar ? (
                  <WrapIcon>{a.avatar}</WrapIcon>
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
                  <WrapHeader>
                    <WrapTitle>{headertitle}</WrapTitle>
                    <IconButton
                      style={{ marginRight: '-12px' }}
                      onClick={() => {
                        setOpen(false);
                        setId(null);
                      }}
                    >
                      <CloseIcon />
                    </IconButton>
                  </WrapHeader>
                  <Header>
                    <WrapAvatar>
                      {isAvatar ? (
                        a.avatar ? (
                          <>
                            <WrapIcon>{a.avatar}</WrapIcon>
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
