import { Controller, useFormContext, useWatch } from "react-hook-form";
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
import { useRef } from "react";

const Logo = () => {
  const { t } = useTranslation();
  const ref: any = useRef();
  const logo = useWatch({ name: "logo" });
  const companyId: any = localStorage.getItem("companyId");
  const { resizeFile, dataURIToBlob } = usePhoto();
  const {
    control,
    getValues,
    setValue,
    formState: { errors },
    clearErrors,
  } = useFormContext();

  const handleUpload = async (e: any) => {
    const file = e.target.files[0];
    const image = await resizeFile(file);
    await setValue("logo", image);
    const newFile = await dataURIToBlob(image);
    const formData = new FormData();
    await formData.append("itemId", `${companyId}`);
    await formData.append("fileType", "companyLogo");
    await formData.append("file", newFile, "logo.png");
    await setValue("upload", newFile);
    await clearErrors("logo");
  };
  console.log(errors, "errors");
  return (
    <div>
      <Title>{t("logo")}</Title>
      <div>
        {Boolean(logo) ? null : (
          <Text weight="normal" color="#C4C4C4">
            {t("logo_text")}
          </Text>
        )}
        <Controller
          name="logo"
          control={control}
          rules={{ required: true }}
          defaultValue=""
          render={() => (
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="logo1"
              type="file"
              ref={ref}
              onChange={handleUpload}
            />
          )}
        />
        {Boolean(logo) ? (
          <div>
            <PhotoWrap
              onClick={() => {
                setValue("logo", "");
                ref.current.value = "";
              }}
            >
              <LazyLoadImage
                alt="image"
                src={getValues("logo")}
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
        ) : (
          <Label htmlFor="logo1">
            {t("upload_photo")} <PhotoLoadingIcon />
          </Label>
        )}
      </div>
      {errors.logo && <Message>{t("addinfologo")}</Message>}
    </div>
  );
};

export default Logo;
