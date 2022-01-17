import { useRef } from "react";

//packages
import { useTranslation } from "react-i18next";

//components
import { PhotoItem } from "pages/CompanyPages/services/components/PhotoItem";
import { UploadButton } from "pages/CompanyPages/services/components/UploadButton";

//style
import { ErrorMessage, GridContainer, Header } from "./style";

//other
import { useImage } from "pages/CompanyPages/services/hooks";
import { getCorrectPostfixFromPhotosAmount } from "pages/CompanyPages/services/helpers";

interface PhotosProps {}

export const Photos: React.FC<PhotosProps> = () => {
  const { t } = useTranslation();
  const imageRef = useRef<null | string>(null);

  // const { links, uploadImage, deleteImage, setLinks, errors } = useImage();
  const { images, uploadImage, deleteImage, errors, handleRemove } = useImage();

  const imageLimit = 5 - images?.length;

  const onUpload = (formDatas: FormData[]) => {
    formDatas.forEach((formData) => {
      uploadImage.mutate(formData);
    });
  };

  const onDelete = (index: number, id: string) => {
    imageRef.current = id;
    handleRemove(index);
    // setLinks((prev) => prev.filter((item) => item !== link));
    // deleteImage.mutate(link);
  };

  return (
    <div>
      <Header>
        <h5>{t("photos")}</h5>
        {images?.length < 5 && (
          <>
            <p>
              Можно загрузить еще {imageLimit}{" "}
              {getCorrectPostfixFromPhotosAmount(imageLimit)} JPG или PNG,
              минимальное разрешение 400*400рх, размер не более 3Мбайт.
            </p>
            <UploadButton
              isLoading={uploadImage.isLoading}
              handleUpload={onUpload}
              imagesLength={images.length}
            />
            {errors.images && (
              <ErrorMessage>{t("chooseAtLeastOneImage")}</ErrorMessage>
            )}
          </>
        )}
      </Header>
      <GridContainer>
        {images.map((link, index) => (
          <PhotoItem
            isCurrentItem={imageRef.current === link.url}
            onDelete={() => onDelete(index, link.id)}
            isLoading={deleteImage.isLoading}
            link={link.url}
            key={link.id}
          />
        ))}
      </GridContainer>
    </div>
  );
};
