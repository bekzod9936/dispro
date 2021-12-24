import Spinner from 'components/Helpers/Spinner';
import { Container, MButton } from './style';
import { Props } from '../type';

const Button = ({ children, ...props }: Props) => {
  return (
    <Container
      margin={props.margin}
      buttonStyle={props.buttonStyle}
      disabled={props.disabled}
      width={props.width}
      fullWidth={props.fullWidth}
      padding={props.padding}
    >
      <MButton
        value={props.value}
        fullWidth={props.fullWidth ? props.fullWidth : true}
        type={props.type}
        {...props}
      >
        {props.loading ? (
          <Spinner size={25} color={props.loadingColor} />
        ) : (
          children
        )}
      </MButton>
    </Container>
  );
};

export default Button;
