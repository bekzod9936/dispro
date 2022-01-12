import usePhotos from "./usePhotos";
import { useTranslation } from "react-i18next";
import NoPhoto from "assets/images/NoPhotos.png";
import Spinner from "components/Custom/Spinner";
import { ruCount } from "services/utils/index";
import useWindowWidth from "services/hooks/useWindowWidth";
import SaveButton from "../../components/Buttons/SaveButton";
import RenderImages from "./RenderImages";
import { ReactComponent as PhotoIcon } from "assets/icons/IconsInfo/photo.svg";
import {
  Container,
  Text,
  ImgNo,
  WrapNoPhoto,
  LabelNoPhoto,
  Wrpaper,
  DownSide,
} from "./style";

const Photos = () => {
  const { t } = useTranslation();
  const { width } = useWindowWidth();

  const {
    resUploading,
    images,
    setImages,
    handleUpload,
    count,
    submitImg,
    handleSubmit,
  } = usePhotos();

  if (submitImg.isLoading) {
    return <Spinner />;
  }

  return (
    <Container>
      <div>
        <input
          accept="image/*"
          style={{ display: "none" }}
          id="photosloading"
          type="file"
          multiple
          onChange={handleUpload}
        />
        {images.length === 0 ? (
          <WrapNoPhoto>
            <ImgNo src={NoPhoto} alt="nophoto" />
            <Text maxwidth="500px" align="center">
              {t("infouploadphotos1")}
              <span>
                <span> {count} </span>
                {ruCount({
                  count: count,
                  firstWord: "фотографию",
                  secondWord: "фотографии",
                  thirdWord: "фотографий",
                })}
              </span>
              {t("infouploadphotos2")}
            </Text>
            <LabelNoPhoto htmlFor="photosloading">
              <span>{t("upload_photo")}</span>
              <PhotoIcon />
            </LabelNoPhoto>
          </WrapNoPhoto>
        ) : (
          <>
            {images.length < 10 ? (
              <Text maxwidth="800px">
                {t("infouploadphotos1")}
                <span>
                  <span> {count} </span>
                  {ruCount({
                    count: count,
                    firstWord: "фотографию",
                    secondWord: "фотографии",
                    thirdWord: "фотографий",
                  })}
                </span>
                {t("infouploadphotos2")}
              </Text>
            ) : null}
            <Text maxwidth="800px">{t("dragdropphoto")}</Text>
            <Wrpaper>
              {resUploading.isLoading ? (
                <Spinner />
              ) : (
                <RenderImages state={[images, setImages]} />
              )}
              {width > 1000 ? (
                <SaveButton
                  onClick={handleSubmit}
                  margin={{
                    laptop: "20px 0 20px 0",
                  }}
                  disabled={submitImg.isLoading}
                  type="button"
                />
              ) : null}
            </Wrpaper>
          </>
        )}
      </div>
      {width <= 1000 && images.length > 0 ? (
        <DownSide>
          <div>
            {images.length === 10 ? null : (
              <LabelNoPhoto htmlFor="photosloading">
                <span>{t("addphoto")}</span>
                <PhotoIcon />
              </LabelNoPhoto>
            )}
            <SaveButton
              onClick={handleSubmit}
              margin={{
                laptop: "20px 0 20px 0",
                planshet: "0 0 0 20px",
                mobile: "0",
              }}
              disabled={submitImg.isLoading}
              type="button"
            />
          </div>
        </DownSide>
      ) : null}
    </Container>
  );
};

export default Photos;
