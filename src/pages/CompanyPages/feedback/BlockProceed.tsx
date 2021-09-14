import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  CustomButton,
  ModalComponent,
  Text,
} from '../../../styles/CustomStyles';
import blockChatDelet from '../../../assets/images/blockChatDeletion.png';
import { Flex } from '../../../styles/BuildingBlocks';

const BlockProceed = ({ process, setProcess }: any) => {
  const { t } = useTranslation();
  const handleContinueButton = () => {
    setProcess('success');
  };
  return (
    <ModalComponent justifyContent='stretch' position='relative' height='314px'>
      <div
        style={{
          position: 'relative',
          top: -160,
          left: 170,
          objectFit: 'contain',
          display: 'flex',
          justifyContent: 'center',
          maxWidth: '300px',
          maxHeight: '200px',
        }}
      >
        <img src={blockChatDelet} alt='asdf' />
      </div>
      <div
        style={{
          width: '100%',
          position: 'relative',
          top: '-170px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div
          style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
        >
          <div
            style={{ width: '410px', marginTop: '25px', textAlign: 'center' }}
          >
            <Text
              fontSize='18px'
              fontWeight={500}
              marginLeft='0px'
              marginRight='0px'
            >
              Чат может быть только в случае если переписка не велась в течение
              последних 3 месяцев
            </Text>
          </div>
        </div>
        <div
          style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
        >
          <div
            style={{ width: '232px', marginTop: '25px', textAlign: 'center' }}
          >
            <Text
              fontSize='14px'
              fontWeight={300}
              marginLeft='0px'
              marginRight='0px'
            >
              После удаления чата, переписка на стороне клиента сохранится
            </Text>
          </div>
        </div>
        <div
          onClick={handleContinueButton}
          style={{
            width: '100%',
            display: 'flex',
            marginTop: '40px',
            justifyContent: 'center',
          }}
        >
          <CustomButton color='white'>
            <Text fontSize='16px' fontWeight={500} color='white'>
              {' '}
              {t('continue')}{' '}
            </Text>
          </CustomButton>
        </div>
      </div>
    </ModalComponent>
  );
};

export default BlockProceed;
