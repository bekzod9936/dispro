import { Container } from './style';

interface Props {
  children?: any;
  padding?: {
    mobile?: string;
    planshet?: string;
    laptop?: string;
    desktop?: string;
  };
}

const Title = ({ children, padding }: Props) => {
  return <Container padding={padding}>{children}</Container>;
};

export default Title;
