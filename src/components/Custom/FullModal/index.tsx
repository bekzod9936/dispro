import { forwardRef } from 'react';
import Slide from '@material-ui/core/Slide';
import { MDialog } from './style';

interface Props {
  children?: any;
  open?: boolean;
  direction?: "down" | "left"
}

const Transition: any = forwardRef(function Transition(props: any, ref: any) {
  return <Slide direction='left' ref={ref} {...props} />;
});

const BottomTransition: any = forwardRef(function Transition(props: any, ref: any) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const FullModal = ({ children, direction = "left", open = false }: Props) => {
  return (
    <MDialog fullScreen fullWidth open={open} TransitionComponent={direction === "down" ? BottomTransition : Transition}>
      {children}
    </MDialog>
  );
};

export default FullModal;
