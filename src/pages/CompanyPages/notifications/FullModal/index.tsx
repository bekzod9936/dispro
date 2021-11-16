import { forwardRef } from 'react';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';

interface Props {
  children?: any;
  open?: boolean;
}

const Transition: any = forwardRef(function Transition(props: any, ref: any) {
  return <Slide direction='left' ref={ref} {...props} />;
});

const FullModal = ({ children, open = false }: Props) => {
  return (
    <Dialog fullScreen fullWidth open={open} TransitionComponent={Transition}>
      {children}
    </Dialog>
  );
};

export default FullModal;
