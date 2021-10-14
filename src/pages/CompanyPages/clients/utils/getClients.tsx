import { Avatar, Checkbox } from "@material-ui/core";
import ImageLazyLoad from "components/Custom/ImageLazyLoad/ImageLazyLoad";
import moment from "moment";
import { Flex } from "styles/BuildingBlocks";
import { Text } from "styles/CustomStyles";


export function getClients(arr: any, client: any) {
    return arr.map((el: any) => {
      return {
        data: {
          check: (
            <Checkbox
              value={true}
              checked={
                client.some((value: any) => value.id === el.id)
              }
            />
          ),
          client: (
            <Flex justifyContent="start">
              <Avatar>
                <ImageLazyLoad
                  objectFit="contain"
                  src={el.image}
                  alt={el?.firstName}
                />
              </Avatar>
              <Text
                marginRight="0px"
                marginLeft="14px"
                fontSize="15px"
                fontWeight={400}
              >
                {`${el.firstName} ${el.lastName}`}
              </Text>
            </Flex>
          ),
          DiscountSum: el.addInfo.discountSum,
          PointSum: el.addInfo.pointSum,
          CashbackSum: el.addInfo.cashbackSum,
          gender: el.addInfo.genderStr,
          age: parseInt(moment(el.dateOfBirth).fromNow()),
          purchuase_amount: el.addInfo.countOperation,
          paid: el.addInfo.amountOperation,
          recomendations: "",
          traffic_providers: el.addInfo.sourceBy,
          level: el.addInfo.referLevel,
          last_purchase: el.addInfo.lastPurchaseDate
            ? moment(el.addInfo.lastPurchaseDate).format("DD.MM.YY")
            : " - ",
        },
        id: el.id
      }
    })
  }
