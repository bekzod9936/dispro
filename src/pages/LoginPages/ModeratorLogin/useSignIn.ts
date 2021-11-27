import { useMutation } from "react-query";
import { loginModerator } from "services/queries/authQuery";
import { IForm } from "./types";

const useSignIn = () => {
  const logIn = useMutation((data: IForm) => loginModerator(data));

  return {
    logIn,
  };
};

export default useSignIn;
