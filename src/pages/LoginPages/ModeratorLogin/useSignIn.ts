import { useMutation } from "react-query";
import { useHistory } from "react-router";
import { MODERATOR } from "services/interceptors/moderator_interceptor/types";
import { loginModerator } from "services/queries/authQuery";
import { IForm } from "./types";

const useSignIn = () => {
  const history = useHistory();
  const logIn = useMutation(
    (data: IForm) =>
      loginModerator({
        ...data,
        roleId: data.roleId.value,
        telNumber: "+998" + data.telNumber,
      }),
    {
      onSuccess: async (data) => {
        console.log(data.data, "data moderator");
        const mData = data.data.data;

        await localStorage.setItem(MODERATOR.ACCESS_TOKEN, mData.accessToken);
        await localStorage.setItem(MODERATOR.REFRESH_TOKEN, mData.refreshToken);
        await history.push("/admin/companies");
      },
    }
  );

  return {
    logIn,
  };
};

export default useSignIn;
