import { forwardRef } from 'react';
import Slide from '@material-ui/core/Slide';
import { MDialog } from './style';

interface Props {
  children?: any;
  open?: boolean;
}

const Transition: any = forwardRef(function Transition(props: any, ref: any) {
  return <Slide direction='left' ref={ref} {...props} />;
});

const FullModal = ({ children, open = false }: Props) => {
  return (
    <MDialog fullScreen fullWidth open={open} TransitionComponent={Transition}>
      {children}
    </MDialog>
  );
};

export default FullModal;
