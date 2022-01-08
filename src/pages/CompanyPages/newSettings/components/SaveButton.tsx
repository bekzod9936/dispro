import Button from 'components/Custom/Buttons/Button';
import { SaveIcon } from './style';
import useWindowWidth from 'services/hooks/useWindowWidth';

interface Props {
  onClick?: () => void;
  disabled?: boolean;
  margin?: any;
  type?: 'button' | 'submit' | 'reset';
  text: string;
}

const SaveButton = ({
  onClick = () => {},
  margin,
  disabled,
  type = 'submit',
  text,
}: Props) => {
  const { width } = useWindowWidth();

  return (
    <Button
      type={type}
      buttonStyle={{
        shadow: '0px 4px 9px rgba(96, 110, 234, 0.46)',
        weight: 500,
      }}
      margin={margin}
      onClick={onClick}
      startIcon={width > 1000 ? <SaveIcon /> : null}
      endIcon={width < 1000 ? <SaveIcon /> : null}
      disabled={disabled}
    >
      {text}
    </Button>
  );
};

export default SaveButton;
