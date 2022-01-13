import { useFormContext } from "react-hook-form";

const RightSide = () => {
  const { getValues } = useFormContext();

  return <div>RightSide</div>;
};

export default RightSide;
