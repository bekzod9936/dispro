import "react-lazy-load-image-component/src/effects/blur.css";
import { LazyImage } from "./styles";
import fallbackImg from "assets/icons/SideBar/logo.png";

interface IProps {
  alt: string;
  src: string;
  objectFit: "contain" | "cover" | "none" | "scale-down" | "fill";
}

const ImageLazyLoad = ({ alt = "", src, objectFit = "contain" }: IProps) => {
  return (
    <LazyImage
      onError={(e: any) => {
        e.target.onerror = null;
        e.target.src = fallbackImg;
      }}
      alt={alt}
      effect="blur"
      src={src}
      objectFit={objectFit}
    />
  );
};

export default ImageLazyLoad;
