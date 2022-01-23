import React, { useState } from "react";
import CustomToggle from "components/Custom/CustomToggleSwitch";

import { GroupToggle, ToggleInfo,ModalTitle,ModalBody ,LoyalDiv,BtnContainer} from "../../style";
import Modal from 'components/Custom/Modal';
import Radio from 'components/Custom/Radio';
import { CustomButton, ModalComponent, Text } from 'styles/CustomStyles';
import { FONT_SIZE, FONT_WEIGHT } from 'services/Types/enums';
import {  IconButton } from '@material-ui/core';
import { CancelIcon } from 'assets/icons/ClientsPageIcons/ClientIcons';
import { ReactComponent as Close } from 'assets/icons/IconsInfo/close.svg';
import RippleEffect from 'components/Custom/RippleEffect';
import Button from 'components/Custom/Buttons/Button';
import { SyncIcon } from 'assets/icons/FeedBackIcons.tsx/FeedbackIcons';
import { useTranslation } from 'react-i18next';


const Left = () => {

  const { t } = useTranslation();
  const [modified,setModified]=useState('0')
  const [modalInfo1,setModalInfo1]=useState(false);
  const [modalInfo2,setModalInfo2]=useState(false);
  const [modalInfo3,setModalInfo3]=useState(false);
  const [discounts, setDiscounts] = useState(false);
  const [cashback, setCashback] = useState(false);
  const [points, setPoints] = useState(false);


  const handleChangeDiscount = () => {
    setModalInfo1(true);
    setDiscounts(true);
    setCashback(false );
    setPoints(false );
  };
  const handleChangeCashback = () => {
      setModalInfo2(true);
      setCashback(true );
      setDiscounts(false);
      setPoints(false );
  };
  const handleChangePoints = () => {
      setModalInfo3(true);
      setPoints(true);
      setDiscounts(false);
      setCashback(false );
  };

  const handlePush=()=>{
    console.log('modified',modified)
    setModified('0');
    setDiscounts(modalInfo1 )
    setCashback(modalInfo2 )
    setPoints(modalInfo3 )
  }


  return (
    <>
      <GroupToggle>
        <CustomToggle checked={discounts} onChange={handleChangeDiscount} />
        <ToggleInfo>
          <h5>Предоставление скидки</h5>
          <p>
            Клиент получает скидку при каждой покупке в размере определенного %
          </p>
        </ToggleInfo>
      </GroupToggle>
      <GroupToggle>
        <CustomToggle checked={cashback} onChange={handleChangeCashback} />
        <ToggleInfo>
          <h5>Предоставление кешбэка</h5>
          <p>
            Клиент получает кешбэк в виде реальных денег после каждой покупки
          </p>
        </ToggleInfo>
      </GroupToggle>
      <GroupToggle>
        <CustomToggle checked={points} onChange={handleChangePoints} />
        <ToggleInfo>
          <h5>Предоставление баллов</h5>
          <p>
            Клиент получает баллы после каждой покупки которые может потратить
            только у вас в компании
          </p>
        </ToggleInfo>
      </GroupToggle>
      {/* <Modal open={modalInfo1 ||modalInfo2||modalInfo3}> */}
      <Modal >
            <ModalComponent>
              <ModalTitle>
                <Text fontSize={FONT_SIZE.large} fontWeight={FONT_WEIGHT.bold}>
                  Выберите тип замены программы лояльности?
                </Text>

                <IconButton
                  onClick={() => {
                    setModalInfo1(false);
                    setModalInfo2(false);
                    setModalInfo3(false);
                  }}
                >
                  <Close />
                </IconButton>
              </ModalTitle>
              <ModalBody>
                <Text
                  fontSize={FONT_SIZE.mediumPlus}
                  fontWeight={FONT_WEIGHT.modalText}
                  marginBottom={'25px'}
                >
                  При изменении программы лояльности Вы можете обнулить статусы
                  ваших клиентов или заменить программу лояльности, сохранив
                  статусы клиентов.
                </Text>
                <LoyalDiv>
                  <Radio
                    flexDirection='column'
                    list={[
                      {
                        value: '1',
                        label: `Обнулить статусы клиентов при замене лояльности`,
                      },
                      {
                        value: '2',
                        label: `Сохранить статусы клиентов при замене лояльности`,
                      },
                    ]}
                    title={''}
                    onChange={(v: any) => setModified(v)}
                    value={modified}
                  />
                </LoyalDiv>
              </ModalBody>
              <BtnContainer>
                <RippleEffect>
                  <CustomButton
                    background='white'
                    onClick={() => {
                      setModalInfo1(false);
                      setModalInfo2(false);
                      setModalInfo3(false);
                    }}
                  >
                    <CancelIcon />
                    <div style={{ width: '15px' }} />
                    <Text>{t('cancel')}</Text>
                  </CustomButton>
                </RippleEffect>

                <Button
                  onClick={() => {
                    handlePush()
                    setModalInfo1(false);
                    setModalInfo2(false);
                    setModalInfo3(false);
                  }}
                  disabled={modified === '0'}
                  startIcon={<SyncIcon />}
                  type='button'
                >
                  <Text color='white'>{t('change')}</Text>
                </Button>
              </BtnContainer>
            </ModalComponent>
          </Modal>
    </>
  );
};
export default Left;
