import React from 'react';
import { Flex } from '../../../styles/BuildingBlocks';
import { Text } from '../../../styles/CustomStyles';
import coins from '../../../assets/images/coinsImage.png';
const PointsSection = () => {
  return (
    <>
      <Flex
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
        width='100%'
      >
        <div style={{ width: '217px', height: '178px', objectFit: 'contain' }}>
          <img src={coins} alt='' />
        </div>
        <div style={{ marginTop: '20px' }}>
          <Text
            marginLeft='0px'
            marginRight='0px'
            fontSize='17'
            fontWeight={400}
          >
            Тут будут отображаться все операции, связанные с баллами клиента
          </Text>
        </div>
      </Flex>
    </>
  );
};

export default PointsSection;
