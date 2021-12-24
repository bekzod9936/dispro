import Button from "components/Custom/Button";
import { DeleteIcon } from "./style";

interface Props {
  onClick?: () => void;
  text: string;
}

const DeleteButton = ({
  onClick = () => {},

  text,
}: Props) => {
  return (
    <Button
      buttonStyle={{
        bgcolor: "rgba(255, 94, 104, 1)",
        color: "#fff",
        shadow: "0px 3px 9px rgba(255, 94, 104, 1)",
      }}
      onClick={onClick}
      endIcon={<DeleteIcon />}
    >
      {text}
    </Button>
  );
};

export default DeleteButton;
