import { useQuery } from "react-query";
import { fetchCategories } from "services/queries/InfoQuery";
import { useAppSelector } from "services/redux/hooks";
import { RootState } from "services/redux/store";
import { getDefaultCategories } from "../../utils/getValidDate";
export const useFetchCategories = async (
  setCategories: (arg: any) => void,
  currentCategories: number[]
) => {
  const companyCategories = useAppSelector(
    (state: RootState) => state.info.data?.categories
  );

  const _ = useQuery("fetchCategories", () => fetchCategories(), {
    refetchOnWindowFocus: false,
    retry: 0,
    onSuccess: (data: any) => {
      const arr = data.data.data.map((el: any) => ({
        id: el.id,
        value: el.code,
        label: el.name,
      }));
      const allowedCategories = arr.filter((el: any) =>
        companyCategories?.includes(el.id)
      );
      const defaults = getDefaultCategories(arr, currentCategories);

      setCategories({
        defaults,
        categories: allowedCategories,
      });
    },
  });
};
