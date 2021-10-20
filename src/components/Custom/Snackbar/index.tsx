import Snackbar from "@material-ui/core/Snackbar";
import Slide from "@material-ui/core/Slide";
import { SProps } from "./types";
import { AlertDiv, IconDiv } from "./style";
import { ReactComponent as Remove } from "assets/icons/exit_mini.svg";
import RippleEffect from "../RippleEffect";
import { Text } from "./style";

function TransitionDown(props: any) {
  return <Slide {...props} direction="down" />;
}

const NotifySnack = (props: SProps) => {
  const { vertical, horizontal, open, message, handleClose } = props;
  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      autoHideDuration={5000}
      open={open}
      TransitionComponent={TransitionDown}
      onClose={handleClose}
    >
      <AlertDiv>
        <Text color="white">{message}</Text>
      </AlertDiv>
    </Snackbar>
  );
};

export default NotifySnack;
