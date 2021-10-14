import { memo } from "react";
import QRCode from "react-qr-code";
import { Text } from "styles/CustomStyles";
import { QrCard, QrRow } from "./style";
import { Break } from "../../../styles/index";
import { OptionsList, OptionsListItem } from "styles/CustomStyles";
import { useTranslation } from "react-i18next";
import { COLORS, FONT_SIZE } from "services/Types/enums";
import Button from "components/Custom/Button";
import {
  DownloadIcon,
  ScrapperIcon,
  ThreeDotsIcon,
} from "assets/icons/SettingsIcons/SettingsPageIcon";

interface IProps {
  item: any;
  optionsOpen: number | string;
  handleEditClick: any;
  handleDeleteClick: any;
  handleOption: any;
}

const QrCodeCard = ({
  item,
  optionsOpen,
  handleEditClick,
  handleDeleteClick,
  handleOption,
}: IProps) => {
  const { t } = useTranslation();

  return (
    <QrCard>
      <div
        style={{
          display: "flex",
          position: "relative",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <div>
          <Text fontSize="18px">{item.source}</Text>
        </div>
        <div onClick={handleOption}>
          <ThreeDotsIcon />
        </div>
        {optionsOpen === item.id && (
          <div
            style={{
              position: "absolute",
              top: 25,
              right: -25,
              zIndex: 2,
              width: "250px",
            }}
          >
            <OptionsList style={{ width: "100%" }}>
              <OptionsListItem
                style={{ width: "100%" }}
                onClick={handleEditClick}
              >
                <Text
                  marginLeft="0px"
                  marginRight="0px"
                  fontSize="16px"
                  fontWeight={400}
                >
                  {t("edit")}
                </Text>
              </OptionsListItem>
              <OptionsListItem
                onClick={handleDeleteClick}
                style={{ width: "100%" }}
              >
                <Text
                  marginLeft="0px"
                  marginRight="0px"
                  fontSize="16px"
                  fontWeight={400}
                  color={COLORS.red}
                >
                  {t("delete")}
                </Text>
              </OptionsListItem>
            </OptionsList>
          </div>
        )}
      </div>
      <QrRow>
        <div>
          <QRCode value={item.dynLinkToken} size={150} />
        </div>

        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            marginLeft: "15px",
          }}
        >
          <Button startIcon={<DownloadIcon />}>
            <Text marginLeft="15px" fontSize="17px" color="white">
              {t("downloadPNG")}
            </Text>
          </Button>
          <Break height={15} />
          <Button
            buttonStyle={{
              bgcolor: " rgba(96, 110, 234, 0.1)",
            }}
            endIcon={<ScrapperIcon />}
          >
            <Text fontSize={FONT_SIZE.mediumPlus} color={COLORS.purple}>
              {t("copyLink")}
            </Text>
          </Button>
        </div>
      </QrRow>
    </QrCard>
  );
};

export default memo(QrCodeCard);
