import React from "react";
import { useMutation } from "react-query";
import { deletePhoto, uploadPhoto } from "services/queries/InfoQuery";

export const useUploadImage = (handleSet: any) => {
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

  // const resizeFile = (file: any) =>
  //   new Promise((resolve) => {
  //     Resizer.imageFileResizer(
  //       file,
  //       400,
  //       400,
  //       'png',
  //       100,
  //       0,
  //       (uri: any) => {
  //         resolve(uri);
  //       },
  //       'base64',
  //       400,
  //       400
  //     );
  //   });

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
    await formData.set("itemId", `${localStorage.getItem("companyId")}`);
    await formData.set("fileType", "companyLogo");
    await formData.append("file", newFile, "logo.png");
    await mutate(formData, {
      onSuccess: async (data) => {
        await handleSet(data?.data?.data?.link);
        setLoading(false);
      },
      onError: (error) => console.log(error),
    });
  };

  return { handleUpload, deleteImage, loading, setLoading, isLoading };
};
