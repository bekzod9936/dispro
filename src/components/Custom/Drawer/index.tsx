import { IProps } from "./type";
import { MainContent, MainDrawer } from "./style";

const Drawer = ({ open, children, anchor, onClose, onOpen }: IProps) => {
  return (
    <MainDrawer
      onClose={onClose}
      PaperProps={{ style: { position: "absolute" } }}
      BackdropProps={{ style: { position: "absolute" } }}
      ModalProps={{
        container: document.getElementById("drawer-container"),
        style: { position: "absolute" },
      }}
      elevation={1}
      SlideProps={{
        onExiting: (node) => {
          node.style.webkitTransform = "scaleX(0)";
          node.style.transform = "scaleX(0)";
          node.style.transformOrigin = "top left ";
        },
      }}
      onOpen={onOpen}
      anchor={anchor}
      open={open}
    >
      <MainContent>{children}</MainContent>
    </MainDrawer>
  );
};

export default Drawer;
