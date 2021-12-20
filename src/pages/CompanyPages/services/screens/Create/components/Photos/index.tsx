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

interface PhotosProps {}

export const Photos: React.FC<PhotosProps> = () => {
  const { t } = useTranslation();
  const imageRef = useRef<null | string>(null);

  const { links, uploadImage, deleteImage, setLinks, errors } = useImage();

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
            {errors.images && (
              <ErrorMessage>{t("chooseAtLeastOneImage")}</ErrorMessage>
            )}
          </>
        )}
      </Header>
      <GridContainer>
        {links.map((link, index) => (
          <PhotoItem
            isCurrentItem={imageRef.current === link}
            onDelete={onDelete}
            isLoading={deleteImage.isLoading}
            link={link}
            key={index}
          />
        ))}
      </GridContainer>
    </div>
  );
};
