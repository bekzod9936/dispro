import React from "react";
import { useMutation } from "react-query";

//helpers
import { deletePhoto, uploadPhoto } from "services/queries/InfoQuery";

export const useUploadImage = (handleSet: any, setImageError?: any) => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const dataURIToBlob = (dataURI: any) => {
    const splitDataURI = dataURI.split(",");
    const byteString =
      splitDataURI[0].indexOf("base64") >= 0
        ? atob(splitDataURI[1])
        : decodeURI(splitDataURI[1]);
    const mimeString = splitDataURI[0].split(":")[1].split(";")[0];

    const ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++)
      ia[i] = byteString.charCodeAt(i);

    return new Blob([ia], { type: mimeString });
  };

  const { mutate, isLoading } = useMutation(
    (v: any) => uploadPhoto({ body: v }),
    {
      retry: 1,
    }
  );

  const deleteImage = (link: string) => {
    return deletePhoto({ body: link });
  };

  const handleUpload = async (e: string) => {
    setLoading(true);
    const file = e;
    // const image: any = await resizeFile(file);
    const newFile = await dataURIToBlob(file);
    const formData = new FormData();
    await formData.append("itemId", `${sessionStorage.getItem("companyId")}`);
    await formData.append("fileType", "companyLogo");
    await formData.append("file", newFile, "logo.png");
    await mutate(formData, {
      onSuccess: async (data) => {
        await handleSet(data?.data?.data?.link);
        setImageError(false);
        setLoading(false);
      },
      onError: (error) => console.log(error),
    });
  };

  return { handleUpload, deleteImage, loading, setLoading, isLoading };
};
