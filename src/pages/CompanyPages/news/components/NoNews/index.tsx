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
const NoNews: React.FC<IProps> = ({handleOpenSetting}) => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  return (
    <>
      <Flex
        width='100%'
        height='100%'
        justifyContent='center'
        alignItems='center'
      >
        <Flex alignItems='center' >
          <div className='imagePart'>
            <img   src={noPending} />
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
            <div style={{ marginTop: '15px' }}>
               {/* Settings side  */}
      <Button
        onClick={
          location.pathname !== "/staff/manager"
            ? handleOpenSetting
            : () => {
                console.log("Manager");
              }
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
        startIcon={<AddIconNews /> }
      >
        {t("Создать новость")}
      </Button>
              {/* <CustomButton
                onClick={() => {
                  createNews("createNews")
                }}
              >
                <CreateNewsIcon />
                <Text color='white'>{t('createNews')}</Text>
              </CustomButton> */}
            </div>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default NoNews;
