import React from 'react';

import { makeStyles } from '@mui/styles';

import MenuIcon from '@mui/icons-material/Menu' ;
import SearchIcon from '@mui/icons-material/Search' ;
import MoreIcon from '@mui/icons-material/More' ;

import {
    AppBar ,
    ToolBar ,
    IconButton ,
    Typography ,
} from '@mui/material' ;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  toolbar: {
    minHeight: 128,
    alignItems: 'flex-start',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    alignSelf: 'flex-end',
  },
}));

const Header = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
      </AppBar>
    </div>
  );
}

export default Header ;