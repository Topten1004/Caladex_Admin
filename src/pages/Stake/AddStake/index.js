

import { useState, useEffect,  useMemo } from 'react';

import swal from 'sweetalert' ;

import { makeStyles } from '@mui/styles';

import {
    Dialog ,
    DialogTitle,
    DialogContent ,
    Box ,
} from '@mui/material' ;

import { AddStake , ConfirmAddStake } from '../../../redux/actions/stake';
import  PropTypes, { func }  from 'prop-types';
import { connect } from 'react-redux';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import { useWeb3React } from "@web3-react/core";
import { CALADEX_ADDR, injected, BLOCK_CONFIRMATION_THRESHOLD } from '../../../constants';
import CALADEX_ABI from '../../../constants/abis/caladex.json';
import { ethers } from 'ethers';
import {
    GetAllTokens,
} from '../../../redux/actions/token';

const useStyles = makeStyles((theme) => ({
    root : {
        "&.MuiDialog-root" : {
            backdropFilter : "blur(4px)" ,
        } ,
        "& .MuiDialogContent-root" : {
            '&::-webkit-scrollbar': {
                width: '0.7em',
            },
            '&::-webkit-scrollbar-track': {
                '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
            },
            '&::-webkit-scrollbar-thumb': {
                backgroundColor: 'lightgray',
                borderRadius : "5px"
            }
        },
        color : "black !important" , 
      
        "& .form-group" : {
            fontSize : "14px"
        } ,
        "& .btn-default" : {
            color : theme.palette.primary.main ,
        },
        "& .btn-default:hover" : {
            color : theme.palette.primary.main ,
            textDecoration : "underline" ,
        }
    } ,
}));


const useCaladexContract = () => {
    const { library, active } = useWeb3React();
  
    return useMemo(() => {
        if (!active) {
          return null;
        }
        return new ethers.Contract(CALADEX_ADDR, CALADEX_ABI, library.getSigner());
    }, [library, active]);
}

const StakeListing = (props) => {

    const { open , handleClose , AddStake , ConfirmAddStake , message, GetAllTokens, tokensData }  = props ;

    let Caladex = useCaladexContract();

    const { active, account, chainId, library, activate } = useWeb3React();

    const classes = useStyles() ;

    useEffect(() => {
        GetAllTokens();
    }, []);

    const [token_id , setTokenID] = useState('') ;
    const [product, setProduct] = useState('');
    const [est_apy, setESTAPY] = useState(0);
    const [finish_date, setFinishDate] = useState('2022-01-22');
    const [is_popular_coin, setPopularCoin] = useState(false);
    const [is_best_for_beginners, setBestForBeginners] = useState(false);
    const [is_new_listing, setNewListing] = useState(false);

    useEffect(() => {
     
        if(message === "IDLE") return ;

        if(message === "SUCCESS") {
            swal({
                title: "SUCCESS",
                text: "Add Stake Successfully!",
                icon: "success",
                timer: 2000,
                button: false
            })
            handleClose() ;  
        }
        if(message === "ERROR"){
            swal({
                title: "ERROR",
                text: "Add Stake Failed!",
                icon: "error",
                timer: 2000,
                button: false
            })
        }
        ConfirmAddStake('IDLE') ;

    } , [message]) ;
    
    const onAddStake = () => {
        const data = {
            token_id : token_id,
            product : product,
            est_apy : est_apy,
            finish_date : finish_date,
            is_popular_coin : is_popular_coin ,
            is_best_for_beginners : is_best_for_beginners ,
            is_new_listing : is_new_listing,
        };
        console.log(data);
        AddStake(data);
    }

    const defaultProps = {
        options: tokensData,
        getOptionLabel: (option) => (option.symbol == 'ETH' ? option.symbol : (option.symbol + ' (' + option.address + ')')),
    };

    return (
        <div >
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className={classes.root}
            >
                <DialogTitle>
                    <Box component={"div"} style={{display:"flex" , justifyContent : "space-between" , alignItems:"center"}}>
                        <Box component={"span"} className="modal-title" style={{width : "300px"}}>Add Stake</Box>
                        <Box component={"button"} type="button" className="close" onClick={handleClose}>&times;</Box>
                    </Box>
                </DialogTitle>
                <DialogContent>
                    <Autocomplete
                        {...defaultProps}
                        id="token"
                        clearOnEscape
                        fullWidth sx={{ m: 1 }}
                        onChange={(e, value) => setTokenID(value)}
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
                        <FormControlLabel control={<Checkbox value={is_popular_coin} onChange={(e)=>setPopularCoin(e.target.checked)} />} label="Popular Coin" />
                        <FormControlLabel control={<Checkbox value={is_best_for_beginners}  onChange={(e)=>setBestForBeginners(e.target.checked)}/>} label="Best For Beginners" />
                        <FormControlLabel control={<Checkbox value={is_new_listing}  onChange={(e)=>setNewListing(e.target.checked)}/>} label="New Listing" />
                    </FormControl>
                    <Box component={"div"} className="modal-footer" style={{display:"flex" , justifyContent:"space-between"}}>
                        <Box component={"button"} className='btn btn-default' onClick={handleClose} >Cancel</Box>
                        <Box component={"button"} className='btn btn-primary btn-md' onClick={() => onAddStake() }>Add</Box>
                    </Box>
                </DialogContent>
            </Dialog>
        </div>
    )
}

StakeListing.propsType = {
    message : PropTypes.string.isRequired ,
    AddStake : PropTypes.func.isRequired ,
}
const mapStateToProps = state => ({
    tokensData: state.token.tokensData,
    message : state.stake.message 
})
const mapDispatchToProps = {
    GetAllTokens,
    AddStake ,
    ConfirmAddStake ,
}
export default connect(mapStateToProps , mapDispatchToProps)(StakeListing) ;