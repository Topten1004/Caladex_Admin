import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
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
import Menubar from '../../../components/Layouts/Menubar';
import { connect } from 'react-redux';
import { Label } from '@mui/icons-material';
import { BACKEND_URL } from '../../../static/constants';

import swal from 'sweetalert';
import { 
    Button,
    FormLabel
} from '@mui/material';
import  PropTypes, { func }  from 'prop-types';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import {
    UpdateToken,
    ConfirmUpdateToken
} from '../../../redux/actions/token';
import { useNavigate } from 'react-router-dom';
import { isAddress } from 'ethers/lib/utils';

const mdTheme = createTheme();

function TokenInfoContent(props) {
    const navigate = useNavigate();

    const {
        tokensData, 
        selectedID,
        updateMessage,
        ConfirmUpdateToken,
        UpdateToken,
    } = props;

    
    const logoCtrl = useRef(null) ;
    const [name , setTokenName] = useState('');
    const [symbol, setTokenSymbol] = useState('') ;
    const [decimal , setTokenDecimal] = useState(null) ;
    const [pair_type , setTokenPairType] = useState('USDT') ;
    const [address , setTokenAddress] = useState('') ;
    const [logo_url , setTokenLogoUrl] = useState('') ;
    const [website_url , setTokenWebsiteUrl] = useState('') ;
    const [issuer_name , setTokenIssuerName] = useState('') ;
    const [email_address , setEmailAddress] = useState('') ;


    const currentToken = tokensData[selectedID];
    // console.log(props.selectedID);
    
    const validate_email_address = (email_address) => {
        let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{3})+$/;

        return email_address.match(mailformat);
    }

    const validate_token_address = (address) => {
        return (/^(0x){1}[0-9a-fA-F]{40}$/i.test(address));
    }
    
    useEffect( () => {
        
        setTokenName(currentToken.name);
        setTokenSymbol(currentToken.symbol);
        setTokenDecimal(currentToken.decimal);
        setTokenPairType(currentToken.pair_type);
        setTokenAddress(currentToken.address);
        setTokenWebsiteUrl(currentToken.website_url);
        setTokenIssuerName(currentToken.issuer_name);
        setEmailAddress(currentToken.email_address);
     
    }, [tokensData[selectedID]]);

    useEffect(() => {
        console.log(updateMessage);
        if(updateMessage === "IDLE") return ;

        if(updateMessage === "SUCCESS") {
            swal({
                title: "SUCCESS",
                text: "Update Token Successfully!",
                icon: "success",
                timer: 2000,
                button: false
            })
            return;
        }

        if(updateMessage === "ERROR"){
            swal({
                title: "ERROR",
                text: "Update Token Failed!",
                icon: "error",
                timer: 2000,
                button: false
            })
        }
        ConfirmUpdateToken('IDLE') ;

    } , [updateMessage]) ;
    
    const onUpdateToken = () => {
        //    console.log(logoCtrl.current.files[0].name) ;
    
        if(name === "" || symbol === "" || isNaN( Number(decimal) ) || pair_type === "" ||  website_url === "" || issuer_name === "" ){
            swal({
                title: "Empty Error",
                text: "Please, Input all fields!!!",
                icon: "warning",
                timer: 2000,
                button: false
            })
            return ;
        }

        if(!validate_email_address(email_address)) {
            swal({
                title: "Email Warning",
                text: "Invalid Email Format!!!",
                icon: "warning",
                timer: 2000,
                button: false
            })
            return ;
        }
        if(!validate_token_address(address)){
            swal({
                title: "Token Address Error",
                text: "Invalid Token Address Format!!!",
                icon: "warning",
                timer: 2000,
                button: false
            })
            return ;
        }

        // console.log(logoCtrl.current.files[0].name) ;

        // const fn = new FormData() ;

        // fn.append('name' , name) ;
        // fn.append('symbol' , symbol) ;
        // fn.append('decimal' , decimal) ;
        // fn.append('pair_type' , pair_type) ;
        // // fn.append('file' , logoCtrl.current.files[0]) ;
        // fn.append('issuer_name' , issuer_name) ;
        // fn.append('email_address' , email_address) ;
        // fn.append('website_url' , website_url) ;
        // fn.append('address' , address) ;
        // console.log("address:" + address)
        // console.log(fn.decimal);
        const data = {
            name: name,
            symbol: symbol,
            decimal: decimal,
            pair_type: pair_type,
            issuer_name: issuer_name,
            email_address:email_address,
            website_url: website_url,
            address: address
        };

        UpdateToken(currentToken._id, data) ;
    }

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
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>
                {/* Chart */}
                    <Grid item xs={6}>
                        <Paper
                        sx={{
                            p: 5,
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                        >
                            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                <InputLabel htmlFor="name">Token Name</InputLabel>
                                <Input
                                    id="name"
                                    value={name}
                                    onChange={(e) => setTokenName(e.target.value)}
                                    autoComplete='off'
                                />
                            </FormControl>
                            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                <InputLabel htmlFor="symbol">Token Symbol</InputLabel>
                                <Input
                                    id="symbol"
                                    value={symbol}
                                    onChange={(e) => setTokenSymbol(e.target.value)}
                                    autoComplete='off'
                                />
                            </FormControl>
                            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                <InputLabel htmlFor="decimal">Token Decimal</InputLabel>
                                <Input
                                    id="decimal"
                                    value={decimal}
                                    onChange={(e) => setTokenDecimal(e.target.value)}
                                    autoComplete='off'
                                />
                            </FormControl>
                            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                <InputLabel htmlFor="pair_type">Token Pair Type</InputLabel>
                                <Input
                                    id="pair_type"
                                    value={pair_type}
                                    onChange={(e) => setTokenPairType(e.target.value)}
                                    autoComplete='off'
                                />
                            </FormControl>
                            {/* <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                <InputLabel htmlFor="logo">Token Logo</InputLabel>
                                <img src={BACKEND_URL + logo_url} style={{width:30, height:30}}/>
                            </FormControl> */}
                            <FormControl fullWidth sx={{ m: 1 }} variant="standard" >
                                <InputLabel htmlFor="address">Token Address</InputLabel>
                                <Input
                                    id="address"
                                    value={symbol == 'ETH' ? "" : address}
                                    onChange={(e) => setTokenAddress(e.target.value)}
                                    autoComplete='off'
                                    disabled = {symbol == 'ETH' ? true : false}
                                />
                            </FormControl>
                            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                <InputLabel htmlFor="website_url">Token Website URL</InputLabel>
                                <Input
                                    id="website_url"
                                    value={website_url}
                                    onChange={(e) => setTokenWebsiteUrl(e.target.value)}
                                    autoComplete='off'
                                />
                            </FormControl>
                            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                <InputLabel htmlFor="issuer_name">Token Issuer Name</InputLabel>
                                <Input
                                    id="issuer_name"
                                    value={issuer_name}
                                    onChange={(e) => setTokenIssuerName(e.target.value)}
                                    autoComplete='off'
                                />
                            </FormControl>
                            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                <InputLabel htmlFor="email_address">Token Issuer Email Address</InputLabel>
                                <Input
                                    id="email_address"
                                    value={email_address}
                                    onChange={(e) => setEmailAddress(e.target.value)}
                                    autoComplete='off'
                                />
                            </FormControl>
                            <Button variant="contained" color="primary" sx={{ mt:2 }} onClick={() => onUpdateToken()} > Update </Button>
                            <Button variant="contained" color='error' sx={{ mt:2 }}  onClick={() => navigate(-1)}> Return </Button>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
            </Box>
        </Box>
        </ThemeProvider>
    );
}

TokenInfoContent.propsType = {
    updateMessage : PropTypes.string.isRequired ,
    UpdateToken : PropTypes.func.isRequired ,
}
const mapStateToProps = state => ({
    tokensData: state.token.tokensData,
    selectedID: state.token.selectedID,
    updateMessage : state.token.updateMessage ,
    error: state.token.error,
});

const mapDispatchToProps = {
    ConfirmUpdateToken ,
    UpdateToken
};

export default connect(mapStateToProps, mapDispatchToProps)(TokenInfoContent);