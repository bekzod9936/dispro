import { useQuery, useMutation } from "react-query";
import { useAppDispatch } from "services/redux/hooks";
import { setSecurty } from "services/redux/Slices/setting";
import { notifySuccess } from "services/utils/local_notification";
import { useTranslation } from "react-i18next";
import {
  fetchSecurity,
  postSecurity,
} from "services/queries/newSettingQueries";
import { IForm } from "./security.schema";

const useSecurty = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const response = useQuery("securtyFetch", fetchSecurity, {
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    retry: 0,
    onSuccess: (data) => {
      dispatch(setSecurty(data.data.data));
    },
  });

  const putSecurity = useMutation(
    (data) => {
      return postSecurity(data);
    },
    {
      onSuccess: () => {
        response.refetch();
        notifySuccess(t("saved"));
      },
    }
  );

  const handleSave = (e: IForm) => {
    const values: any = {
      isEnabledPaySumLimit: e.data?.isEnabledPaySumLimit ?? false,
      isEnabledPurchaseLimit: e.enablepurchase ?? false,
      safeties: {
        daily_purchase_limit: e.enablepurchase ? e.limit : "",
        pay_sum_limit: e.data?.pay_sum_limit ?? "",
      },
    };
    putSecurity.mutate(values);
  };

  return { response, putSecurity, handleSave };
};

export default useSecurty;
