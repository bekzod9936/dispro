import { CancelIcon } from 'assets/icons/ClientsPageIcons/ClientIcons';
import { MobileCancelIcon } from 'assets/icons/proposals/ProposalsIcons';
import Button from 'components/Custom/Buttons/Button';
import Modal from 'components/Custom/Modal';
import useWindowWidth from 'services/hooks/useWindowWidth';
import { ExitIcon, Wrapper } from './style';

interface LeaveModalProps {
  setLeave: (e: boolean) => void;
  handleBack: () => void;
  open: boolean;
  message: string;
}

export const LeaveModal: React.FC<LeaveModalProps> = ({
  setLeave,
  handleBack,
  open,
  message,
}) => {
  const { width } = useWindowWidth();
  return (
    <Modal open={open}>
      <Wrapper>
        <h4>Покинуть страницу?</h4>
        <p>{`Данные будут утеряны, если вы покинете страницу "${message}"`}</p>
        <div className='buttons'>
          <Button
            buttonStyle={
              width > 1000
                ? { bgcolor: 'white', color: '#223367' }
                : { bgcolor: 'rgba(96, 110, 234, 0.1)', color: '#606EEA' }
            }
            margin={{ laptop: '0 15px 0 0' }}
            onClick={() => setLeave(false)}
            startIcon={width > 1000 ? <CancelIcon /> : <MobileCancelIcon />}
          >
            Отмена
          </Button>
          <Button startIcon={<ExitIcon />} onClick={handleBack}>
            Покинуть
          </Button>
        </div>
      </Wrapper>
    </Modal>
  );
};
