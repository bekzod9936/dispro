import { useQuery } from "react-query";
import { fetchCategories } from "services/queries/InfoQuery";

const useNewAbout = () => {
  const resCategory = useQuery("categoriesFetch", fetchCategories, {
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    retry: 0,
    select: (data) => {
      return data.data.data.map((v: any) => {
        return { value: v.id, label: v.name };
      });
    },
  });

  return { resCategory };
};

export default useNewAbout;
