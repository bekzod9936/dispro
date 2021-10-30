import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import Button from 'components/Custom/Button';
import { useAppSelector } from 'services/redux/hooks';
import { uploadPhoto } from 'services/queries/InfoQueries';
import NoPhoto from 'assets/images/NoPhotos.png';
import ImageLazyLoad from 'components/Custom/ImageLazyLoad/ImageLazyLoad';
import partnerApi from 'services/interceptors/companyInterceptor';
import Spinner from 'components/Custom/Spinner';
import { ruCount } from 'services/utils/index';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
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

const reorder = (list: any, startIndex: any, endIndex: any) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

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
  if (photoUploading.isLoading) {
    return <Spinner />;
  }
  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }
    const items = reorder(
      images,
      result.source.index,
      result.destination.index
    );

    setImages(items);
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
              <span> {count} </span>
              {ruCount(images.length, 'фотографию', 'фотографии', 'фотографий')}
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
          {images.length < 10 ? (
            <>
              <Text maxwidth='800px'>
                {t('infouploadphotos1')}

                <span>
                  <span> {count} </span>
                  {ruCount(1, 'фотографию', 'фотографии', 'фотографий')}
                </span>
                {t('infouploadphotos2')}
              </Text>
              <Text maxwidth='800px'>{t('dragdropphoto')}</Text>
            </>
          ) : null}

          {subImg.isLoading ? (
            <Spinner />
          ) : (
            <Wrpaper>
              {subImg.isLoading ? (
                <Spinner />
              ) : (
                <>
                  <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId='droppable' direction='horizontal'>
                      {(provided) => (
                        <WrapImages
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          style={{
                            overflow: 'hidden',
                          }}
                        >
                          {images.map((v, index: number) => (
                            <Draggable key={v} draggableId={v} index={index}>
                              {(provided) => (
                                <WrapImage
                                  key={index}
                                  onClick={() => handleDelete(v)}
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <ImageLazyLoad
                                    objectFit='cover'
                                    src={v}
                                    alt='image'
                                  />
                                  <WrapTrash>
                                    <TrashIcon />
                                  </WrapTrash>
                                </WrapImage>
                              )}
                            </Draggable>
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
                    </Droppable>
                  </DragDropContext>
                </>
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
                disabled={subImg.isLoading}
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
