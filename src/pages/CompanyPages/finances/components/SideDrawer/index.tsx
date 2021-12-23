import { IconButton } from '@material-ui/core';
import Button from 'components/Custom/Button';
import { useTranslation } from 'react-i18next';
import { ReactComponent as EditPen } from 'assets/icons/editpen.svg';
import {
  WrapSideBody,
  WrapSideHeader,
  WrapSideFooter,
  BodyTitle,
  Comment,
  CloseIcon,
  DeleteIcon1,
  WarpButton,
} from './style';

interface Props {
  onAllClose?: () => void;
  handleEdit?: () => void;
  handleDelete?: () => void;
  handleClickCommet?: () => void;

  comment?: string;
}

const SideDrawer = ({
  onAllClose = () => {},
  handleEdit = () => {},
  handleDelete = () => {},
  handleClickCommet = () => {},

  comment,
}: Props) => {
  const { t } = useTranslation();
  if (comment === '') {
    return (
      <WarpButton>
        <Button
          buttonStyle={{
            bgcolor: '#e1e3fb',
            color: '#3492FF',
            radius: 12,
            weight: 300,
            height: {
              laptop: 36,
              desktop: 36,
              planshet: 36,
              mobile: 36,
            },
            fontSize: {
              desktop: 14,
              laptop: 14,
              planshet: 14,
            },
          }}
          onClick={handleEdit}
        >
          {t('addcomment')}
        </Button>
      </WarpButton>
    );
  } else {
    return (
      <>
        <WrapSideBody>
          <WrapSideHeader>
            {t('operation')}
            <IconButton onClick={() => onAllClose()}>
              <CloseIcon />
            </IconButton>
          </WrapSideHeader>
          <BodyTitle>{t('commentoperation')}</BodyTitle>
          <Comment>
            <div>{comment}</div>
          </Comment>
        </WrapSideBody>
        <WrapSideFooter>
          <Button startIcon={<EditPen />} onClick={handleEdit}>
            {t('edit')}
          </Button>
          <Button
            buttonStyle={{
              color: 'white',
              bgcolor: '#FF5E68',
              weight: 500,
              shadow: '0px 4px 9px rgba(255, 94, 104, 0.46)',
            }}
            margin={{ mobile: '0 0 20px 0' }}
            startIcon={<DeleteIcon1 />}
            onClick={handleDelete}
          >
            {t('deletecomment')}
          </Button>
        </WrapSideFooter>
      </>
    );
  }
};

export default SideDrawer;
