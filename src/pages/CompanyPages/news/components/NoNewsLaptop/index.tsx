import React from 'react';
import { useTranslation } from 'react-i18next';
import { IProps } from '../Header/types';
import { FONT_SIZE } from '../../style';
//styles
import { Flex } from '../../style';
import { CreateNewsIcon } from '../../../../../assets/icons/NewsIcons/NewsIcons';
import { Text } from '../../style';
import noPending from '../../../../../assets/images/nopending.png';
import Button from 'components/Custom/Buttons/Button';
import { usePermissions } from "services/hooks/usePermissions";
const NoNewsLaptop: React.FC<IProps> = ({ handleOpenSetting }) => {
  const { t } = useTranslation();
  const isEditable=usePermissions('news')
  return (
    <>
      <Flex
        width='100%'
        height='100%'
        justifyContent='center'
        alignItems='center'
      >
        <Flex>
          <div className='imagePart' style={{ padding: '0px 20px' }}>
            <img src={noPending} style={{ width: '300px' }} />
          </div>
          <Flex
            margin='0px 0px 0px 10px'
            flexDirection='column'
            alignItems='flex-start'
          >
            <div style={{ maxWidth: '500px' }}>
              <Text fontSize={FONT_SIZE.mediumPlus} fontWeight={400}>
                {t('noPendingNews')}
              </Text>
            </div>
            <div style={{ marginTop: '15px' }}>
              <Button
                disabled={isEditable==false}
                onClick={handleOpenSetting}
                buttonStyle={{
                  bgcolor: 'rgb(96, 110, 234)',
                  color: '#fff',
                  weight: 500,
                  height: { desktop: 60, planshet: 45 },
                }}
                margin={{
                  desktop: '0 25px 0 0',
                  laptop: '0 25px 0 0',
                  planshet: '0 0px 0px 0',
                }}
                startIcon={<CreateNewsIcon />}
              >
                {t('createNews')}
              </Button>
            </div>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default NoNewsLaptop;
