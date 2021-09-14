import React, { useState } from 'react';
import { RightSideDrawer } from '../../../styles/Elements';
import { Flex } from '../../../styles/BuildingBlocks';
import { Avatar } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from '../../../services/redux/hooks';
import {
  ClicableOption,
  CustomButton,
  Text,
} from '../../../styles/CustomStyles';
import { useTranslation } from 'react-i18next';
import {
  CloseIcon,
  CoinsIcon,
  CrownIcon,
  ProfileIcon,
} from '../../../assets/icons/ClientsPageIcons/ClientIcons';
import { setPersCardClient } from '../../../services/redux/Slices/clientSlice';

interface IProps {
  handleAccurePoints: () => void;
  handleSubstractPoints: () => void;
  handleVip: () => void;
  handleChoseAlll: (value: any) => void;
  handleCancelChose: () => void;
}

const RightSide: React.FC<IProps> = ({
  handleAccurePoints,
  handleSubstractPoints,
  handleVip,
  handleCancelChose,
  handleChoseAlll,
}) => {
  const client: any = useAppSelector((state) => state.clients.checkedClients);
  const [clientCard, setClientCard] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  return (
    <RightSideDrawer>
      <Flex justifyContent='space-between' flexDirection='column' height='100%'>
        <Flex
          flexDirection='column'
          justifyContent='space-between'
          alignItems='flex-start'
          margin='25px 0px 0px 32px'
        >
          {client.length < 2 ? (
            <Flex
              justifyContent='start'
              alignItems='center'
              margin='0px 0px 25px 0px'
            >
              <Avatar
                src={client[0].image}
                style={{ width: '60px', height: '60px', borderRadius: '12px' }}
              />
              <Flex
                flexDirection='column'
                alignItems='flex-start'
                margin='0px 0px 0px 10px'
                justifyContent='space-between'
              >
                <div>
                  <Text fontSize='21px' marginLeft='0px' fontWeight={700}>
                    {`${client[0].firstName} ${client[0].lastName}`}
                  </Text>
                </div>
                <div>
                  <Text fontSize='15px' marginLeft='0px' fontWeight={300}>{`${t(
                    'status'
                  )}:${
                    client[0].addInfo.status.charAt(0).toUpperCase() +
                    client[0].addInfo.status.slice(1)
                  }`}</Text>
                </div>
              </Flex>
            </Flex>
          ) : (
            <Flex
              justifyContent='space-between'
              width='100%'
              margin='0px 0px 20px 0px '
            >
              <Text marginLeft='0px' fontSize='17px' fontWeight={400}>
                {t('chosen')} {`${client?.length}`}{' '}
              </Text>
              <CloseIcon />
            </Flex>
          )}
          <div>
            <ClicableOption onClick={handleAccurePoints}>
              <Text
                marginLeft='0px'
                marginRight='10px'
                fontSize='17px'
                fontWeight={500}
                color='#606EEA'
              >
                {t('accurePoints')}
              </Text>
              <CoinsIcon />
            </ClicableOption>
            <ClicableOption onClick={handleSubstractPoints}>
              <Text
                marginLeft='0px'
                marginRight='10px'
                fontSize='17px'
                fontWeight={500}
                color='#606EEA'
              >
                {t('substractPoints')}
              </Text>
              <CoinsIcon />
            </ClicableOption>
            <ClicableOption onClick={handleVip}>
              <Text
                marginLeft='0px'
                marginRight='10px'
                fontSize='17px'
                fontWeight={500}
                color='#606EEA'
              >
                {t('VIP%')}
              </Text>
              <CrownIcon />
            </ClicableOption>
          </div>

          {client.length < 2 ? (
            <>
              <Flex
                flexDirection='column'
                justifyContent='space-between'
                alignItems='center'
                margin='50px 0px 0px 0px'
              >
                <div>
                  <Text fontSize='15px' color='#C7C7C7' fontWeight={700}>
                    {' '}
                    {t('totlaSumPurchase')}
                  </Text>
                </div>
                <div style={{ marginTop: '20px' }}>
                  <Text fontWeight={700} fontSize='16px'>
                    0.0
                  </Text>
                </div>
              </Flex>
              <Flex
                flexDirection='column'
                justifyContent='space-between'
                alignItems='center'
                margin='30px 0px 0px 0px'
              >
                <div>
                  <Text fontSize='15px' color='#C7C7C7' fontWeight={700}>
                    {' '}
                    {t('visitsQuantity')}
                  </Text>
                </div>
                <div style={{ marginTop: '20px' }}>
                  <Text fontWeight={700} fontSize='16px'>
                    0.0
                  </Text>
                </div>
              </Flex>
            </>
          ) : (
            <>
              <Flex
                onClick={handleChoseAlll}
                width='100%'
                justifyContent='center'
                margin='20px 0px 0px 0px'
              >
                <Text fontSize='17px' fontWeight={400} color='#3492FF'>
                  {t('choseAllClients')}
                </Text>
              </Flex>
              <Flex
                onClick={handleCancelChose}
                width='100%'
                justifyContent='center'
                margin='20px 0px 0px 0px'
              >
                <Text fontSize='17px' fontWeight={400} color='#3492FF'>
                  {t('cancelChose')}
                </Text>
              </Flex>
            </>
          )}

          {/* <Text fontSize="13px" fontWeight={300}></Text> */}
        </Flex>

        {client.length < 2 && (
          <Flex
            justifyContent='center'
            alignItems='flex-end'
            margin='auto auto 100px auto'
          >
            <CustomButton
              onClick={() => {
                setClientCard(true);
                dispatch(setPersCardClient(client[0]));
              }}
            >
              <ProfileIcon />
              <Text color='white'>{t('clientCard')}</Text>
            </CustomButton>
          </Flex>
        )}
      </Flex>
    </RightSideDrawer>
  );
};

export default RightSide;
