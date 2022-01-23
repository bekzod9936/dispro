import notificationDef from "assets/images/notificationDefault.png";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { CardWrap, CardImg, TitleCard, Text, CardBody } from "./style";
import { WrapTitle, Date1 } from "../../style";
import isYesterday from "dayjs/plugin/isYesterday";
import isToday from "dayjs/plugin/isToday";
import dayjs from "dayjs";

interface Props {
  onClick: () => void;
  value: {
    image: string;
    body: string;
    id: number;
    title: string;
    createdAt: string;
  };
  state: any;
}

const Card = ({ onClick = () => {}, value, state }: Props) => {
  const { image, body, title, createdAt, id } = value;

  dayjs.extend(isYesterday);
  dayjs.extend(isToday);

  return (
    <CardWrap onClick={onClick}>
      <CardImg>
        <LazyLoadImage
          alt="image"
          src={image ? image : notificationDef}
          height="100%"
          width="100%"
          style={{
            objectFit: "fill",
            borderRadius: "14px 14px 0 0",
            userSelect: "none",
          }}
          effect="blur"
          onError={(e: any) => {
            e.target.onerror = null;
            e.target.src = notificationDef;
          }}
        />
      </CardImg>
      <CardBody open={state.open && id === state.id}>
        <WrapTitle>
          <TitleCard> {title}</TitleCard>
          <Date1>{createdAt}</Date1>
        </WrapTitle>
        <Text>{body}</Text>
      </CardBody>
    </CardWrap>
  );
};

export default Card;
