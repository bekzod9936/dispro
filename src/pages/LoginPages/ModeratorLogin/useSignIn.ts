import { useEffect } from "react";
import { useMutation } from "react-query";
import { MODERATOR } from "services/interceptors/moderator_interceptor/types";
import { loginModerator } from "services/queries/authQuery";
import { IForm } from "./types";

const useSignIn = (history: any) => {
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

        localStorage.setItem(MODERATOR.ACCESS_TOKEN, mData.accessToken);
        localStorage.setItem(MODERATOR.REFRESH_TOKEN, mData.refreshToken);
      },
    }
  );

  useEffect(() => {
    if (logIn.isSuccess) {
      history.push("/admin/companies");
    }
  }, [logIn.isSuccess]);

  return {
    logIn,
  };
};

export default useSignIn;
