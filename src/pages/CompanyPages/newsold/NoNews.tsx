import React from 'react';
import { CreateNewsIcon } from '../../../assets/icons/NewsIcons/NewsIcons';
import { FONT_SIZE } from '../../../services/Types/enums';
import { Flex } from '../../../styles/BuildingBlocks';
import { CustomButton, Text } from '../../../styles/CustomStyles';
import noPending from '../../../assets/images/nopending.png';
import { useTranslation } from 'react-i18next';
interface IProps {
  setStatus?: any;
}
const NoNews: React.FC<IProps> = () => {
  const { t } = useTranslation();
  return (
    <>
      <Flex
        width='100%'
        height='100%'
        justifyContent='center'
        alignItems='center'
      >
        <Flex alignItems='center'>
          <div className='imagePart'>
            <img src={noPending} />
          </div>
          <Flex
            margin='0px 0px 0px 15px'
            flexDirection='column'
            alignItems='flex-start'
          >
            <div style={{ maxWidth: '470px' }}>
              <Text fontSize={FONT_SIZE.mediumPlus} fontWeight={400}>
                {t('noPendingNews')}
              </Text>
            </div>
            {/* <div style={{ marginTop: '15px' }}>
              <CustomButton
                onClick={() => {
                  setStatus('create_news');
                }}
              >
                <CreateNewsIcon />
                <Text color='white'>{t('createNews')}</Text>
              </CustomButton>
            </div> */}
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default NoNews;
