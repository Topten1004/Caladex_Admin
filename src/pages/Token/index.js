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
import TokenDataTable from '../../components/DataTable/TokenDataTable';

import { useWeb3React } from "@web3-react/core";
import { CALADEX_ADDR, injected, BLOCK_CONFIRMATION_THRESHOLD } from '../../constants';
import CALADEX_ABI from '../../constants/abis/caladex.json';
import swal from 'sweetalert' ;
import { 
  Paper,
  InputBase,
  IconButton
 } from '@mui/material';
 import SearchIcon from '@mui/icons-material/Search';
import AddTokenModal from './AddToken';

import {
    ApproveToken,
    GetAllTokens,
    DenyToken,
    RemoveToken,
    UploadPdf,
    SearchToken,
    SetSelectedTokenID,
} from '../../redux/actions/token';

import { useNavigate } from 'react-router-dom';

const useCaladexContract = () => {
  const { library, active } = useWeb3React();

  return useMemo(() => {
      if (!active) {
        return null;
      }
      return new ethers.Contract(CALADEX_ADDR, CALADEX_ABI, library.getSigner());
  }, [library, active]);
}

const mdTheme = createTheme();

function TokenContent(props) {

  let history = useNavigate();

  let Caladex = useCaladexContract();

  const { active, account, chainId, library, activate } = useWeb3React();

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  let {
      tokensData,
      GetAllTokens,
      ApproveToken,
      DenyToken,
      RemoveToken,
      UploadPdf,
      SearchToken,
      SetSelectedTokenID
  } = props;
  if(tokensData === undefined) tokensData = [];

  useEffect(() => {
    GetAllTokens();
  }, [])

  const approveHandleClick = async (event, id, index) => {
    // await connectToGreetContract();
    // if(!active) {
    //   swal({
    //     title: "Please connect Wallet",
    //     text: "Click 'Wallet Connect' button to connect you wallet",
    //     icon: "warning",
    //     timer: 3000,
    //     button: false
    //   })
    //   return;
    // }
    ApproveToken(id);
  }

  const denyHandleClick = async (event, id, index) => {
    // await connectToGreetContract();
    // if(tokensData[index].status === 'approved') {
    //   if(!active) {
    //     swal({
    //       title: "Please connect Wallet",
    //       text: "Click 'Wallet Connect' button to connect you wallet",
    //       icon: "warning",
    //       timer: 3000,
    //       button: false
    //     })
    //     return;
    //   }
    //   _denyToken(index);
    // }
    // else
    DenyToken(id); 
  }

  const removeHandleClick = async (event, id, index) => {
    // await connectToGreetContract();
    const isOk = await swal({
      title: "Are you sure?",
      text: "Are you sure that you want to remove the token?",
      type: "warning",
      buttons: [
        'No, I am not sure',
        'Yes, I am sure!'
      ],
    }) ;
    if(!isOk) return;
    // if(tokensData[index].status === 'approved'){
    //   if(!active) {
    //     swal({
    //       title: "Please connect Wallet",
    //       text: "Click 'Wallet Connect' button to connect you wallet",
    //       icon: "warning",
    //       timer: 3000,
    //       button: false
    //     })
    //     return;
    //   }
    //   _removeToken(index);
    // }
    // else
    RemoveToken(id);
  }
  
  const uploadShortVersionHandleClick = async (event, id) => {
    event.stopPropagation();
    console.log(id);
    const formData = new FormData();
    formData.append('file', event.target.files[0]);
    formData.append('type', 'short_version');
    console.log(formData);
    UploadPdf(formData, id);
  }
  
  const uploadLongVersionHandleClick = async (event, id) => {
    console.log(id);
    const formData = new FormData();
    formData.append('file', event.target.files[0]);
    formData.append('type', 'long_version');
    console.log(formData);
    UploadPdf(formData, id);
  }

  const uploadLogoHandleClick = async (event, id) => {
    console.log(id);
    const formData = new FormData();
    formData.append('file', event.target.files[0]);
    formData.append('type', 'long_version');
    console.log(formData);
    // UploadImage(formData, id);
  }

  const searchChangeHandler = (event) => {
    SearchToken(event.target.value);
  }

  const tokenHandleClick = (event, id) => {
    if(event.target.className.includes("MuiTableCell-root MuiTableCell-body MuiTableCell-sizeMedium")) {
      SetSelectedTokenID(id);
      history('/tokeninfo');
    }

  }
  
  const connectToContract = async () => {
    const ethereum = window.ethereum;

    if (!ethereum || typeof ethereum.isMetaMask === "undefined"){
        alert("MetaMask is not installed. Please install MetaMask and try again.");
        return;
    } else {
        console.log("here") ;
        await activate(injected);
    }
  }

  const _approveToken = async (id) => {
    // console.log(id);
    try {
      console.log("3");
        const txReceipt = await Caladex.approve(tokensData[id].name, tokensData[id].symbol, tokensData[id].decimal, tokensData[id].pair_type, tokensData[id].address, tokensData[id].website_url, tokensData[id].logo_url, tokensData[id].issuer_name, tokensData[id].email_address);
        await library.waitForTransaction(txReceipt.hash, BLOCK_CONFIRMATION_THRESHOLD);
        ApproveToken(tokensData[id]._id);
        // await _fetchTokenBalance()
        console.log('success', txReceipt);
    } catch (ex) {
        console.log('tx', ex.transaction);
        console.log('tx', ex);
    }
  }

  const _denyToken = async (id) => {
    try {
      console.log("3");
      
        const txReceipt = await Caladex.removeItem(tokensData[id].address);
        await library.waitForTransaction(txReceipt.hash, BLOCK_CONFIRMATION_THRESHOLD);
        DenyToken(tokensData[id]._id);
        // await _fetchTokenBalance()
        console.log('success', txReceipt);
    } catch (ex) {
        console.log('tx', ex.transaction);
        console.log('tx', ex);
    }
  }

  const _removeToken = async (id) => {
    try {
        const txReceipt = await Caladex.removeItem(tokensData[id].address);
        await library.waitForTransaction(txReceipt.hash, BLOCK_CONFIRMATION_THRESHOLD);
        RemoveToken(tokensData[id]._id);
        // await _fetchTokenBalance()
        console.log('success', txReceipt);
    } catch (ex) {
        console.log('tx', ex.transaction);
        console.log('tx', ex);
    }
  }

  const tableheader = ["Name", "Symbol", "Decimal", "Pair Type", "Logo", "Short Version", "Long Version", "Status",  "Actions"];

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Menubar 
          CurrentPage = 'Tokens'
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
                <Button variant='contained' color='primary' onClick={handleOpen}>Add Token</Button>
                <Paper
                    sx={{ ml:3, p: '2px 4px',  display: 'flex', alignItems: 'center', width: 400}}
                  >
                    <InputBase
                      sx={{ ml: 1, flex: 1  }}
                      placeholder="Search Tokens..."
                      onChange={searchChangeHandler}
                    />
                    <IconButton sx={{ p: '10px', }} aria-label="">
                      <SearchIcon />
                    </IconButton>
                </Paper>
            </Box> 
            <TokenDataTable 
                  tableheader = {tableheader}
                  tabledata = {tokensData}
                  approveHandleClick = {approveHandleClick}
                  denyHandleClick = {denyHandleClick}
                  removeHandleClick = {removeHandleClick}
                  uploadShortVersionHandleClick = {uploadShortVersionHandleClick}
                  uploadLongVersionHandleClick = {uploadLongVersionHandleClick}
                  tokenHandleClick = {tokenHandleClick}
              />
            </Grid>
        </Box>
      </Box>
      <AddTokenModal 
        open = {open}
        handleClose = {handleClose}
      />
    </ThemeProvider>
  );
}

const mapStateToProps = state => ({
    tokensData: state.token.tokensData,
    error: state.token.error,
});

const mapDispatchToProps = {
    GetAllTokens,
    ApproveToken,
    DenyToken,
    RemoveToken,
    UploadPdf,
    SearchToken,
    SetSelectedTokenID,
};

export default connect(mapStateToProps, mapDispatchToProps)(TokenContent);