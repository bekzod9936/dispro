import { TextareaAutosize } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Flex } from '../../../styles/BuildingBlocks';
import { makeStyles } from '@material-ui/core';
import { boxSizing } from '@material-ui/system';
import { UnderTextArea } from '../../../styles/Elements';
import { CustomButton, Text } from '../../../styles/CustomStyles';
import {
  AttachIcon,
  SmileIcon,
  TelegraIcon,
} from '../../../assets/icons/FeedBackIcons.tsx/FeedbackIcons';
import { Controller, useForm } from 'react-hook-form';

const useStyles = makeStyles({
  root: {
    height: '100px',
    boxSizing: 'border-box',
    padding: '20px',
    width: '100%',
    border: 'none',
    outline: 'none',
    resize: 'none',
    '&::placeholder': {
      fontFamily: 'Roboto',
    },
  },
});

interface IChatTextArea {
  setSendingChat?: any;
  chatSendCount?: number;
}

export const ChatTextArea: React.FC<IChatTextArea> = ({
  setSendingChat,
  chatSendCount,
}) => {
  const classes = useStyles();
  const {
    control,
    handleSubmit,
    formState: errors,
    setValue,
    watch,
  } = useForm();
  const [chatMessage, setChatMessage] = useState<string>('');
  const onFormSubmit = (data: any) => {
    setSendingChat(data.chatMessage);
  };

  useEffect(() => {
    setValue('chatMessage', '');
  }, [chatSendCount]);
  const handleKeyDown:
    | React.KeyboardEventHandler<HTMLTextAreaElement>
    | undefined = (e) => {
    if (watch('chatMessage')?.length > 12 && e.key !== 'Backspace') {
      e.preventDefault();
    }
  };

  return (
    <div
      style={{
        border: '2px solid #C2C2C2',
        borderRadius: '14px',
        overflow: 'hidden',
        width: '100%',
        flexGrow: 1,
      }}
    >
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <Flex margin='0px' width='100%' flexDirection='column'>
          <Controller
            control={control}
            name='chatMessage'
            render={({ field }) => {
              return (
                <TextareaAutosize
                  onKeyDown={handleKeyDown}
                  rowsMax={3}
                  rowsMin={3}
                  {...field}
                  className={classes.root}
                  wrap='wrap'
                  placeholder='Напишите ваше сообщение'
                />
              );
            }}
            rules={{ required: 'true', maxLength: 150 }}
          />

          <UnderTextArea>
            <div style={{ flexGrow: 1 }}>
              <Text
                marginLeft='0px'
                marginRight='0px'
                fontSize='14px'
                fontWeight={400}
                color='#8f8f8f'
              >
                Вы можете написать еще 3 сообщения
              </Text>
            </div>
            <Flex justifyContent='space-between' width='35%'>
              <AttachIcon />
              <SmileIcon />
              <CustomButton type='submit'>
                <TelegraIcon />
                <Text color='white' fontSize='15px' fontWeight={500}>
                  Отправить
                </Text>
              </CustomButton>
            </Flex>
          </UnderTextArea>
        </Flex>
      </form>
    </div>
  );
};
