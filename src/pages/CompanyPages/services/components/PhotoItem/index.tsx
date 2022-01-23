//components
import ImageLazyLoad from "components/Custom/ImageLazyLoad/ImageLazyLoad";
import Spinner from "components/Helpers/Spinner";

//style
import { SpinnerWrapper, TrashIcon, TrashIconWrapper, Wrapper } from "./style";

interface PhotoItemProps {
  link: string;
  onDelete: () => void;
  isLoading: boolean;
  isCurrentItem: boolean;
}

export const PhotoItem: React.FC<PhotoItemProps> = ({
  isLoading,
  isCurrentItem,
  link,
  onDelete,
}) => {
  return (
    <Wrapper isLoading={isLoading && isCurrentItem} onClick={onDelete}>
      <ImageLazyLoad src={link} objectFit="cover" alt="imageItem" />
      {!isLoading && (
        <TrashIconWrapper>
          <TrashIcon />
        </TrashIconWrapper>
      )}
      {isLoading && isCurrentItem && (
        <SpinnerWrapper>
          <Spinner size={30} />
        </SpinnerWrapper>
      )}
    </Wrapper>
  );
};
