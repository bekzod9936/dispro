import ImageLazyLoad from "components/Custom/ImageLazyLoad/ImageLazyLoad";
import Spinner from "components/Helpers/Spinner";
import { UploadButton } from "pages/CompanyPages/services/components/UploadButton";
import { useImage } from "pages/CompanyPages/services/hooks";
import { useRef } from "react";

import { useTranslation } from "react-i18next";
import {
  GridContainer,
  GridItem,
  Header,
  SpinnerWrapper,
  TrashIcon,
  TrashIconWrapper,
} from "./style";

interface PhotosProps {}

export const Photos: React.FC<PhotosProps> = () => {
  const { t } = useTranslation();
  const imageRef = useRef<null | string>(null);

  const { links, uploadImage, deleteImage, setLinks } = useImage();
  const imageLimit = 5 - links.length;

  const onUpload = (formDatas: FormData[]) => {
    formDatas.forEach((formData) => {
      uploadImage.mutate(formData);
    });
  };

  const onDelete = (link: string) => {
    imageRef.current = link;
    deleteImage.mutate(link, {
      onSuccess() {
        setLinks((prev) => prev.filter((item) => item !== link));
      },
    });
  };

  return (
    <div>
      <Header>
        <h5>{t("photos")}</h5>
        {links.length < 5 && (
          <>
            <p>
              Можно загрузить еще {imageLimit}{" "}
              {imageLimit === 1 ? "фотографию" : "фотографий"} JPG или PNG,
              минимальное разрешение 400*400рх, размер не более 3Мбайт.
            </p>
            <UploadButton
              isLoading={uploadImage.isLoading}
              handleUpload={onUpload}
              imagesLength={links.length}
            />
          </>
        )}
      </Header>
      <GridContainer>
        {links.map((link, index) => (
          <GridItem
            isLoading={deleteImage.isLoading && imageRef.current === link}
            onClick={() => onDelete(link)}
          >
            <ImageLazyLoad
              src={link}
              objectFit="cover"
              alt={"image_" + index}
            />
            {!deleteImage.isLoading && (
              <TrashIconWrapper>
                <TrashIcon />
              </TrashIconWrapper>
            )}
            {deleteImage.isLoading && imageRef.current === link && (
              <SpinnerWrapper>
                <Spinner size={30} />
              </SpinnerWrapper>
            )}
          </GridItem>
        ))}
      </GridContainer>
    </div>
  );
};
