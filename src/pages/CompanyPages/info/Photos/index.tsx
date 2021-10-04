import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import Button from '../../../../components/Custom/NButton';
import { useAppSelector } from '../../../../services/redux/hooks';
import {
  Container,
  Text,
  SaveIcon,
  Img,
  Label,
  PhotoIcon,
  WrapImage,
  TrashIcon,
  WrapTrash,
  WrapImages,
  ImgNo,
  WrapNoPhoto,
  LabelNoPhoto,
} from './style';
import { uploadPhoto } from '../../../../services/queries/InfoQueries';
import NoPhoto from '../../../../assets/images/NoPhotos.png';

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
          <WrapImages>
            {images.map((v) => (
              <WrapImage>
                <Img src={v} alt='images' />
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
          <Button
            buttonStyle={{
              shadow: '0px 4px 9px rgba(96, 110, 234, 0.46)',
              weight: 500,
            }}
            margin={{
              laptop: '20px 0 20px 0',
            }}
          >
            <SaveIcon />
            {t('save')}
          </Button>
        </>
      )}
    </Container>
  );
};

export default Photos;
