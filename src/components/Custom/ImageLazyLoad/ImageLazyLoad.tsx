import "react-lazy-load-image-component/src/effects/blur.css";
import { LazyImage } from "./styles";
import fallbackImg from "../../../assets/icons/SideBar/logo.png";

interface IProps {
  alt: string;
  src: string;
}

const ImageLazyLoad = ({ alt = "", src }: IProps) => {
  return (
    <LazyImage
      onError={(e: any) => {
        e.target.onerror = null;
        e.target.src = fallbackImg;
      }}
      alt={alt}
      effect="blur"
      src={src}
    />
  );
};

export default ImageLazyLoad;
