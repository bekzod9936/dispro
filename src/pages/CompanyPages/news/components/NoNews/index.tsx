import React from 'react';
import {CreateNewsIcon} from '../../../../../assets/icons/NewsIcons/NewsIcons';
import { FONT_SIZE } from '../../../../../services/Types/enums';
import { Flex } from '../../../../../styles/BuildingBlocks';
import {  Text } from '../../../../../styles/CustomStyles';
import noPending from '../../../../../assets/images/nopending.png';
import { useLocation } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { useAppSelector, useAppDispatch } from "services/redux/hooks";
import Button from "components/Custom/Button";
import { AddIconNews } from "assets/icons/InfoPageIcons/InfoPageIcons";
import { IProps } from "../Header/types";
import useWindowWidth from "services/hooks/useWindowWidth";

const NoNews: React.FC<IProps> = ({handleOpenSetting}) => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const {width}=useWindowWidth();
  return (
    <>
      <Flex
        width='100%'
        height='100%'
        justifyContent='center'
        alignItems='center'
      >
        <Flex alignItems='center' >
        {width>600 ?
          <div className='imagePart'>
            <img   src={noPending} />
          </div>
         : <div style={{paddingRight: '4%',
          paddingTop: '15%'}} >
         <img   src={noPending} />
       </div>}
        {width>600 &&  <Flex
            margin='0px 0px 0px 15px'
            flexDirection='column'
            alignItems='flex-start'
          >
            <div style={{ maxWidth: '485px' }}>
              <Text fontSize={FONT_SIZE.mediumPlus} fontWeight={400}>
                {t('noPendingNews')}
              </Text>
            </div>
            <div style={{ marginTop: '15px' }}>
               {/* Settings side  */}
      <Button
        onClick={
         
            handleOpenSetting
            
        }
        buttonStyle={{
          bgcolor: "rgb(96, 110, 234)",
          color: "#fff",
          weight: 500,
          height: { desktop: 60 },
        }}
        margin={{
          desktop: "0 25px 0 0",
          laptop: "0 25px 0 0",
          planshet: "0 0 20px 0",
        }}
        startIcon={<CreateNewsIcon /> }
      >
        {t("Создать новость")}
      </Button>
            
            </div>
          </Flex>}
        </Flex>
      </Flex>
    </>
  );
};

export default NoNews;
