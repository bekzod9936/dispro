import { useState } from "react";
import { useMutation } from "react-query";
import { useAppSelector } from "services/redux/hooks";
import { uploadPhoto } from "services/queries/InfoQuery";
import partnerApi from "services/interceptors/partner_interceptor";

const usePhotos = () => {
  const companyId: any = localStorage.getItem("companyId");
  const companyInfo = useAppSelector((state) => state.partner.companyInfo);
  const [images, setImages] = useState(companyInfo.images);

  const count = 10 - images.length;

  const resUploading = useMutation((v: any) => uploadPhoto({ body: v }), {
    onSuccess: (data) => {
      setImages((oldImg) => [...oldImg, data.data.data.link]);
    },
  });

  const handleUpload = (e: any) => {
    if (e.target.files.length < count) {
      for (let i = 0; i < e.target.files.length; i++) {
        const formData = new FormData();
        formData.append("itemId", companyId);
        formData.append("fileType", "companyImage");
        formData.append("file", e.target.files[i]);
        resUploading.mutate(formData);
      }
    } else if (e.target.files.length >= count) {
      for (let i = 0; i < count; i++) {
        const formData = new FormData();
        formData.append("itemId", companyId);
        formData.append("fileType", "companyImage");
        formData.append("file", e.target.files[i]);
        resUploading.mutate(formData);
      }
    }
  };

  const submitImg = useMutation((v: any) => {
    return partnerApi.put("/directory/company/images", {
      images: v,
    });
  });

  const handleSubmit = () => {
    submitImg.mutate(images);
  };
  return {
    resUploading,
    images,
    setImages,
    handleUpload,
    count,
    submitImg,
    handleSubmit,
  };
};

export default usePhotos;
