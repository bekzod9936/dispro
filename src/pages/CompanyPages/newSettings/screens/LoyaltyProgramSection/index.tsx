import Right from './components/RightSide';
import Left from './components/LeftSide';

import {
  Container,
  LeftSide,
  RightSide,
} from "./style";

const LoyaltyProgramSection = () => {

  return (
    <Container>
      <LeftSide>
         <Left/>
      </LeftSide>
      <RightSide>
      <Right/>
      </RightSide>
    </Container>
  );
};
export default LoyaltyProgramSection;
