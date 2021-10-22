export interface SProps {
  vertical: "top" | "bottom";
  horizontal: "center" | "right" | "left";
  open: boolean;
  message: string;
  error?: boolean;
  handleClose: () => void;
}

export interface StlyeProps {
  error?: boolean;
  success?: boolean;
}

export interface IDirections {
  direction: "down" | "left" | "right" | "up";
}
