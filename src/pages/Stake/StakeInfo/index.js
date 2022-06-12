import * as React from 'react';
import { useState, useEffect,  useMemo } from 'react';
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
    UpdateStake,
    ConfirmUpdateStake
} from '../../../redux/actions/stake';
import { useNavigate } from 'react-router-dom';
import InputAdornment from '@mui/material/InputAdornment';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import { useWeb3React } from "@web3-react/core";
import { CALADEX_ADDR, injected, BLOCK_CONFIRMATION_THRESHOLD } from '../../../constants';
import CALADEX_ABI from '../../../constants/abis/caladex.json';
import { ethers } from 'ethers';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {
    GetAllTokens,
} from '../../../redux/actions/token';

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

function StakeInfoContent(props) {
    const navigate = useNavigate();

    const {
        stakesData, 
        selectedID,
        updateMessage,
        ConfirmUpdateStake,
        UpdateStake,
        GetAllTokens,
        tokensData
    } = props;

        
    let Caladex = useCaladexContract();

    const { active, account, chainId, library, activate } = useWeb3React();

    const currentStake = stakesData[selectedID];
    console.log(currentStake.is_popular_coin);
    
    const [token , setToken] = useState(currentStake.token_id) ;
    const [product, setProduct] = useState(currentStake.product);
    const [est_apy, setESTAPY] = useState(currentStake.est_apy);
    const [finish_date, setFinishDate] = useState(currentStake.finish_date.toString().split("T")[0]);
    const [is_popular_coin, setPopularCoin] = useState(currentStake.is_popular_coin);
    const [is_best_for_beginners, setBestForBeginners] = useState(currentStake.is_best_for_beginners);
    const [is_new_listing, setNewListing] = useState(currentStake.is_new_listing);

    // console.log(props.selectedID);
    console.log(is_popular_coin);
    useEffect(() => {
        if(updateMessage === "IDLE") return ;

        if(updateMessage === "SUCCESS") {
            swal({
                title: "SUCCESS",
                text: "Update Stake Successfully!",
                icon: "success",
                timer: 2000,
                button: false
            })
            return;
        }

        if(updateMessage === "ERROR"){
            swal({
                title: "ERROR",
                text: "Update Stake Failed!",
                icon: "error",
                timer: 2000,
                button: false
            })
        }
        ConfirmUpdateStake('IDLE') ;

    } , [updateMessage]) ;
    
    const onUpdateStake = () => {
        //    console.log(logoCtrl.current.files[0].name) ;
        const data = {
            token_id : token._id,
            product : product,
            est_apy : est_apy,
            finish_date : finish_date,
            is_popular_coin : is_popular_coin ,
            is_best_for_beginners : is_best_for_beginners ,
            is_new_listing : is_new_listing,
        };
        
        console.log(data);
        UpdateStake(currentStake._id, data) ;
    }

    const defaultProps = {
        options: tokensData,
        getOptionLabel: (option) => (option.symbol == 'ETH' ? option.symbol : (option.symbol + ' (' + option.address + ')')),
    };

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
                            <Autocomplete
                                {...defaultProps}
                                id="token"
                                clearOnEscape
                                fullWidth sx={{ m: 1 }}
                                value={token}
                                onChange={(e, value) => setToken(value)}
                                renderInput={(params) => (
                                <TextField {...params} label="Token" variant="standard" />
                                )}
                            />
                            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                <InputLabel htmlFor="product">Product</InputLabel>
                                <Input
                                    id="product"
                                    value={product}
                                    onChange={(e) => setProduct(e.target.value)}
                                    autoComplete='off'
                                />
                            </FormControl>
                            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                <InputLabel htmlFor="est_apy">EST.APY</InputLabel>
                                <Input
                                    id="est_apy"
                                    value={est_apy}
                                    onChange={(e) => setESTAPY(e.target.value)}
                                    startAdornment={<InputAdornment position="start">%</InputAdornment>}
                                    autoComplete='off'
                                />
                            </FormControl>
                            {/* <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                <InputLabel htmlFor="finish_date">Finish Date</InputLabel>
                                <Input
                                    id="finish_date"
                                    type='date'
                                    value={finish_date}
                                    onChange={(e) => setFinishDate(e.target.value)}
                                    autoComplete='off'
                                />
                            </FormControl> */}
                            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                { is_popular_coin 
                                    ? <FormControlLabel control={<Checkbox value={is_popular_coin} defaultChecked onChange={(e)=>setPopularCoin(e.target.checked)} />} label="Popular Coin" />
                                    : <FormControlLabel control={<Checkbox value={is_popular_coin} onChange={(e)=>setPopularCoin(e.target.checked)} />} label="Popular Coin" />
                                }
                                { is_best_for_beginners 
                                    ? <FormControlLabel control={<Checkbox value={is_best_for_beginners} defaultChecked onChange={(e)=>setBestForBeginners(e.target.checked)} />} label="Best For Beginners" />
                                    : <FormControlLabel control={<Checkbox value={is_best_for_beginners} onChange={(e)=>setBestForBeginners(e.target.checked)} />} label="Best For Beginners" />
                                }
                                { is_new_listing 
                                    ? <FormControlLabel control={<Checkbox value={is_new_listing} defaultChecked onChange={(e)=>setNewListing(e.target.checked)} />} label="New Listing" />
                                    : <FormControlLabel control={<Checkbox value={is_new_listing} onChange={(e)=>setNewListing(e.target.checked)} />} label="New Listing" />
                                }
                            </FormControl>
                            <Button variant="contained" color="primary" sx={{ mt:2 }} onClick={() => onUpdateStake()} > Update </Button>
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

StakeInfoContent.propsType = {
    updateMessage : PropTypes.string.isRequired ,
    UpdateStake : PropTypes.func.isRequired ,
}
const mapStateToProps = state => ({
    stakesData: state.stake.stakesData,
    tokensData: state.token.tokensData,
    selectedID: state.stake.selectedID,
    updateMessage : state.stake.updateMessage ,
    error: state.stake.error,
});

const mapDispatchToProps = {
    ConfirmUpdateStake ,
    GetAllTokens,
    UpdateStake
};

export default connect(mapStateToProps, mapDispatchToProps)(StakeInfoContent);