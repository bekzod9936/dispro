import React from "react";
import { Text } from "styles/CustomStyles";
import { ReactComponent as LeftUser } from "assets/icons/referal_icon_left.svg";
import { ReactComponent as SimpleUser } from "assets/icons/simple_user.svg";
import { ReactComponent as SalePerson } from "assets/icons/sale_person.svg";
import { ReactComponent as Arrow } from "assets/icons/arrow.svg";
import { ReactComponent as LongArrow } from "assets/icons/long_arrow.svg";
import { ReactComponent as ShortArrow } from "assets/icons/short_arrow.svg";
import { ArrowDiv, TextContainer, TwoUserDiv, UsersRow } from "./style";

interface ITwoUsers {
  name1?: any;
  name2?: any;
  name3?: any;
}

const TwoUsers: React.FC<ITwoUsers> = ({ name1, name2, name3 }) => {
  return (
    <TwoUserDiv>
      <ArrowDiv>{!name3 ? <ShortArrow /> : <LongArrow />}</ArrowDiv>
      <UsersRow width={name3 ? 210 : 120}>
        <div className="user1">
          <LeftUser />
          <TextContainer>
            <Text fontSize="12px" color="rgba(96, 110, 234, 1)">
              {name1}
            </Text>
          </TextContainer>
        </div>
        <div className="miniArrow">
          <Arrow />
        </div>
        {name3 && (
          <div className="user3" style={{ alignSelf: "center" }}>
            <SimpleUser />
            <div>
              <Text fontSize="12px" color="rgba(194, 194, 194, 1)">
                {name3}
              </Text>
            </div>
          </div>
        )}
        {name3 && (
          <div className="miniArrow">
            <Arrow />
          </div>
        )}

        <div>
          <SalePerson />
          <TextContainer>
            <Text fontSize="12px">{name2}</Text>
          </TextContainer>
        </div>
      </UsersRow>
    </TwoUserDiv>
  );
};

export default TwoUsers;
