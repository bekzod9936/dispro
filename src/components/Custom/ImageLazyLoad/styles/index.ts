import styled from "styled-components";
import { LazyLoadImage } from "react-lazy-load-image-component";

export const LazyImage = styled(LazyLoadImage)`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;
