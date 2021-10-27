import React from 'react'
import Modal from 'components/Custom/Modal'
import styled from 'styled-components'
import ReactCrop from 'react-image-crop';
import Button from 'components/Custom/Button'
import { CancelIcon, CloseIcon } from 'assets/icons/ClientsPageIcons/ClientIcons';
import { SaveIcon } from 'assets/icons/InfoPageIcons/InfoPageIcons';
import 'react-image-crop/dist/ReactCrop.css';
import { Bottom, Colka, Header, Left, Preview, PreviewBg, PreviewContent, PreviewDiv, Right, Wrapper } from './style';
import iphone from "assets/images/iphone.png"
import { useAppSelector } from 'services/redux/hooks';
import { RootState } from 'services/redux/store';
import { CouponIcon } from 'pages/CompanyPages/statistics/screens/Clients/style';
import { useTranslation } from 'react-i18next';
interface IProps {
    open: boolean,
    src?: any,
    setIsCropVisible?: any,
    setFile?: any,
    handleUpload?: any,
    setIsLoading?: (arg: boolean) => void,
    isCoupon: boolean
}
const CropCustomModal = ({ open, src, setIsCropVisible, setFile, handleUpload, isCoupon, setIsLoading }: IProps) => {
    const { logo, name } = useAppSelector((state: RootState) => state.partner.companyInfo)
    const [srcUrl, setSrcUrl] = React.useState<any>(null)
    const [image, setImage] = React.useState<any>(null)
    const [imageUrl, setImageUrl] = React.useState<any>(null)
    const { t } = useTranslation()
    const [crop, setCrop] = React.useState<any>({
        unit: '%',
        width: 30,
        aspect: 16 / 9,
    });

    React.useEffect(() => {
        setSrcUrl(URL.createObjectURL(src))
    }, [src])


    const handleClose = () => {
        setIsCropVisible(false)
        setFile(null)
    }

    const handleSave = async () => {
        if (imageUrl) {
            if (setIsLoading) {
                setIsLoading(true)
            }
            setIsCropVisible(false)
            await handleUpload(imageUrl)
            if (setIsLoading) {
                setIsLoading(false)
            }

        }
    }



    const getCroppedImage = () => {
        if (image) {
            const canvas = document.createElement('canvas');
            const scaleX = image.naturalWidth / image.width;
            const scaleY = image.naturalHeight / image.height;
            canvas.width = crop.width;
            canvas.height = crop.height;
            const ctx = canvas.getContext('2d');

            const pixelRatio = window.devicePixelRatio;
            canvas.width = crop.width * pixelRatio;
            canvas.height = crop.height * pixelRatio;
            ctx?.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
            if (ctx) {
                ctx.imageSmoothingQuality = 'high';
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
            let base64 = canvas.toDataURL("image/png", "high")
            setImageUrl(base64)
        }
    }

    return (
        <Modal open={open}>
            <Wrapper>
                <div style={{ marginBottom: "35px" }}>
                    <Header>
                        <h4>Выберите нужную область</h4>
                        <CloseIcon onClick={handleClose} />
                    </Header>
                    <div style={{ display: "flex" }}>
                        <Right>
                            <div style={{ width: "400px", height: "400px", objectFit: "contain", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <ReactCrop
                                    maxWidth={400}
                                    src={srcUrl}
                                    crop={crop}
                                    onChange={(e) => setCrop(e)}
                                    onImageLoaded={(e) => setImage(e)}
                                    onComplete={() => getCroppedImage()}
                                />
                            </div>
                        </Right>
                        <Left>
                            <h4>Превью купона в приложении</h4>
                            <PreviewDiv>
                                {imageUrl?.length > 6 && <PreviewBg src={imageUrl} alt="" />}
                                <img style={{ zIndex: 20, position: "relative" }} width="300" src={iphone} alt="" />
                                <PreviewContent>
                                    <img src={logo} alt="logo" />
                                    <p>{name}</p>
                                    <span>{isCoupon ? t("coupon") : t("certificate")}</span>

                                </PreviewContent>
                            </PreviewDiv>
                        </Left>
                    </div>
                </div>
                <div>
                    <Button
                        onClick={handleClose}
                        startIcon={<CancelIcon />}
                        margin={{ laptop: "0 25px 0 0" }}
                        buttonStyle={{ bgcolor: "#FFFFFF", color: "#223367", weight: "500" }}>
                        Отмена
                    </Button>
                    <Button
                        disabled={imageUrl?.length < 6}
                        onClick={handleSave}
                        startIcon={<SaveIcon />}>
                        Сохранить
                    </Button>
                </div>
            </Wrapper>
        </Modal>
    )
}
export default CropCustomModal

