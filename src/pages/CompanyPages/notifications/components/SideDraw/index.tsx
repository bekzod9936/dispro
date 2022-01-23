import { LazyLoadImage } from "react-lazy-load-image-component";
import {
  SideImgWrap,
  WrapIcon,
  CloseIcon,
  WrapScroll,
  WrapButton,
  SideText,
  Titletext,
  MessageIcon,
} from "./style";
import { WrapTitle, Date1 } from "../../style";
import Button from "components/Custom/Buttons/Button";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";
import notificationDef from "assets/images/notificationDefault.png";

interface Props {
  value: {
    body?: string;
    createdAt?: string;
    id?: number;
    image?: string;
    isSend?: boolean;
    title?: string;
  };
  onClick: () => void;
}

const SideDraw = ({ value, onClick = () => {} }: Props) => {
  const { image, body, title, createdAt } = value;

  const { t } = useTranslation();
  const history = useHistory();

  return (
    <>
      <SideImgWrap>
        <WrapIcon onClick={onClick}>
          <CloseIcon />
        </WrapIcon>
        <LazyLoadImage
          alt="image"
          src={image ? image : notificationDef}
          height="100%"
          width="100%"
          style={{
            objectFit: "fill",
            userSelect: "none",
          }}
          onError={(e: any) => {
            e.target.onerror = null;
            e.target.src = notificationDef;
          }}
        />
      </SideImgWrap>
      <WrapScroll>
        <div>
          <WrapTitle>
            <Titletext>{title}</Titletext>
            <Date1>{createdAt}</Date1>
          </WrapTitle>
          <SideText>{body} </SideText>
        </div>
        <WrapButton>
          <Button
            onClick={() => history.push("/support")}
            startIcon={<MessageIcon />}
            buttonStyle={{
              height: {
                mobile: 38,
              },
              shadow: "0px 4px 9px rgba(96, 110, 234, 0.46)",
              fontSize: {
                mobile: 14,
              },
            }}
          >
            {t("writetous")}
          </Button>
        </WrapButton>
      </WrapScroll>
    </>
  );
};

export default SideDraw;
