import React from 'react';
import {CreateNewsIcon} from '../../../../../assets/icons/NewsIcons/NewsIcons';
import { FONT_SIZE } from '../../../../../services/Types/enums';
import { Flex } from '../../../../../styles/BuildingBlocks';
import {  Text } from '../../../../../styles/CustomStyles';
import noPending from '../../../../../assets/images/nopending.png';

import { useTranslation } from 'react-i18next';

import Button from "components/Custom/Button";

import { IProps } from "../Header/types";
import useWindowWidth from "services/hooks/useWindowWidth";

const NoNews: React.FC<IProps> = ({handleOpenSetting}) => {

  const { t } = useTranslation();
  const {width}=useWindowWidth();
  return (
    <>
       <Flex
        width='100%'
        height='100%'
        justifyContent='center'
        alignItems='center'
        flexDirection='column'
      >
        <Flex alignItems='center' margin='15px 0px 15px 0px'  flexDirection='column'
              >
     
          <div className='imagePart'  >
            <img   src={noPending}style={{width:'220px'}} />
        </div>
         
       <Flex
            margin='0px 0px 0px 15px'
            flexDirection='column'
       
            alignItems='flex-start'
          >
            <div style={{textAlign: 'center' ,maxWidth:'233px',paddingTop:'5%'}}>
              <Text fontSize={FONT_SIZE.smallPlus} fontWeight={400}>
                {t('noPendingNews')}
              </Text>
            </div>
            <div style={{ marginTop: '15px' }}>
               {/* Settings side  */}
     
            
            </div>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default NoNews;
