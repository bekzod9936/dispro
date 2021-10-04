import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const drawerWidth = 270;

export const useSideBarStyle = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      height: '100vh',
    },
    appBar: {
      [theme.breakpoints.down('lg')]: {
        height: '65px',
      },
      [theme.breakpoints.up('lg')]: {
        height: '90px',
      },
      display: 'flex',
      justifyContent: 'center',
      background: '#FFFFFF',
      boxShadow: 'none',
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      margin: '0 30px',
      [theme.breakpoints.down('xs')]: {
        margin: '0',
      },
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up('xs')]: {
        width: '99px',
      },
      [theme.breakpoints.down('xs')]: {
        width: '0',
      },
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      [theme.breakpoints.down('lg')]: {
        height: '65px',
      },
      [theme.breakpoints.up('lg')]: {
        height: '90px',
      },
      ...theme.mixins.toolbar,
    },
  })
);
