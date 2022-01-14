import Button from 'components/Custom/Buttons/Button';
import { CancelIcon } from './style';
import useWindowWidth from 'services/hooks/useWindowWidth';

interface Props {
  onClick?: () => void;
  mobile?: boolean;
  margin?: any;
  text: string;
}

const CancelButton = ({ onClick = () => {}, mobile, margin, text }: Props) => {
  const { width } = useWindowWidth();
  return width > 1000 ? (
    <Button
      buttonStyle={{
        color: '#223367',
        bgcolor: 'white',
        weight: '500',
      }}
      onClick={onClick}
      margin={{ laptop: '0 15px 0 0' }}
    >
      <CancelIcon />
      {text}
    </Button>
  ) : (
    <Button
      buttonStyle={{
        color: '#606EEA',
        bgcolor: '#eff0fd',
        weight: '500',
      }}
      onClick={onClick}
      margin={{ mobile: '0 10px 0 0', planshet: '0 10px 0 0' }}
    >
      {text}
      <CancelIcon />
    </Button>
  );
};

export default CancelButton;
