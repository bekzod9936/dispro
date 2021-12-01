import Button from 'components/Custom/Button';
import Modal from 'components/Custom/Modal';
import Popover from 'components/Custom/Popover';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import useWindowWidth from 'services/hooks/useWindowWidth';
import { useAppDispatch, useAppSelector } from 'services/redux/hooks';
import { setChosenListUser } from 'services/redux/Slices/feedback';
import useChatClients from '../../hooks/useChatClients';
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
} from './style';

const Dots = () => {
  const { t } = useTranslation();
  const { width } = useWindowWidth();
  const dispatch = useAppDispatch();
  const [closeFun, setCloseFun] = useState<any>();
  const [open, setOpen] = useState(false);
  const chosen = useAppSelector(
    (state) => state.feedbackPost.chosenListUser?.chosen
  );
  const chosenListUser = useAppSelector(
    (state) => state.feedbackPost.chosenListUser
  );

  const { deleteRes, resChatClients } = useChatClients();

  const handleDelete = () => {
    const data: any = {
      withUserType: 1,
      withId: chosen?.id,
    };
    deleteRes.mutate(data, {
      onSuccess: () => {
        dispatch(setChosenListUser({ ...chosenListUser, isChoose: false }));
        resChatClients.refetch();
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
          <Link>{t('sharelink')}</Link>
          <Delete
            onClick={() => {
              setOpen(true);
              closeFun.close();
            }}
          >
            {t('deletechat')}
          </Delete>
        </SelectWrap>
      </Popover>
      <Modal open={open}>
        <ModelContent>
          <ModelTitle> {t('areyousuredeletechat')}</ModelTitle>
          <ModalText>{t('deletechatsaveinclients')}</ModalText>
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
