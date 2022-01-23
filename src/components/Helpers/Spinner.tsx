import { CircularProgress } from "@material-ui/core";
import { COLORS } from "../../services/Types/enums";
import { Container } from "./style";

interface IProps {
  size?: number;
  color?: string;
}

const Spinner = ({ color = COLORS.purple, size = 40 }: IProps) => {
  return (
    <Container>
      <CircularProgress
        style={{ width: `${size}px`, height: `${size}px`, color: color }}
      />
    </Container>
  );
};

export default Spinner;
