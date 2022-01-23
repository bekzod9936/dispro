import { lazy } from "react";
import { useTranslation } from "react-i18next";

const Active = lazy(() => import("../screens/Active"));
const Waiting = lazy(() => import("../screens/Waiting"));
const Archive = lazy(() => import("../screens/Archive"));
const CreateNews = lazy(() => import("../screens/CreateNews"));
const ShowNews = lazy(() => import("../screens/ShowNews"));
const RepairNews = lazy(() => import("../screens/RepairNews"));
const EditNews = lazy(() => import("../screens/EditNews"));
const ShowWaitingNews = lazy(
  () => import("../screens/Waiting/component/ShowWaitingNews")
);

interface INewsRow {
  path: string;
  text: string;
  component: any;
}

const useNewsRoute = () => {
  const { t } = useTranslation();
  const newsPath: INewsRow[] = [
    {
      path: "/news/waiting",
      text: t("in_pending"),
      component: Waiting,
    },
    {
      path: "/news/active",
      text: t("active_news"),
      component: Active,
    },
    {
      path: "/news/archive",
      text: t("news_archive"),
      component: Archive,
    },
  ];
  const menuItems: INewsRow[] = [
    {
      path: "/news/waiting",
      text: t("in_pending"),
      component: Waiting,
    },
    {
      path: "/news/active",
      text: t("active_news"),
      component: Active,
    },
    {
      path: "/news/archive",
      text: t("news_archive"),
      component: Archive,
    },
    {
      path: "/news/create",
      text: t("Cоздать новостии"),
      component: CreateNews,
    },
    {
      path: "/news/detail",
      text: t("seeFull"),
      component: ShowNews,
    },
    {
      path: "/news/showwaiting",
      text: t("seeFull"),
      component: ShowWaitingNews,
    },
    {
      path: "/news/shownews",
      text: t("seeFull"),
      component: ShowWaitingNews,
    },
    {
      path: "/news/edit",
      text: t("seeFull"),
      component: EditNews,
    },
    {
      path: "/news/repair",
      text: t("resetNews"),
      component: RepairNews,
    },
  ];
  return { menuItems, newsPath };
};

export default useNewsRoute;
