import { useRef } from "react";

//packages
import { useTranslation } from "react-i18next";

//components
import Spinner from "components/Helpers/Spinner";

//style
import { Button, PhotoIcon } from "./style";

//other
import { filesToBlob } from "../../helpers";

interface UploadButtonProps {
  imagesLength: number;
  handleUpload: (arg: FormData[]) => void;
  isLoading: boolean;
}

export const UploadButton: React.FC<UploadButtonProps> = ({
  imagesLength,
  handleUpload,
  isLoading,
}) => {
  const { t } = useTranslation();
  const imagesLimit = 5 - imagesLength;
  const inputRef = useRef<null | HTMLInputElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let files = event.target.files;

    let arrayOfFiles: File[] = Array.from(files || []);

    if (imagesLimit <= 0) {
      return;
    }

    if (files && files.length > imagesLimit) {
      arrayOfFiles = arrayOfFiles.slice(0, imagesLimit);
    }

    handleUpload(filesToBlob(arrayOfFiles));
  };

  const handleClearInput = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <>
      <Button
        isLoading={isLoading}
        onClick={handleClearInput}
        htmlFor="uploadFile"
      >
        {isLoading ? (
          <Spinner size={20} />
        ) : (
          <>
            <span>{t("uploadPhoto")}</span>
            <PhotoIcon />
          </>
        )}
      </Button>
      <input
        disabled={isLoading}
        ref={inputRef}
        multiple
        style={{ display: "none" }}
        id="uploadFile"
        type="file"
        accept="image/*"
        onChange={handleChange}
      />
    </>
  );
};
