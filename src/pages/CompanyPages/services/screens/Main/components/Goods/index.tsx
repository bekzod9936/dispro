import { useMemo, useState } from "react";

//components
import Spinner from "components/Helpers/Spinner";
import { ItemGroup } from "pages/CompanyPages/services/components/ItemGroup";
import { EmptyPage } from "../EmptyPage";
import { ChangeAmountModal } from "pages/CompanyPages/services/components/Modals/ChangeAmount";
import { DeleteModal } from "pages/CompanyPages/services/components/Modals/Delete";

//other
import { useSectionsWithIdEntity } from "pages/CompanyPages/services/hooks/MainPageHooks";
import { IGoods, Modals } from "pages/CompanyPages/services/utils/types";
import { IGoodsResponse } from "services/queries/servicesQueries/response.types";
import { goodsModalsDefaults } from "pages/CompanyPages/services/constants";

//style
import { Wrapper } from "./style";
import { HideModal } from "pages/CompanyPages/services/components/Modals/Hide";

interface GoodsProps {
  goods: IGoods;
  isLoading: boolean;
}

export const Goods: React.FC<GoodsProps> = ({ goods, isLoading }) => {
  const [currentItem, setCurrentItem] = useState<IGoodsResponse | null>(null);
  const [modals, setModals] = useState<Modals>(goodsModalsDefaults);

  const sectionsObject = useSectionsWithIdEntity();
  const isUserhasGoods = useMemo(() => Object.keys(goods).length > 0, [goods]);
  const isPageEmpty = !isUserhasGoods && !isLoading;

  const handleOpenModal = (modalName: keyof Modals) => {
    setModals((prev) => ({ ...prev, [modalName]: true }));
  };

  const handleCloseModal = (modalName: keyof Modals) => {
    return () => setModals((prev) => ({ ...prev, [modalName]: false }));
  };

  return (
    <Wrapper>
      {isLoading && <Spinner size={35} />}
      {isPageEmpty && <EmptyPage />}
      {Object.keys(goods).map((sectionId) => (
        <ItemGroup
          key={sectionId}
          onOpenModal={handleOpenModal}
          currentItem={currentItem}
          setCurrentItem={setCurrentItem}
          sectionName={sectionsObject?.[Number(sectionId)]}
          sectionId={sectionId}
          goods={goods[Number(sectionId)]}
        />
      ))}
      <ChangeAmountModal
        open={modals.changeAmount}
        label={currentItem?.name}
        onClose={handleCloseModal("changeAmount")}
        count={currentItem?.count}
      />
      <DeleteModal
        isItem
        id={currentItem?.id || 0}
        onClose={handleCloseModal("delete")}
        open={modals.delete}
        name={currentItem?.name}
      />
      <HideModal
        isItem
        id={currentItem?.id || 0}
        onClose={handleCloseModal("hide")}
        open={modals.hide}
        name={currentItem?.goodsTranslates[0].translateName || ""}
      />
    </Wrapper>
  );
};
