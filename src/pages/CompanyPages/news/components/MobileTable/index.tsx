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
  WrapBoxDetail,
  BoxinfoDetail,
  BoxInfo,
  WrapMain,
  WrapIcon,
  PinkIcon,
  WrapAvatar,
} from './style';

interface Props {
  data?: any
}

const MobileTable = ({ data}: Props) => {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState<any>(null);
 console.log('datamobile',data);
  return (
   
    <Container>
      {data?.map((a: any, i: number) => {
        return (
          <>
            <Data
              onClick={() => {
                setOpen(true);
                setId(i);
              }}
            >
              {a ? (
                a.fullData?.data?.image? (
                  <WrapIcon>
                    <LazyLoadImage
                      alt='avatar'
                      height='40px'
                      src={a.fullData?.data?.image}
                      width='40px'
                      effect='blur'
                      style={{ objectFit: 'cover', borderRadius: '14px' }}
                    />
                  </WrapIcon>
                ) : (
                  <PinkIcon />
                )
              ) : null}
              <WrapMain isAvatar={a.fullData?.data?.image}>
                <FullName>{a.fullData?.data?.title}</FullName>
                <Wrapper>
                  <Title>{a.fullData?.data?.description?.length>20 ?a.fullData?.data?.description.slice(0,20)+'..': a.fullData?.data?.description}:</Title>
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
                          <>
                            <WrapIcon>
                              <LazyLoadImage
                                alt='avatar'
                                height='50px'
                                src={a.fullData?.data?.image}
                                width='50px'
                                effect='blur'
                                style={{
                                  objectFit: 'cover',
                                  borderRadius: '14px',
                                }}
                              />
                            </WrapIcon>
                            <div style={{display:'block'}}>
                            <p style={{fontSize:'16px',color:'#223367',fontWeight: 500}}>{a.fullData?.data?.title}</p>
                            <span style={{fontSize:'14px',color:'#223367'}}>Push-up</span>
                            </div>
                          </>
                        
                    </WrapAvatar>
                  </Header>
                  <WrapBox>
                        <p style={{color:'#C7C7C7'}}>Описание</p>
                        <Box>
                          <BoxInfo>{a.fullData?.data?.description}</BoxInfo>
                        </Box>
                    
                  </WrapBox>
                  <WrapBoxDetail>
                        <p style={{color:'#C7C7C7'}}>Информация</p>
                        <Box>
                          <BoxinfoDetail>{'Только для мужчин'}</BoxinfoDetail>
                          <BoxinfoDetail>{'Срок публикции: 31 Мая - 15 Июня 2021'}</BoxinfoDetail>
                          <BoxinfoDetail>{'Возрастное ограничение: 18+'}</BoxinfoDetail>
                        </Box>
                    
                  </WrapBoxDetail>
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
