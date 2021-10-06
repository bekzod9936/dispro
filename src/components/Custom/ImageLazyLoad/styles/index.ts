import styled from "styled-components";
import { LazyLoadImage } from "react-lazy-load-image-component";

export interface IProps {
  objectFit: "cover" | "contain" | "none" | "scale-down" | "fill";
}

export const LazyImage = styled(LazyLoadImage)`
  width: 100%;
  height: 100%;
  object-fit: ${({ objectFit = "contain" }: IProps) => objectFit} !important;
`;
