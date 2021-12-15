import { UploadButton } from "pages/CompanyPages/services/components/UploadButton";
import { useImage } from "pages/CompanyPages/services/hooks";

import { useTranslation } from "react-i18next";
import { GridContainer, Header, Image } from "./style";

interface PhotosProps {}

export const Photos: React.FC<PhotosProps> = () => {
  const { t } = useTranslation();

  const { links, uploadImage, deleteImage, setLinks } = useImage();
  const imageLimit = 5 - links.length;

  const onUpload = (formDatas: FormData[]) => {
    formDatas.forEach((formData) => {
      uploadImage.mutate(formData);
    });
  };

  const onDelete = (link: string) => {
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
          <Image
            onClick={() => onDelete(link)}
            src={link}
            alt={"image" + index}
          />
        ))}
      </GridContainer>
    </div>
  );
};
