import NavBar from "components/Custom/NavBar";
import { Flex } from "pages/CompanyPages/staff/style";
import useStaffRoute from "../../routes";
import { CardContainer } from "./style";

const CashierCard = () => {
  const { menuItems } = useStaffRoute();

  return (
    <CardContainer>
      Cashier Card
      <Flex width="90%" height="85px" alignItems="flex-start" margin="0">
        <NavBar
          list={menuItems.filter((item) =>
            item.path.includes("/staff/cashier")
          )}
          margin="20px 0"
          padding="0 10px 10px 0"
        />
      </Flex>
    </CardContainer>
  );
};

export default CashierCard;
