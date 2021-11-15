import { useTranslation } from 'react-i18next';
import { ReactComponent as LeftBack } from 'assets/icons/FinanceIcons/leftback.svg';
import FullModal from '../FullModal';
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
} from './style';

interface Props {
  data?: {
    title?: any;
    info?: {
      title?: any;
      icon?: any;
      value?: any;
      body?: { title?: any; value?: any }[];
    }[];
  };
  headertitle?: string;
}

const MobileTable = ({ data, headertitle }: Props) => {
  const { t } = useTranslation();

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
              {a?.icon ? <WrapIcon>{a?.icon}</WrapIcon> : null}
              <WrapMain>
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
                    <span>{headertitle}</span>
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
