import { IProps } from "./types";
import { ManagerDiv } from "./style";

const CreateManager = ({ openManager }: IProps) => {
  console.log(openManager, "open Managers");
  return <ManagerDiv>Open managers</ManagerDiv>;
};

export default CreateManager;
