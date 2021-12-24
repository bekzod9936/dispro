import React from 'react';
import Modal from 'components/Custom/Modal';
import iphone from 'assets/images/iphone.png';
import ReactCrop from 'react-image-crop';
import Button from 'components/Custom/Buttons/Button';
import {
  CancelIcon,
  CloseIcon,
} from 'assets/icons/ClientsPageIcons/ClientIcons';
import { SaveIconMobile } from 'assets/icons/news/newsIcons';
import { SaveIcon } from 'assets/icons/InfoPageIcons/InfoPageIcons';
import 'react-image-crop/dist/ReactCrop.css';
import {
  Header,
  Left,
  PreviewBgNews,
  PreviewBg,
  PreviewContent,
  PreviewDiv,
  PreviewDivNews,
  LeftRound,
  Right,
  Wrapper,
  ErrorMessage,
} from './style';
import { useAppSelector } from 'services/redux/hooks';
import { RootState } from 'services/redux/store';
import { useTranslation } from 'react-i18next';
import useWindowWidth from 'services/hooks/useWindowWidth';
import { MobileUploadPhotoIcon } from 'assets/icons/proposals/ProposalsIcons';
interface IProps {
  open: boolean;
  src?: any;
  setIsCropVisible?: any;
  setFile?: any;
  handleUpload?: any;
  setIsLoading?: (arg: boolean) => void;
  isCoupon?: boolean;
  coupon?: boolean;
}
const CropCustomModal = ({
  open,
  src,
  setIsCropVisible,
  setFile,
  handleUpload,
  isCoupon,
  setIsLoading,
  coupon,
}: IProps) => {
  const { logo, name } = useAppSelector(
    (state: RootState) => state.partner.companyInfo
  );
  const [srcUrl, setSrcUrl] = React.useState<any>(null);
  const [image, setImage] = React.useState<any>(null);
  const [imageUrl, setImageUrl] = React.useState<any>(null);
  const { t } = useTranslation();
  const { width } = useWindowWidth();
  const [crop, setCrop] = React.useState<any>({
    unit: '%',
    width: 40,
    aspect: 16 / 9,
  });

  React.useEffect(() => {
    setSrcUrl(URL.createObjectURL(src));
  }, [src]);

  const handleClose = () => {
    setIsCropVisible(false);
    setFile(null);
    setImage(null);
    setSrcUrl(null);
  };

  const handleSave = async () => {
    if (imageUrl) {
      if (setIsLoading) {
        setIsLoading(true);
      }
      setIsCropVisible(false);
      console.log(imageUrl);

      await handleUpload(imageUrl);
      if (setIsLoading) {
        setIsLoading(false);
      }
    }
  };

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
      let base64 = canvas.toDataURL('image/png', 'high');
      setImageUrl(base64);
    }
  };
  console.log(imageUrl);

  return (
    <Modal open={open} scroll={'body'}>
      <Wrapper>
        <div style={{ marginBottom: '10px' }}>
          <Header>
            <h4>Выберите нужную область</h4>
            <CloseIcon onClick={handleClose} />
          </Header>
          <div style={{ display: 'flex' }}>
            <Right>
              <div className='cropBlock'>
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
            {coupon ? (
              <Left>
                <h4>Превью купона в приложении</h4>
                <PreviewDiv>
                  {imageUrl?.length > 6 && <PreviewBg src={imageUrl} alt='' />}
                  <img
                    src={iphone}
                    style={{ zIndex: 20, position: 'relative' }}
                    width='300'
                    // height="400"
                    alt=''
                  />
                  <PreviewContent>
                    <img src={logo} alt='logo' />
                    <p>{name}</p>
                    {isCoupon && (
                      <span>{isCoupon ? t('coupon') : t('certificate')}</span>
                    )}
                  </PreviewContent>
                </PreviewDiv>
              </Left>
            ) : (
              <LeftRound>
                <h4>Превью новости в приложении</h4>
                <PreviewDivNews>
                  {imageUrl?.length > 6 && (
                    <PreviewBgNews src={imageUrl} alt='' />
                  )}
                  {/* : <PreviewBgNews src={srcUrl} alt="" /> */}
                  <img
                    style={{ zIndex: 20, position: 'relative' }}
                    width='320'
                    height='180'
                    alt=''
                  />
                </PreviewDivNews>

                <h5>Название новости</h5>
                <p>
                  Таким образом новая модель <br />
                  организационной деятельности
                </p>
              </LeftRound>
            )}
          </div>
        </div>
        {imageUrl?.length < 8 && (
          <ErrorMessage>
            <p>Выберите область картинки</p>
          </ErrorMessage>
        )}
        {coupon ? (
          <div>
            <Button
              onClick={handleClose}
              startIcon={width > 329 && <CancelIcon />}
              margin={{ laptop: '0 25px 0 0', mobile: '0 8px 0 0' }}
              buttonStyle={{
                bgcolor: '#FFFFFF',
                color: '#223367',
                weight: '500',
              }}
            >
              Отмена
            </Button>
            <Button
              disabled={imageUrl?.length < 8}
              onClick={handleSave}
              startIcon={
                width > 1000 ? <SaveIcon /> : <MobileUploadPhotoIcon />
              }
            >
              Сохранить
            </Button>
          </div>
        ) : width > 600 ? (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              onClick={handleClose}
              endIcon={width > 329 && <CancelIcon />}
              margin={{ laptop: '0 25px 0 50px', mobile: '0 8px 0 0' }}
              buttonStyle={{
                bgcolor: 'rgba(96, 110, 234, 0.1)',
                color: '#606EEA',
                weight: '500',
              }}
            >
              Отмена
            </Button>
            <Button
              disabled={imageUrl?.length < 8}
              onClick={handleSave}
              endIcon={width > 1000 ? <SaveIcon /> : <MobileUploadPhotoIcon />}
            >
              Сохранить
            </Button>
          </div>
        ) : (
          <div
            style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
          >
            <Button
              onClick={handleClose}
              endIcon={width > 329 && <CancelIcon />}
              margin={{ laptop: '0 25px 0 50px', mobile: '0 8px 0 0' }}
              buttonStyle={{
                bgcolor: 'rgba(96, 110, 234, 0.1)',
                color: '#606EEA',
                weight: '500',
              }}
            >
              Отмена
            </Button>
            <Button
              disabled={imageUrl?.length < 8}
              onClick={handleSave}
              endIcon={width > 1000 ? <SaveIcon /> : <MobileUploadPhotoIcon />}
            >
              Сохранить
            </Button>
          </div>
        )}
      </Wrapper>
    </Modal>
  );
};
export default CropCustomModal;
