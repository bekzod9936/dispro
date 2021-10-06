import React from "react";
import { Flex } from "../../../../styles/BuildingBlocks";
import { RightSideDrawer } from "../../../../styles/Elements";
import { Text } from "../../../../styles/CustomStyles";
import { CloseIcon } from "../../../../assets/icons/ClientsPageIcons/ClientIcons";
import QRCode from "react-qr-code";

const Invite = ({ setInvite }: any) => {
  let qrValue = "Saidkamol";
  return (
    <RightSideDrawer>
      <Flex
        flexDirection="column"
        width="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        <Flex
          alignItems="center"
          width="97%"
          justifyContent="space-between"
          margin="15px 25px 0px 25px"
        >
          <Text marginLeft="25px" fontSize="17px" fontWeight={700}>
            Код приглашения
          </Text>
          <div style={{ marginRight: "25px" }} onClick={() => setInvite(false)}>
            <CloseIcon />
          </div>
        </Flex>
        <Flex width="238px" alignItems="flex-start" margin="25px 0px 0px 0px">
          <Text marginLeft="0px" fontSize="15px" fontWeight={400}>
            При сканировании кода клиент попадет в вашу базу.
          </Text>
        </Flex>
        <div style={{ width: "150px", marginTop: "35px", height: "150px" }}>
          <QRCode value={qrValue} size={150} />
        </div>
        <div style={{ marginTop: "25px" }}>
          <Text
            marginLeft="0px"
            fontWeight={500}
            fontSize="21px"
            marginRight="0px"
          >
            {qrValue}
          </Text>
        </div>
        <div style={{ marginTop: "80px" }}>
          <Text
            marginLeft="0px"
            fontWeight={700}
            fontSize="15px"
            marginRight="0px"
            color="#c7c7c7"
          >
            Ссылка на присоединение
          </Text>
          <div
            style={{
              marginTop: "15px",
              borderRadius: "12px",
              padding: "18px 21px",
              width: "100%",
              border: "1px solid #A5A5A5",
            }}
          >
            <Text
              marginLeft="0px"
              fontWeight={500}
              fontSize="17px"
              marginRight="0px"
              color="#c7c7c7"
            >
              http://discount
            </Text>
          </div>
        </div>
        <Flex margin="40px 0px 0px 0px ">
          <Text fontSize="17px" fontWeight={500} color="#606EEA">
            Скопировать ссылку
          </Text>
        </Flex>
      </Flex>
    </RightSideDrawer>
  );
};

export default Invite;
