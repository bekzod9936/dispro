import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import CustomModal from "./CustomModal";
import { FONT_SIZE, FONT_WEIGHT } from "../../services/Types/enums";
import { Flex } from "../../styles/BuildingBlocks";
import { ModalComponent } from "../../styles/CustomStyles";
import { Text } from "../../styles/CustomStyles";
import ReactCrop from "react-image-crop";
import { SaveIcon } from "../../assets/icons/InfoPageIcons/InfoPageIcons";
import "react-image-crop/dist/ReactCrop.css";
// import NewsCard from '../../pages/CompanyPages/news/NewsCard';
import cropbackground from "assets/images/CropRename.png";
import axios from "axios";
import { STORAGE_URL } from "../../services/constants/config";
import { CancelIcon } from "assets/icons/ClientsPageIcons/ClientIcons";
import styled from "styled-components";
import Button from "components/Custom/Button";
interface IProps {
  isCropModalVisible: boolean;
  src: any;
  setOuterLink?: any;
  setIsCropModalVisible: Dispatch<SetStateAction<boolean>>;
  label?: string;
  mutation?: any;
}

const CropImageModal: React.FC<IProps> = ({
  isCropModalVisible,
  src,
  setOuterLink,
  setIsCropModalVisible,
  label,
  mutation,
}) => {
  const [image, setImage] = useState<any>(null);
  const [imageUrl, setImageUrl] = useState<any>(null);
  let companyToken = localStorage.getItem("companyToken");
  const [srcUrl, setSrcUrl] = useState<any>(null);

  const [crop, setCrop] = useState<any>({
    unit: "%",
    width: 30,
    aspect: 16 / 9,
  });

  useEffect(() => {
    setSrcUrl(URL.createObjectURL(src));
  }, [src]);

  const handleSave = async (e: any) => {
    e.preventDefault();

    if (imageUrl) {
      console.log(imageUrl);

      fetch(imageUrl)
        .then((res: any) => res.blob())
        .then(
          (blob) => new File([blob], "news_image.png", { type: "image/png" })
        )
        .then(async (file) => {
          let formData = new FormData();
          formData.append("file", file);
          try {
            console.log(formData);

            let response = await axios.post(
              `${STORAGE_URL}/news/upload`,
              formData,
              {
                headers: {
                  authorization: "Bearer " + companyToken,
                  langId: 1,
                },
              }
            );
            setIsCropModalVisible(false);
            setOuterLink(response.data.data.link);
            URL.revokeObjectURL(imageUrl);
          } catch (err) {}
        });
    }

    // try {
    //     let response = await axios.post(`${STORAGE_URL}/news/upload`, formData, {
    //         headers: {
    //             "authorization": "Bearer " + companyToken,
    //             langId: 1
    //         }
    //     })

    //     //     setOuterLink(response.data.data.link);
    // } catch (err) {

    // }
  };

  const getCroppedImage = async (type: string) => {
    if (image) {
      const canvas = document.createElement("canvas");
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;
      canvas.width = crop.width;
      canvas.height = crop.height;
      const ctx = canvas.getContext("2d");

      const pixelRatio = window.devicePixelRatio;
      canvas.width = crop.width * pixelRatio;
      canvas.height = crop.height * pixelRatio;
      ctx?.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      if (ctx) {
        ctx.imageSmoothingQuality = "high";
      }

      ctx?.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height
      );

      if (type === "complete") {
        let base64 = canvas.toDataURL("image/png", "high");
        setImageUrl(base64);
      }
    }
  };

  return (
    <CustomModal open={isCropModalVisible}>
      <ModalComponent>
        <div>
          <div style={{ marginTop: "10px", marginBottom: "10px" }}>
            <Text fontSize={FONT_SIZE.large} fontWeight={FONT_WEIGHT.bold}>
              Выберите нужную область
              {/* <input type="file" onChange={(e: any) => setFile()} /> */}
            </Text>
          </div>
          <Flex
            margin="0px"
            justifyContent="start"
            alignItems="flex-start"
            height="100%"
          >
            <div
              style={{
                width: "550px",
                height: "375px",
                objectFit: "contain",
                background: `url(${cropbackground})`,
                borderRadius: "14px",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div style={{ width: "400px", height: "auto" }}>
                {src && (
                  <ReactCrop
                    src={srcUrl}
                    crop={crop}
                    onImageLoaded={setImage}
                    onComplete={() => getCroppedImage("complete")}
                    onChange={setCrop}
                  />
                )}
              </div>
            </div>
            {imageUrl && (
              <div style={{ height: "100%", marginLeft: "20px" }}>
                <p>{label}</p>
                <Preview>
                  <Image src={imageUrl} />
                </Preview>
              </div>
            )}
          </Flex>
        </div>
        <div style={{ marginTop: "20px", display: "flex" }}>
          <Button
            buttonStyle={{ bgcolor: "#ffffff", color: "#223367" }}
            onClick={() => setIsCropModalVisible(false)}
            startIcon={<CancelIcon />}
          >
            Отмена
          </Button>
          <Button
            startIcon={<SaveIcon />}
            onClick={(e) => {
              handleSave(e);
            }}
          >
            Сохранить
          </Button>
        </div>
      </ModalComponent>
    </CustomModal>
  );
};

export default CropImageModal;

const Preview = styled.div`
  position: relative;
  overflow: hidden;
`;

const Image = styled.img`
  position: absolute;
  left: 13px;
  right: 10px;
  width: 272px;
  top: 13px;
  height: 175px;
  border-radius: 30px 30px 0 0;
`;
