import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import Button from '../../../../components/Custom/Button';
import { useAppSelector } from '../../../../services/redux/hooks';
import {
  Container,
  Text,
  SaveIcon,
  Label,
  PhotoIcon,
  WrapImage,
  TrashIcon,
  WrapTrash,
  WrapImages,
  ImgNo,
  WrapNoPhoto,
  LabelNoPhoto,
  Wrpaper,
} from './style';
import { uploadPhoto } from 'services/queries/InfoQueries';
import NoPhoto from 'assets/images/NoPhotos.png';
import ImageLazyLoad from 'components/Custom/ImageLazyLoad/ImageLazyLoad';
import partnerApi from 'services/interceptors/companyInterceptor';
import Spinner from 'components/Custom/Spinner';

const Photos = () => {
  const { t } = useTranslation();

  const companyId: any = localStorage.getItem('companyId');
  const companyInfo = useAppSelector((state) => state.partner.companyInfo);
  const [images, setImages] = useState(companyInfo.images);
  const count = 10 - images.length;

  const formData = new FormData();

  const photoUploading = useMutation((v: any) => uploadPhoto({ body: v }));

  const handleUpload = async (e: any) => {
    await formData.append('itemId', companyId);
    await formData.append('fileType', 'companyImage');
    await formData.append('file', e.target.files[0]);
    await photoUploading.mutate(formData, {
      onSuccess: (data) => setImages([...images, data.data.data.link]),
    });
  };

  const handleDelete = (v: any) => {
    const newImgs = images.filter((i: any) => i !== v);
    console.log(newImgs);
    setImages(newImgs);
  };

  const subImg = useMutation((v: any) => {
    return partnerApi.put('/directory/company/images', {
      images: v,
    });
  });

  const handleSubmit = () => {
    subImg.mutate(images);
  };

  return (
    <Container>
      <input
        accept='image/*'
        style={{ display: 'none' }}
        id='photosloading'
        type='file'
        multiple
        onChange={handleUpload}
      />
      {images.length === 0 ? (
        <WrapNoPhoto>
          <ImgNo src={NoPhoto} alt='nophoto' />
          <Text maxwidth='500px' align='center'>
            {t('infouploadphotos1')}
            <span>
              <span>{count}</span>
              {t('photo1')}
            </span>
            {t('infouploadphotos2')}
          </Text>
          <LabelNoPhoto htmlFor='photosloading'>
            <span>{t('upload_photo')}</span>
            <PhotoIcon />
          </LabelNoPhoto>
        </WrapNoPhoto>
      ) : (
        <>
          <Text maxwidth='800px'>
            {t('infouploadphotos1')}
            <span>
              <span>{count}</span>
              {t('photo1')}
            </span>
            {t('infouploadphotos2')}
          </Text>
          <Text maxwidth='800px'>{t('dragdropphoto')}</Text>
          {subImg.isLoading ? (
            <Spinner />
          ) : (
            <Wrpaper>
              {subImg.isLoading ? (
                <Spinner />
              ) : (
                <WrapImages>
                  {images.map((v, index: number) => (
                    <WrapImage key={index} onClick={() => handleDelete(v)}>
                      <ImageLazyLoad objectFit='cover' src={v} alt='image' />
                      <WrapTrash>
                        <TrashIcon />
                      </WrapTrash>
                    </WrapImage>
                  ))}
                  {images.length < 10 ? (
                    <>
                      <Label htmlFor='photosloading'>
                        <PhotoIcon />
                        <span>{t('addMark')}</span>
                      </Label>
                    </>
                  ) : null}
                </WrapImages>
              )}
              <Button
                buttonStyle={{
                  shadow: '0px 4px 9px rgba(96, 110, 234, 0.46)',
                  weight: 500,
                }}
                margin={{
                  laptop: '20px 0 20px 0',
                }}
                onClick={handleSubmit}
              >
                <SaveIcon />
                {t('save')}
              </Button>
            </Wrpaper>
          )}
        </>
      )}
    </Container>
  );
};

export default Photos;
