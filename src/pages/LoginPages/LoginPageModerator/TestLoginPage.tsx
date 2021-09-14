import React, { useEffect, useState } from 'react';
import {
  LeftSide,
  RightSide,
  WholePageWrapper,
} from '../../../styles/CustomStyles';
import { ImageWrapper, LeftWrapper } from './LoginPageStyles';
import jackMa from '../../../assets/images/JackMa.png';
import { Flex } from '../../../styles/BuildingBlocks';
import { Text } from '../../../styles/CustomStyles';
import { useTranslation } from 'react-i18next';
import { LoginPanel } from './LoginPanel';
import { MenuItem, NativeSelect, Select } from '@material-ui/core';
import { classicNameResolver } from 'typescript';
import { makeStyles } from '@material-ui/core';
import { borderRadius } from '@material-ui/system';
import { RuFlagIcons } from '../../../assets/icons/LoginPage/LoginPageIcons';
import {
  setLogIn,
  setProceedAuth,
} from '../../../services/redux/Slices/authSlice';
import { useQuery } from 'react-query';
import CompanyList from './CompanyList';
import { useAppDispatch, useAppSelector } from '../../../services/redux/hooks';
import RegistrationPanel from './RegistrationPanel';
import { Route } from 'react-router-dom';
import ReactCSSTransitionReplace from 'react-css-transition-replace';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { FONT_SIZE } from '../../../services/Types/enums';
import { useRouteMatch, useHistory } from 'react-router';
import SamWalton from '../../../assets/images/SamWalton.png';
import './Animation.css';
const useStyles = makeStyles({
  select: {
    border: '1px solid #223367',
    borderRadius: '46px',
    width: '160px',
    height: '40px',
  },
  paper: {
    width: 'fit-content',
    marginTop: '40px',
  },
  input: {
    paddingLeft: '20px',
    paddingRight: '15px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'start',
  },
});

const TestLoginPage = ({ children }: any) => {
  const { t } = useTranslation();
  const classes = useStyles();
  let accessToken = localStorage.getItem('partner_access_token');
  const [lang, setLang] = useState<any>('ru');
  let partner: any = useAppSelector((state) => state.auth.partnerLogin);
  const [selectState, setSelectState] = useState('russian');
  const match = useRouteMatch();
  const history = useHistory();
  const proceedAuth = useAppSelector((state) => state.auth.proceedAuth);
  const [imgContent, setImgContent] = useState('jack');
  const dispatch = useAppDispatch();
  const handleBackClick = () => {
    if (match.path.includes('/partner/company')) {
      localStorage.clear();
      history.push('/');
    }
    if (proceedAuth) {
      dispatch(setProceedAuth(false));
    }

    // else if()
  };
  useEffect(() => {
    setTimeout(() => {
      if (imgContent === 'jack') {
        setImgContent('sam');
      } else {
        setImgContent('jack');
      }
    }, 2000);
  }, [imgContent]);
  return (
    <>
      <WholePageWrapper>
        <div className='cort'></div>
        <LeftSide>
          <LeftWrapper style={{ maxWidth: '550px' }}>
            <ReactCSSTransitionReplace
              transitionName='cross-fade'
              transitionEnterTimeout={2000}
              transitionLeaveTimeout={800}
            >
              {imgContent === 'jack' ? (
                <div>
                  <ImageWrapper>
                    <img src={jackMa} alt='' />
                  </ImageWrapper>
                  <Flex
                    margin='70px 0px 40px 0px'
                    alignItems='center'
                    justifyContent='center'
                  >
                    <Text
                      fontSize='24px'
                      fontWeight={400}
                      color='white'
                      fontFamily='Playfair Display'
                    >
                      {t('JackMaWords')}
                    </Text>
                  </Flex>
                  <Flex
                    justifyContent='space-between'
                    width='100%'
                    margin='0px'
                  >
                    <div>
                      <Text fontSize='18px' fontWeight={700} color='white'>
                        &mdash; {t('JackMa')}
                      </Text>
                    </div>
                    <div
                      style={{
                        maxWidth: '400px',
                        display: 'flex',
                        alignItems: 'flex-start',
                      }}
                    >
                      <Text fontSize='15px' fontWeight={300} color='white'>
                        {t('JackMaInfo')}
                      </Text>
                    </div>
                  </Flex>
                </div>
              ) : (
                <div>
                  <ImageWrapper>
                    <img src={SamWalton} alt='' />
                  </ImageWrapper>
                  <Flex
                    margin='70px 0px 40px 0px'
                    alignItems='center'
                    justifyContent='center'
                    width='90%'
                  >
                    <Text
                      fontSize='24px'
                      fontWeight={400}
                      color='white'
                      fontFamily='Playfair Display'
                    >
                      {t('SamWaltonWords')}
                    </Text>
                  </Flex>
                  <Flex justifyContent='space-between' width='90%' margin='0px'>
                    <div>
                      <Text fontSize='18px' fontWeight={700} color='white'>
                        {t('SamWalton')}
                      </Text>
                    </div>
                    <div
                      style={{
                        maxWidth: '400px',
                        display: 'flex',
                        alignItems: 'flex-start',
                      }}
                    >
                      <Text fontSize='15px' fontWeight={300} color='white'>
                        {t('SamWaltonInfo')}
                      </Text>
                    </div>
                  </Flex>
                </div>
              )}
            </ReactCSSTransitionReplace>
          </LeftWrapper>
        </LeftSide>
        {/* <RightSide>
                    {((partner?.status === "old" && accessToken)) ?
                        <CompanyList />
                        : (partner?.status === "new") ? <RegistrationPanel /> : <LoginPanel />}
                </RightSide> */}
        <RightSide>
          <div
            style={{
              position: 'relative',
              width: '95%',
              top: '20px',
              marginLeft: '30px',
              height: 'fit-content',
              zIndex: 200,
              display: 'flex',
              alignSelf: 'start',
              justifyContent: 'space-between',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderTopLeftRadius: '70px',
                borderTopRightRadius: '14px',
                borderBottomLeftRadius: '14px',
                borderBottomRightRadius: '14px',
                background: '#e4e0ff',
                padding: '5px 15px',
                width: '100px',
              }}
              onClick={handleBackClick}
            >
              &larr; {t('back')}
            </div>

            <Select
              value={lang}
              className={classes.select}
              disableUnderline
              inputProps={{
                className: classes.input,
              }}
              defaultValue={lang}
              onChange={(e) => {
                setLang(e.target.value);
              }}
              MenuProps={{
                PaperProps: {
                  className: classes.paper,
                },
              }}
            >
              <MenuItem value='ru'>
                <RuFlagIcons />
                <Text
                  marginLeft='10px'
                  fontSize={FONT_SIZE.meduim}
                  fontWeight={500}
                >
                  Russian
                </Text>
              </MenuItem>
            </Select>
          </div>
          <div
            style={{
              flexGrow: 1,
              justifyContent: 'center',
              alignItems: 'center',
              display: 'flex',
              marginTop: '5%',
              width: '100%',
            }}
          >
            {children ? children : <LoginPanel />}
          </div>
        </RightSide>
      </WholePageWrapper>
    </>
  );
};

export default TestLoginPage;
