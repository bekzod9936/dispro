import { useQuery } from "react-query";
import { fetchCategories } from "services/queries/InfoQuery";

const useLeft = () => {
  const resCategory = useQuery("categoriesFetch", fetchCategories, {
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    retry: 0,
    select: (data) => {
      return data.data.data.map(({ id, name }: any) => ({
        value: id,
        label: name,
      }));
    },
  });
  return { resCategory };
};

export default useLeft;
