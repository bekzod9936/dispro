import { memo } from "react";
import QRCode from "qrcode.react";

import { Text } from "styles/CustomStyles";
import Popover from "components/Custom/Popover";
import {
  QrCard,
  QrRow,
  QeaderHeaderRow,
  QrContainer,
  OptionDiv,
} from "./style";
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
import RippleEffect from "components/Custom/RippleEffect";

interface IProps {
  item: any;
  optionsOpen: number | string;
  handleEditClick: any;
  handleDeleteClick: any;
  handleOption: any;
}

const QrCodeCard = ({
  item,
  handleEditClick,
  handleDeleteClick,
  handleOption,
}: IProps) => {
  const { t } = useTranslation();

  const downloadQR = () => {
    console.log(item?.dynLinkToken, "dynamic Link token");

    const canvas = document.getElementById(
      "referral-qr-code"
    ) as HTMLCanvasElement;
    const pngUrl = canvas
      ?.toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "qr-code.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <QrCard>
      <QeaderHeaderRow>
        <div>
          <Text fontSize="18px">{item.source}</Text>
        </div>
        {/* <div onClick={handleOption}>
          <ThreeDotsIcon />
        </div> */}

        <Popover
          click={
            <RippleEffect padding={0}>
              <ThreeDotsIcon />
            </RippleEffect>
          }
          anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
          transformOrigin={{ horizontal: "left", vertical: "top" }}
          popoverStyle={{ marginTop: "20px" }}
          onClose={handleOption}
        >
          {/* {optionsOpen === item.id && ( */}
          <OptionDiv>
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
          </OptionDiv>
          {/* )} */}
        </Popover>
      </QeaderHeaderRow>
      <QrRow>
        <div>
          <QRCode
            id="referral-qr-code"
            value={item.dynLinkToken}
            size={150}
            bgColor="#FFFFFF"
            fgColor="#000000"
            level={"H"}
          />
        </div>

        <QrContainer>
          <Button onClick={() => downloadQR()} startIcon={<DownloadIcon />}>
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
        </QrContainer>
      </QrRow>
    </QrCard>
  );
};

export default memo(QrCodeCard);
