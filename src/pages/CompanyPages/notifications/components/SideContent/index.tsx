import FullModal from "components/Custom/FullModal";
import { useEffect, useRef } from "react";
import useWindowWidth from "services/hooks/useWindowWidth";
import SideDraw from "../SideDraw";
import { SideDrawer } from "./style";

interface Props {
  onClick: () => void;
  value: any;
  open: boolean;
  dispatchReducer: any;
}

const SideContent = ({ onClick, value, open, dispatchReducer }: Props) => {
  const { width } = useWindowWidth();
  const ref: any = useRef(null);

  const handleClickOutside = (event: any) => {
    if (ref.current && !ref.current.contains(event.target)) {
      dispatchReducer({ type: "setOpen", payload: false });
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  if (width > 1000) {
    return (
      <SideDrawer ref={ref} open={open}>
        <SideDraw onClick={onClick} value={value} />
      </SideDrawer>
    );
  } else {
    return (
      <FullModal open={open}>
        <SideDraw onClick={onClick} value={value} />
      </FullModal>
    );
  }
};

export default SideContent;
