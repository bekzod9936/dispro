import { useFormContext } from "react-hook-form";
import Logo from "../Logo";

const LeftSide = () => {
  const { getValues } = useFormContext();

  return (
    <div>
      <Logo />
    </div>
  );
};

export default LeftSide;
