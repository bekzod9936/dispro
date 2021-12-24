import Button from 'components/Custom/Buttons/Button';
import Modal from 'components/Custom/Modal';
import Popover from 'components/Custom/Popover';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import useWindowWidth from 'services/hooks/useWindowWidth';
import useChatClients from '../../screens/NewPosts/useUsers';
import useDelete from '../../hooks/useDelete';
import blockChatDeletion from 'assets/images/blockChatDeletion.png';
import {
  Delete,
  Link,
  SelectWrap,
  DotsWrap,
  DotsIcon,
  DeleteIcon,
  ModelContent,
  ModelTitle,
  ModalWrap,
  ModalText,
  CloseIcon,
  Img,
  WrapWarning,
  Texts,
} from './style';
import { setUsers } from 'services/redux/Slices/feedback';
import { useAppDispatch, useAppSelector } from 'services/redux/hooks';

interface Props {
  id?: any;
  setCurrentUser?: any;
}

const Dots = ({ id, setCurrentUser }: Props) => {
  const { t } = useTranslation();
  const { width } = useWindowWidth();
  const [closeFun, setCloseFun] = useState<any>();
  const [open, setOpen] = useState(false);
  const [openWaring, setOpenWarning] = useState(false);
  const dispatch = useAppDispatch();
  const users: any = useAppSelector((state) => state.feedbackPost.users);

  const { resChatClients } = useChatClients();
  const { deleteRes } = useDelete();

  const funFetch = async (newArr: any) => {
    await dispatch(setUsers(newArr));
    await resChatClients.refetch();
    await setCurrentUser({});
  };

  const handleDelete = () => {
    const data: any = {
      withUserType: 1,
      withId: id,
    };
    deleteRes.mutate(data, {
      onSuccess: () => {
        const newArr = users.filter((v: any) => v?.id !== id);
        funFetch(newArr);
        setOpen(false);
      },
    });
  };

  const handleClose = (e: any) => {
    setCloseFun(e);
  };

  return (
    <>
      <Popover
        click={
          <DotsWrap>
            <DotsIcon />
          </DotsWrap>
        }
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
        transformOrigin={{ horizontal: 'left', vertical: 'top' }}
        openBgColor='rgba(96, 110, 234, 0.1)'
        radius={14}
        popoverStyle={{ marginTop: '20px' }}
        onClose={handleClose}
      >
        <SelectWrap>
          <Delete
            onClick={() => {
              setOpenWarning(true);
              closeFun.close();
            }}
          >
            {t('deletechat')}
          </Delete>
        </SelectWrap>
      </Popover>
      <Modal open={openWaring}>
        <WrapWarning>
          <Img src={blockChatDeletion} alt='defImage' />
          <span className='title'> {t('chatdeletewarning')}</span>
          <span className='text'> {t('chatdeletewarning1')}</span>

          <Button
            onClick={() => {
              setOpen(true);
              setOpenWarning(false);
            }}
            buttonStyle={{ shadow: '0px 4px 9px rgba(96, 110, 234, 0.46)' }}
          >
            {t('continue')}
          </Button>
        </WrapWarning>
      </Modal>
      <Modal open={open}>
        <ModelContent>
          <Texts>
            <ModelTitle> {t('areyousuredeletechat')}</ModelTitle>
            <ModalText>{t('deletechatsaveinclients')}</ModalText>
          </Texts>
          <ModalWrap>
            <Button
              buttonStyle={{
                bgcolor: width > 600 ? 'white' : '#eff0fd',
                color: width > 600 ? '#223367' : '#606EEA',
                weight: 500,
              }}
              margin={{
                laptop: '0 30px 0 0',
                mobile: '0 10px 0 0',
              }}
              onClick={() => {
                setOpen(false);
              }}
              startIcon={width > 600 ? <CloseIcon /> : null}
              endIcon={width < 600 ? <CloseIcon /> : null}
            >
              {t('cancel')}
            </Button>
            <Button
              onClick={handleDelete}
              buttonStyle={{
                color: '#ffffff',
                bgcolor: '#FF5E68',
                shadow: '0px 4px 9px rgba(255, 94, 104, 0.46)',
              }}
              startIcon={<DeleteIcon />}
              disabled={deleteRes.isLoading}
            >
              {t('delete')}
            </Button>
          </ModalWrap>
        </ModelContent>
      </Modal>
    </>
  );
};

export default Dots;
