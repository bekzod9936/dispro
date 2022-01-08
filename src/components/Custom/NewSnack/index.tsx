import { SnackBar, Alert } from "./style";
import { AlertProps } from "@material-ui/lab/Alert";

interface Props {
  action?: any;
  anchorOrigin?: {
    vertical: "top" | "bottom";
    horizontal: "left" | "center" | "right";
  };
  autoHideDuration?: number;
  children?: any;
  ClickAwayListenerProps?: Object;
  ContentProps?: Object;
  disableWindowBlurListener?: boolean;
  key?: any;
  message?: any;
  onClose?: (e: any) => void;
  open?: boolean;
  resumeHideDuration?: number;
  TransitionComponent?: any;
  transitionDuration?:
    | number
    | { appear?: number; enter?: number; exit?: number };
  TransitionProps?: Object;
  variant?: "filled" | "outlined" | "standard";
  status?: "error" | "info" | "success" | "warning";
  iconMapping?: { error?: any; info?: any; success?: any; warning?: any };
  icon?: any;
  color?: "error" | "info" | "success" | "warning";
  closeText?: string;
  iconclose?: boolean;
}

const MAlert = (props: AlertProps) => <Alert {...props} />;

const Snackbar = ({
  onClose = () => {},
  iconclose = true,
  ...props
}: Props) => {
  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    onClose(false);
  };

  return (
    <SnackBar
      key={props.key}
      anchorOrigin={props.anchorOrigin}
      onClose={handleClose}
      open={props.open}
      autoHideDuration={props.autoHideDuration}
      ClickAwayListenerProps={props.ClickAwayListenerProps}
    >
      {iconclose ? (
        <MAlert
          variant={props.variant}
          onClose={handleClose}
          severity={props.status}
          iconMapping={props.iconMapping}
          icon={props.icon}
          color={props.color}
          closeText={props.closeText}
        >
          {props.message}
        </MAlert>
      ) : (
        <MAlert
          variant={props.variant}
          severity={props.status}
          iconMapping={props.iconMapping}
          icon={props.icon}
          color={props.color}
          closeText={props.closeText}
        >
          {props.message}
        </MAlert>
      )}
    </SnackBar>
  );
};

export default Snackbar;
