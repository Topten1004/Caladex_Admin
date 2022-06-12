import * as React from 'react';
import { useEffect, useMemo, useState } from 'react';
import { ethers } from 'ethers';
import { connect } from 'react-redux';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Menubar from '../../components/Layouts/Menubar';
import StakeDataTable from '../../components/DataTable/StakeDataTable';

import swal from 'sweetalert' ;
import { 
  Paper,
  InputBase,
  IconButton
 } from '@mui/material';
 import SearchIcon from '@mui/icons-material/Search';
import AddStakeModal from './AddStake';

import {
    GetAllStakes,
    RemoveStake,
    SearchStake,
    SetSelectedStakeID,
} from '../../redux/actions/stake';

import { useNavigate } from 'react-router-dom';

const mdTheme = createTheme();

function StakeContent(props) {

  let history = useNavigate();

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  let {
      stakesData,
      GetAllStakes,
      RemoveStake,
      SearchStake,
      SetSelectedStakeID
  } = props;
  if(stakesData === undefined) stakesData = [];

  useEffect(() => {
    GetAllStakes();
  }, [])

  const removeHandleClick = async (event, id, index) => {
    // await connectToGreetContract();
      const isOk = await swal({
        title: "Are you sure?",
        text: "Are you sure that you want to remove the stake?",
        type: "warning",
        buttons: [
          'No, I am not sure',
          'Yes, I am sure!'
        ],
      }) ;
      if(isOk) {
        RemoveStake(id);
      }
  }
  
  const searchChangeHandler = (event) => {
    SearchStake(event.target.value);
  }

  const stakeHandleClick = (event, id) => {
    if(event.target.className.includes("MuiTableCell-root MuiTableCell-body MuiTableCell-sizeMedium")) {
      SetSelectedStakeID(id);
      history('/stakeinfo');
    }

  }
  
  const tableheader = ["Token", "Product", "EST.APY","Finish Date",  "Action"];

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Menubar 
          CurrentPage = 'Stakes'
        />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Grid sx={{pl: 5, pr: 5, mt:4, mb:4}}>
            <Box display="flex" justifyContent="flex-end">
                <Button variant='contained' color='primary' onClick={handleOpen}>Add Stake</Button>
                <Paper
                    sx={{ ml:3, p: '2px 4px',  display: 'flex', alignItems: 'center', width: 400}}
                  >
                    <InputBase
                      sx={{ ml: 1, flex: 1  }}
                      placeholder="Search Stakes..."
                      onChange={searchChangeHandler}
                    />
                    <IconButton sx={{ p: '10px', }} aria-label="">
                      <SearchIcon />
                    </IconButton>
                </Paper>
            </Box> 
            <StakeDataTable 
                  tableheader = {tableheader}
                  tabledata = {stakesData}
                  removeHandleClick = {removeHandleClick}
                  stakeHandleClick = {stakeHandleClick}
              />
            </Grid>
        </Box>
      </Box>
      <AddStakeModal 
        open = {open}
        handleClose = {handleClose}
      />
    </ThemeProvider>
  );
}

const mapStateToProps = state => ({
    stakesData: state.stake.stakesData,
    error: state.stake.error,
});

const mapDispatchToProps = {
    GetAllStakes,
    RemoveStake,
    SearchStake,
    SetSelectedStakeID,
};

export default connect(mapStateToProps, mapDispatchToProps)(StakeContent);