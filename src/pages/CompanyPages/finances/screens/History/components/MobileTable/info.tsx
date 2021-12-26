import { LazyLoadImage } from 'react-lazy-load-image-component';
import {
  Data,
  WrapIcon,
  WrapMain,
  FullName,
  Wrapper,
  Title,
  Amount,
  PinkIcon,
} from './style';

interface Props {
  avatar?: string;
  title?: string;
  value?: any;
  dataTitle?: any;
  setSelect?: any;
  setOpen?: any;
  select: any;
}

const Info = ({
  avatar,
  title,
  value,
  dataTitle,
  setSelect,
  setOpen,
  select,
}: Props) => {
  return (
    <Data
      onClick={async () => {
        await setSelect(select);
        await setOpen(true);
      }}
    >
      {avatar ? (
        <WrapIcon>
          <LazyLoadImage
            alt='avatar'
            height='40px'
            src={avatar}
            width='40px'
            effect='blur'
            style={{ objectFit: 'cover', borderRadius: '14px' }}
          />
        </WrapIcon>
      ) : (
        <PinkIcon />
      )}
      <WrapMain isAvatar={true}>
        <FullName>{title}</FullName>
        <Wrapper>
          <Title>{dataTitle}:</Title>
          <Amount>{value}</Amount>
        </Wrapper>
      </WrapMain>
    </Data>
  );
};

export default Info;
