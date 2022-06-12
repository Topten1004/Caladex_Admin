import * as React from 'react';
import {useState, useEffect} from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Speed';
import PaidIcon from '@mui/icons-material/Paid';
import MailIcon from '@mui/icons-material/Mail';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { useWeb3React } from "@web3-react/core";
import { CALADEX_ADDR, injected, BLOCK_CONFIRMATION_THRESHOLD } from '../../../constants';
import swal from 'sweetalert' ;
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { SignOut } from '../../../redux/actions/auth';
import { connect } from 'react-redux';
import HowToVoteIcon from '@mui/icons-material/HowToVote';


const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      minHeight : '100vh' ,
      backgroundColor: '#444',
      color: 'white',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);


function Menubar(props) {
  const history = useNavigate();
  const CurrentPage = props.CurrentPage;

  const {SignOut} = props;

  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openmenu = Boolean(anchorEl);
  const handleClick = (event) => {
    // console.log(event.currentTarget);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (event) => {
    // console.log(event.currentTarget);
    setAnchorEl(null);
  };

  const { active, account, chainId, library, activate, deactivate } = useWeb3React();
  console.log(active);

  const walletconnectHandleClick = () => {
    connectToContract();
  }

  const walletdisconnectHandleClick = () => {
    disconnectToContract();
  }

  const connectToContract = () => {
    const ethereum = window.ethereum;

    if (!ethereum || typeof ethereum.isMetaMask === "undefined"){
        alert("MetaMask is not installed. Please install MetaMask and try again.");
        return;
    } else {
        console.log("here") ;
        activate(injected);
    }
  }

  const disconnectToContract = async () => {
    const isOk = await swal({
      title: "Are you sure?",
      text: "Are you sure that you want to disconnect from your wallet?",
      type: "warning",
      buttons: [
        'No, disconnect!',
        'Yes, I am sure!'
      ],
    }) ;
    console.log(isOk) ;
    if(isOk){
      try {
        console.log("deactive") ;
       
        await deactivate();

      } catch (exception) {
        console.log(exception);
      }
    }
  }

  const logoutHandleClick = (event) => {
    // console.log(event);
    SignOut();
  }

  return (
    <div >
      <AppBar position="absolute" open={open}>
        <Toolbar
          sx={{
            pr: '24px', // keep right padding when drawer closed
            backgroundColor: 'black',
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: '36px',
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            {CurrentPage}
          </Typography>
          {/* <Grid >
              {active
                ? <Button variant='contained' color='info' onClick={() =>walletdisconnectHandleClick()}>( {account.slice(0,7)}.....{account.slice(account.length - 4, account.length)} )</Button>
                : <Button variant='contained' color='info' onClick={() => walletconnectHandleClick()}>Wallet Connect</Button>
              }
          </Grid> */}
          {/* <IconButton color="inherit">
            <Badge badgeContent={0} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton color="inherit">
            <Badge badgeContent={1} color="secondary">
              <MailIcon />
            </Badge>
          </IconButton> */}
          <Tooltip title="Account settings">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={openmenu ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={openmenu ? 'true' : undefined}
            >
              <Avatar sx={{ width: 32, height: 32 }}>A</Avatar>
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={openmenu}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            
            <MenuItem onClick={() => {history('/changepassword')}}>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              Change Password
            </MenuItem>
            <Divider />
            <MenuItem button='true' onClick={logoutHandleClick}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            px: [1],
            backgroundColor: '#1c1c1c'
          }}
        >
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon sx={{color: 'white'}}/>
          </IconButton>
        </Toolbar>
        
        <Divider />

        <List >
          <ListItem button onClick={() => {history('/dashboard')}} selected={CurrentPage=='Dashboard'}>
            <ListItemIcon>
              <DashboardIcon sx={{color:'white'}} />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button onClick={() => {history('/token')}} selected={CurrentPage=='Tokens'}>
            <ListItemIcon>
              <PaidIcon sx={{color:'white'}}/>
            </ListItemIcon>
            <ListItemText primary="Tokens" />
          </ListItem>
          <ListItem button onClick={() => {history('/stake')}} selected={CurrentPage=='Stakes'}>
            <ListItemIcon>
              <HowToVoteIcon sx={{color:'white'}}/>
            </ListItemIcon>
            <ListItemText primary="Stakes" />
          </ListItem>
        </List>

      </Drawer>
      
    </div>
  );
};

const mapStateToProps = state => ({
  error: state.auth.error,
});

const mapDispatchToProps = {
  SignOut,
};

export default connect(mapStateToProps, mapDispatchToProps)(Menubar);