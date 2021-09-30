import React, { Suspense, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAppSelector } from '../../services/redux/hooks';
import {
  Container,
  MenuIcon,
  SettingIcon,
  LogoIcon,
  Content,
  WrapList,
  Title,
  ListText,
  DesktopDrawer,
  MobileDrawer,
  MobileHeader,
  ListI,
  WrapperPage,
  WrapLogo,
  WrapMenu,
} from './style';
import clsx from 'clsx';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { sidebar } from './sidebar';
import { useTranslation } from 'react-i18next';
import Logo from '../../assets/icons/SideBar/logo.png';
import { device } from '../../styles/device';
import { setCurrentPage } from '../../services/redux/Slices/partnerSlice';
import { useAppDispatch } from '../../services/redux/hooks';
import Header from './Header';
import { useQuery } from 'react-query';
import { fetchInfo } from '../../services/queries/PartnerQueries';
import { setCompanyInfo } from '../../services/redux/Slices/partnerSlice';
import Spinner from '../Custom/Spinner';
import { useLocation } from 'react-router-dom';

const drawerWidth = 270;

const useStyles = makeStyles((theme: Theme) =>
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
      ...theme.mixins.toolbar,
    },
  })
);
export interface IDefaultLayout {
  children: any;
}

const DefaultLayoutAdmin: React.FC<IDefaultLayout> = ({ children }) => {
  const { t } = useTranslation();
  const history = useHistory();
  const classes = useStyles();
  const location = useLocation();

  const [width, setWidth] = useState(window.innerWidth);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [open, setOpen] = useState(width <= 600 ? false : true);

  const dispatch = useAppDispatch();
  const companyState = useAppSelector((state) => state.auth.companyState);
  const currentPage = useAppSelector((state) => state.partner.currentPage);

  const handleDrawerOpen = () => {
    if (width <= parseInt(device.mobile, 10)) {
      setMobileOpen(!mobileOpen);
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
      if (window.innerWidth <= parseInt(device.mobile, 10)) {
        setOpen(false);
      } else {
        setMobileOpen(false);
      }
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const response = useQuery(
    'logoANDname',
    () => fetchInfo(localStorage.getItem('companyId')),
    {
      onSuccess: (data) => {
        dispatch(setCompanyInfo(data?.data.data));
      },
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      retry: 0,
    }
  );

  const toggleDrawer = (open: boolean) => (event: any) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setMobileOpen(open);
  };

  const HeaderList = () => {
    return (
      <>
        <WrapLogo>
          <LogoIcon src={Logo} alt='logo' />
          <Title>DIS-COUNT</Title>
        </WrapLogo>
        <IconButton onClick={handleDrawerClose}>
          <MenuIcon />
        </IconButton>
      </>
    );
  };
  const MainList = () => {
    return (
      <WrapList>
        <List>
          {sidebar.map(({ Icon, text, path }) => (
            <ListI
              button
              key={text}
              onClick={() => {
                history.push(`/${path}`);
                dispatch(setCurrentPage(path));
              }}
              selected={location.pathname === `/${path}` ? true : false}
            >
              <ListItemIcon>
                <Icon />
              </ListItemIcon>
              <ListText primary={t(text)} />
            </ListI>
          ))}
        </List>
        <List>
          <ListI
            button
            key='settings'
            onClick={() => {
              history.push(`/settings`);
              dispatch(setCurrentPage('settings'));
            }}
            selected={currentPage === 'settings' ? true : false}
          >
            <ListItemIcon>
              <SettingIcon />
            </ListItemIcon>
            <ListText primary='settings' />
          </ListI>
        </List>
      </WrapList>
    );
  };

  if (response.isLoading) {
    return <Spinner height='100vh' />;
  }

  return (
    <Container>
      <div className={classes.root}>
        <CssBaseline />
        <MobileDrawer
          anchor='left'
          open={mobileOpen}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
          style={{
            pointerEvents: companyState === 'new' ? 'none' : 'auto',
            opacity: companyState === 'new' ? 0.4 : 1,
          }}
        >
          <div
            role='presentation'
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >
            <MobileHeader>
              <HeaderList />
            </MobileHeader>
            <MainList />
          </div>
        </MobileDrawer>
        <AppBar
          position='fixed'
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <WrapMenu>
              <IconButton
                color='inherit'
                aria-label='open drawer'
                onClick={handleDrawerOpen}
                edge='start'
                className={clsx(classes.menuButton, {
                  [classes.hide]: open,
                })}
              >
                <MenuIcon />
              </IconButton>
            </WrapMenu>
            <Header />
          </Toolbar>
        </AppBar>
        <DesktopDrawer
          variant='permanent'
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
          style={{
            pointerEvents: companyState === 'new' ? 'none' : 'auto',
            opacity: companyState === 'new' ? 0.4 : 1,
          }}
        >
          <div className={classes.toolbar}>
            <HeaderList />
          </div>
          <MainList />
        </DesktopDrawer>
        <WrapperPage>
          <div className={classes.toolbar} />
          <Suspense fallback={<Spinner />}>
            <Content>{children}</Content>
          </Suspense>
        </WrapperPage>
      </div>
    </Container>
  );
};

export default React.memo(DefaultLayoutAdmin);
