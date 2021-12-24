import Modal from 'components/Custom/Modal';
import React from 'react';
import coinsImage from 'assets/images/coinsImage.png';
import laptopImage from 'assets/images/Laptop.png';
import { OutSideWrapper, Wrapper } from './style';
import Button from 'components/Custom/Buttons/Button';
interface IProps {
  isOpen: boolean;
  handleClose: (arg: boolean) => void;
  action: number;
}
const contents: any = {
  1: {
    image: coinsImage,
    text: 'Баллы будут начислены в течение нескольких минут',
    btnLabel: 'Продолжить',
  },
  2: {
    image: laptopImage,
    text: 'Баллы будут списаны в течение нескольких минут',
    btnLabel: 'Продолжить',
  },
  3: {
    image: laptopImage,
    text: 'Баллы будут списаны в течение нескольких минут',
    btnLabel: 'Продолжить',
  },
  4: {
    image: laptopImage,
    text: 'Баллы будут списаны в течение нескольких минут',
    btnLabel: 'Продолжить',
  },
};
export const SuccessModal = ({ isOpen, handleClose, action }: IProps) => {
  const content = contents[action];

  return (
    <Modal modalStyle={{ bgcolor: 'transparent' }} open={isOpen}>
      <OutSideWrapper>
        <Wrapper>
          <img src={content.image} alt='modalImage' />
          <p>{content.text}</p>
          <Button onClick={handleClose}>{content.btnLabel}</Button>
        </Wrapper>
      </OutSideWrapper>
    </Modal>
  );
};
