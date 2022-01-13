import Spinner from "components/Custom/Spinner";
import { useFormContext, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { LazyLoadImage } from "react-lazy-load-image-component";
import LogoDef from "assets/icons/SideBar/logodefault.png";
import { Text, Title } from "../../../../style";
import {
  Message,
  Label,
  PhotoLoadingIcon,
  PhotoWrap,
  WrapTrash,
  TrashIcon,
} from "./style";
import usePhoto from "./usePhoto";

const Logo = () => {
  const { t } = useTranslation();

  const logo = useWatch({ name: "logo" });
  const { handleUpload, handlePhotoDelete } = usePhoto();
  const { getValues } = useFormContext();

  return (
    <div>
      <Title>{t("logo")}</Title>
      <div>
        {logo ? null : (
          <Text weight="normal" color="#C4C4C4">
            {t("logo_text")}
          </Text>
        )}
        <input
          accept="image/*"
          style={{ display: "none" }}
          id="logo1"
          type="file"
          onChange={handleUpload}
        />
        {logo ? (
          false ? (
            <Spinner />
          ) : logo === "" ? (
            <Label htmlFor="logo1">
              {t("upload_photo")} <PhotoLoadingIcon />
            </Label>
          ) : (
            <div>
              <PhotoWrap
                onClick={async () => {
                  await handlePhotoDelete(getValues("logo"));
                }}
              >
                <LazyLoadImage
                  alt="image"
                  src={logo}
                  height="100%"
                  width="100%"
                  style={{
                    objectFit: "scale-down",
                    borderRadius: "14px",
                  }}
                  effect="blur"
                  onError={(e: any) => {
                    e.target.onerror = null;
                    e.target.src = LogoDef;
                  }}
                />
                <WrapTrash>
                  <TrashIcon />
                </WrapTrash>
              </PhotoWrap>
            </div>
          )
        ) : false ? (
          <Spinner />
        ) : (
          <Label htmlFor="logo1">
            {t("upload_photo")} <PhotoLoadingIcon />
          </Label>
        )}
      </div>
      <Message>{t("addinfologo")}</Message>
    </div>
  );
};

export default Logo;
