export interface SProps {
  vertical: "top" | "bottom";
  horizontal: "center" | "right" | "left";
  open: boolean;
  message: string;
  //   severity: "success" | "error" | "warning" | "info";
  handleClose: () => void;
}
