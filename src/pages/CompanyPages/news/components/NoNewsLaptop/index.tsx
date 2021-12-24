import React from "react";
import { useTranslation } from "react-i18next";
import { IProps } from "../Header/types";
import { FONT_SIZE } from "../../../../../services/Types/enums";
//styles
import { Flex } from "../../../../../styles/BuildingBlocks";
import { CreateNewsIcon } from "../../../../../assets/icons/NewsIcons/NewsIcons";
import { Text } from "../../../../../styles/CustomStyles";
import noPending from "../../../../../assets/images/nopending.png";
import Button from "components/Custom/Button";
const NoNewsLaptop: React.FC<IProps> = ({ handleOpenSetting }) => {
  const { t } = useTranslation();

  return (
    <>
       <Flex
        width="100%"
        height="100%"
        justifyContent="center"
        alignItems="center"
      >
        <Flex >
          <div className="imagePart" style={{padding:'0px 20px'}}>
            <img src={noPending} style={{width:'300px'}}/>
          </div>
          <Flex
            margin="0px 0px 0px 10px"
            flexDirection="column"
            alignItems="flex-start"
          >
            <div style={{ maxWidth: "500px" }}>
              <Text fontSize={FONT_SIZE.mediumPlus} fontWeight={400}>
                {t("noPendingNews")}
              </Text>
            </div>
            <div style={{ marginTop: "15px" }}>
              <Button
                onClick={handleOpenSetting}
                buttonStyle={{
                  bgcolor: "rgb(96, 110, 234)",
                  color: "#fff",
                  weight: 500,
                  height: { desktop: 60,planshet:45 },
                }}
                margin={{
                  desktop: "0 25px 0 0",
                  laptop: "0 25px 0 0",
                  planshet: "0 0px 0px 0",
                }}
                startIcon={<CreateNewsIcon />}
              >
                {t("createNews")}
              </Button>
            </div>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default NoNewsLaptop;
