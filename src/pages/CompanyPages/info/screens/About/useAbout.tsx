import { useState } from 'react';
import Resizer from 'react-image-file-resizer';
import { useMutation, useQuery } from 'react-query';
import partnerApi from 'services/interceptors/companyInterceptor';
import {
  deletePhoto,
  fetchCategories,
  uploadPhoto,
} from 'services/queries/InfoQueries';

interface Props {
  value?: number;
  label?: string;
}

const useAbout = () => {
  const [category, setCategory] = useState<Props[]>([]);
  const [upload, setUpload] = useState<string>();
  const resCategory = useQuery('categories123', fetchCategories, {
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    retry: 0,
    onSuccess: (data1) => {
      setCategory(
        data1.data.data.map((v: any) => {
          return { value: v.id, label: v.name };
        })
      );
    },
  });

  const dataURIToBlob = (dataURI: any) => {
    const splitDataURI = dataURI.split(',');
    const byteString =
      splitDataURI[0].indexOf('base64') >= 0
        ? atob(splitDataURI[1])
        : decodeURI(splitDataURI[1]);
    const mimeString = splitDataURI[0].split(':')[1].split(';')[0];

    const ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++)
      ia[i] = byteString.charCodeAt(i);

    return new Blob([ia], { type: mimeString });
  };

  const resizeFile = (file: any) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        400,
        400,
        'png',
        100,
        0,
        (uri: any) => {
          resolve(uri);
        },
        'base64',
        400,
        400
      );
    });

  const resUpLoad = useMutation((v: any) => uploadPhoto({ body: v }), {
    retry: 1,
  });

  const handleUpload = async (e: any) => {
    const file = e.target.files[0];
    const image = await resizeFile(file);
    const newFile = await dataURIToBlob(image);
    const formData = new FormData();
    await formData.append('itemId', `${localStorage.getItem('companyId')}`);
    await formData.append('fileType', 'companyLogo');
    await formData.append('file', newFile, 'logo.png');
    await resUpLoad.mutate(formData, {
      onSuccess: (data) => {
        setUpload(data?.data?.data?.link);
      },
      onError: (error) => console.log(error),
    });
  };

  const resDelete = useMutation(() => {
    setUpload('');
    resUpLoad.reset();
    return deletePhoto({ body: '' });
  });

  const handlePhotoDelete = () => {
    resDelete.mutate();
  };

  const resinfoSubData = useMutation((v: any) => {
    return partnerApi.put('/directory/company', v, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('companyToken')}`,
      },
    });
  });
  return {
    resCategory,
    resDelete,
    resUpLoad,
    resinfoSubData,
    category,
    handleUpload,
    upload,
    handlePhotoDelete,
  };
};

export default useAbout;