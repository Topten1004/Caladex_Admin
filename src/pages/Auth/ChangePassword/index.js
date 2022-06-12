import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { connect } from 'react-redux';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Menubar from '../../../components/Layouts/Menubar';
import Paper from '@mui/material/Paper';
import Toolbar from '@mui/material/Toolbar';
import { 
  ChangePassword,
  ConfirmChangePassword
} from '../../../redux/actions/auth';
import swal from 'sweetalert';

const mdTheme = createTheme();

function ChangePasswordContent(props) {
  console.log(props.user_id);

  const {
    message,
    ConfirmChangePassword
  }  = props;

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const user = {
      _id : props.user_id,
      old_password: data.get('old_password'),
      password: data.get('password'),
      password_confirmation: data.get('password_confirmation')
    };
    props.ChangePassword(user);
  };


  
  useEffect(() => {
     console.log(message);
    if(message === "IDLE") return ;

    if(message === "SUCCESS") {
        swal({
            title: "SUCCESS",
            text: "Password Changed Successfully!",
            icon: "success",
            timer: 2000,
            button: false
        })
    }
    if(message === "ERROR"){
        swal({
            title: "ERROR",
            text: "Change Password Failed!",
            icon: "error",
            timer: 2000,
            button: false
        })
    }
    ConfirmChangePassword('IDLE') ;

  } , [message]) ;

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Menubar 
          CurrentPage = ''
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
          <Container maxWidth="lg" sx={{ mt: 10, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Chart */}
              <Grid item style={{width: '400px'}}>
                <Paper 
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <Typography component="h1" variant="h5">
                    Change Password
                  </Typography>
                  <Box component="form"  onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="old_password"
                      label="Old Password"
                      name="old_password"
                      autoComplete="off"
                      autoFocus
                    />
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="off"
                    />
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="password_confirmation"
                      label="Confirm Password"
                      type="password"
                      id="password_confirmation"
                      autoComplete="off"
                    />
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Change Password
                    </Button>
                  </Box>

                </Paper>

              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user_id: state.auth.user_id,
  access_token: state.auth.access_token,
  userdata: state.auth.userdata,
  error: state.auth.error,
  message: state.auth.message
});

const mapDispatchToProps = {
  ChangePassword,
  ConfirmChangePassword
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePasswordContent);