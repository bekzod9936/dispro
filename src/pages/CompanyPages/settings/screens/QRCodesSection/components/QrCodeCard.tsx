import { memo, useState } from "react";
import QRCode from "qrcode.react";
import { IProps } from "./types";
import { downloadQR } from "./utils";
import useWindowWidth from "services/hooks/useWindowWidth";
import { Text } from "styles/CustomStyles";
import Popover from "components/Custom/Popover";
import {
  QrCard,
  QrRow,
  QeaderHeaderRow,
  QrContainer,
  OptionDiv,
  QrImg,
  DownloadDiv,
  SaveIcon,
  RightArrIcon,
  ScrapperIcon,
} from "./style";
import { Break } from "../../../styles/index";
import { OptionsList, OptionsListItem } from "styles/CustomStyles";
import { useTranslation } from "react-i18next";
import { COLORS } from "services/Types/enums";
import Button from "components/Custom/Button";
import { ThreeDotsIcon } from "assets/icons/SettingsIcons/SettingsPageIcon";
import { copyToClipboard } from "services/utils";
import { IconButton } from "@material-ui/core";

const QrCodeCard = ({
  item,
  index,
  handleEditClick,
  handleDeleteClick,
  handleOption,
  setId,
}: IProps) => {
  const { width } = useWindowWidth();
  const { t } = useTranslation();
  const [closeMenu, setCloseMenu] = useState<any>();

  const handleClose = (e: any) => {
    setCloseMenu(e);
    handleOption(item);
  };

  const downloadQrCode = () => {
    const canvas = document.getElementById(
      `referral-qr-code-${index}`
    ) as HTMLCanvasElement;
    downloadQR(canvas);
  };

  const qrSize = () => {
    if (width <= 600) {
      return 200;
    } else if (width > 600 && width <= 1000) {
      return 180;
    } else {
      return 150;
    }
  };

  return (
    <QrCard>
      <QeaderHeaderRow>
        <div>
          <Text fontSize="18px">{item.source}</Text>
        </div>

        <Popover
          click={
            <IconButton>
              <ThreeDotsIcon />
            </IconButton>
          }
          anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
          transformOrigin={{ horizontal: "left", vertical: "top" }}
          popoverStyle={{ marginTop: "20px" }}
          onClose={handleClose}
        >
          {/* {optionsOpen === item.id && ( */}
          <OptionDiv>
            <OptionsList style={{ width: "100%" }}>
              <OptionsListItem
                style={{ width: "100%" }}
                onClick={() => {
                  handleEditClick();
                  setId(item.id);
                  closeMenu.close();
                }}
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
                onClick={() => {
                  handleDeleteClick();
                  setId(item.id);
                  closeMenu.close();
                }}
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
        <QrImg>
          <QRCode
            id={`referral-qr-code-${index}`}
            value={item.dynLinkToken}
            size={qrSize()}
            bgColor="#FFFFFF"
            fgColor="#000000"
            level={"H"}
          />
        </QrImg>

        <QrContainer>
          <DownloadDiv>
            <Button
              buttonStyle={{
                color: "#fff",
                fontSize: {
                  desktop: 14,
                  laptop: 13,
                },
              }}
              width={{
                width: "100%",
              }}
              onClick={() => downloadQrCode()}
              startIcon={<SaveIcon />}
            >
              {t("downloadPNG")}
            </Button>
          </DownloadDiv>

          <Break height={15} />
          <Button
            buttonStyle={{
              bgcolor: " rgba(96, 110, 234, 0.1)",
              color: COLORS.purple,
              fontSize: {
                desktop: 14,
                laptop: 13,
              },
            }}
            width={{
              width: "90%",
            }}
            fullWidth={true}
            onClick={() => {
              copyToClipboard(item?.dynLinkToken);
            }}
            endIcon={width < 1000 ? <RightArrIcon /> : <ScrapperIcon />}
          >
            {t("copyLink")}
          </Button>
        </QrContainer>
      </QrRow>
    </QrCard>
  );
};

export default memo(QrCodeCard);
