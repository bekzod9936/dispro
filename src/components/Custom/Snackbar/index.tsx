import Snackbar from "@material-ui/core/Snackbar";
import Slide from "@material-ui/core/Slide";
import { SProps, IDirections } from "./types";
import { AlertDiv } from "./style";
import { Text } from "./style";

function TransitionDown(props: any) {
  return <Slide {...props} direction="down" />;
}

function TransitionLeft(props: any) {
  return <Slide {...props} direction="left" />;
}

const NotifySnack = (props: SProps) => {
  const { vertical, horizontal, open, message, handleClose, error } = props;
  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      autoHideDuration={5000}
      open={open}
      TransitionComponent={!error ? TransitionDown : TransitionLeft}
      onClose={handleClose}
    >
      <AlertDiv error={error}>
        <Text error={error}>{message}</Text>
      </AlertDiv>
    </Snackbar>
  );
};

export default NotifySnack;
