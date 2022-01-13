import { useQuery } from "react-query";
import { fetchCategories } from "services/queries/InfoQuery";
import { FIcon, IIcon, TIcon, TWIcon, VKIcon, WTIcon, VIcon } from "./style";

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

  const defSocial = [
    {
      Icon: FIcon,
      name: "Facebook",
      value: "",
    },
    {
      Icon: IIcon,
      name: "Instagram",
      value: "",
    },
    {
      Icon: TIcon,
      name: "Telegram",
      value: "",
    },
    {
      Icon: TWIcon,
      name: "Twitter",
      value: "",
    },
    {
      Icon: VKIcon,
      name: "Vkontakte",
      value: "",
    },
    {
      Icon: WTIcon,
      name: "WhatsApp",
      value: "",
    },
    {
      Icon: VIcon,
      name: "Viber",
      value: "",
    },
  ];

  return { resCategory, defSocial };
};

export default useNewAbout;
