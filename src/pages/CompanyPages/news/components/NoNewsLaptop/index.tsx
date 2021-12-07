import React from "react";
import { useTranslation } from "react-i18next";
import { IProps } from "../Header/types";
import { FONT_SIZE } from "../../../../../services/Types/enums";
//styles
import { Flex } from "../../../../../styles/BuildingBlocks";
import { Text } from "../../../../../styles/CustomStyles";
import noPending from "../../../../../assets/images/nopending.png";

const NoNewsLaptop: React.FC<IProps> = ({ handleOpenSetting }) => {
  const { t } = useTranslation();

  return (
    <>
      <Flex
        width="100%"
        height="100%"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Flex
          alignItems="center"
          margin="15px 0px 15px 0px"
          flexDirection="column"
        >
          <div className="imagePart">
            <img src={noPending} style={{ width: "250px" }} />
          </div>

          <Flex
            margin="0px 0px 0px 15px"
            flexDirection="column"
            alignItems="flex-start"
          >
            <div
              style={{
                textAlign: "center",
                maxWidth: "260px",
                paddingTop: "5%",
              }}
            >
              <Text fontSize={FONT_SIZE.meduim} fontWeight={400}>
                {t("noPendingNews")}
              </Text>
            </div>
            <div style={{ marginTop: "15px" }}></div>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default NoNewsLaptop;
