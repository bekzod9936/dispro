import { useCallback, UIEvent, useState } from "react";

interface IProps {
  initialHeight: number;
  nextHeight: number;
  scrollTop: number;
}
const useScroll = ({ initialHeight, scrollTop, nextHeight }: IProps) => {
  const [height, setHeight] = useState(initialHeight);
  const handleScroll = useCallback(
    (e: UIEvent<HTMLDivElement | HTMLFormElement>) => {
      if (e.currentTarget.scrollTop > scrollTop) {
        setHeight(nextHeight);
      } else {
        setHeight(initialHeight);
      }
    },
    []
  );

  return {
    height,
    handleScroll,
  };
};

export default useScroll;
