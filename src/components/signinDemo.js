import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import background from "./header/assets/onlineShopping.png";

import {
  Avatar,
  Card,
  CardContent,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Link,
  Typography,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  Radio,
  RadioGroup,
  FormControlLabel
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import { makeStyles } from '@material-ui/core/styles';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import { StateContext } from '../context/global-state';
import '../components/signin.css'
// import signinGoogle from '../components/header/signinGoogle.png.' 
// import signUpGoogle from '../../src/components/header/assets/signUpGoogle.png.'
// import fbLogin from '../../src/components/header/assets/fbLogin.png.'
// import fbSignUpp from '../../src/components/header/assets/fbSignUpp.png.'

export default function SignIn() {
  // ContextState

  const stateContext = useContext(StateContext);
  const history = useHistory();

  // States
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [telephone, setTelephone] = useState('');
  const [companyName, setComapnyName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');

  const [logged, setLoginState] = useState(false);
  const [register, setRegister] = useState(false);
  const [registerBuyer, setRegisterBuyer] = useState(false);
  const [open, setOpen] = useState(false);

  // Functions

  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const responseGoogle = (response) => {
    console.log(response);
  };
  const responseFacebook = (response) => {
    console.log(response);
  };

  async function handleSignIn(event) {
    event.preventDefault();
    stateContext.login(username, password);
    if (!stateContext.error) history.push('/');
  }
  async function handleSignUp(event, role) {
    event.preventDefault();
    const objBody = {
      username: username,
      password: password,
      role: role,
      companyname: companyName,
      firstname: firstName,
      lastname: lastName,
      adress: address,
      gender: gender,
      telephone: telephone
    };
    stateContext.register(objBody);
  }

  return (
    <>
    <div style={{ backgroundImage: `url(${background})` }}>
    <div style={{padding:'50px', marginLeft:'-65%'}}>
      <Container align='left' component='main' maxWidth='xs'>
        {register ? (
          <Card style={{backgroundColor:'#1e1f29c0'}}>
            <CardContent>
              <CssBaseline />
              <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component='h1' variant='h4'>
                  Sign Up
                </Typography>
                <Link
                  component='button'
                  onClick={() => {
                    setRegister(!register);
                  }}
                  style={{fontSize:'20px', color:'#157A6E', marginBottom: '0%', marginTop: '5%' }}
                >
                  Existing User? Sign In here!
                </Link>

                <form className={classes.form}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Button
                        style={{ minHeight: 50 }}
                        type='button'
                        fullWidth
                        variant='contained'
                        color='#157A6E'
                        className={classes.submit}
                        onClick={() => {
                          setRegisterBuyer(true);
                          handleClickOpen();
                        }}
                      >
                        Buyer
                      </Button>
                    </Grid>
                    <Dialog
                      open={open}
                      onClose={handleClose}
                      aria-labelledby='form-dialog-title'
                    >
                      <DialogTitle id='form-dialog-title'>
                        {registerBuyer
                          ? 'Sign Up as a Buyer'
                          : 'Sign Up as a Seller'}
                      </DialogTitle>
                      <DialogContent>
                        {registerBuyer ? (
                          <form className={classes.form}>
                            <Grid
                              container
                              spacing={1}
                              style={{
                                marginBottom: 20
                              }}
                            >
                              <Grid item xs={2} sm={2.7}></Grid>
                              <Grid item xs={1} sm={5}>
                                <GoogleLogin
                                  clientId='1017961095121-u3na2ktuf9i8m0s7ndq0l9ishqpsbfst.apps.googleusercontent.com'
                                  buttonText='Signup'
                                  onSuccess={responseGoogle}
                                  onFailure={responseGoogle}
                                  cookiePolicy={'single_host_origin'}
                                  style={{
                                    borderRightWidth: 1,
                                    borderRightColor: 'black',
                                    borderRadius: '5px'
                                  }}
                                />
                              </Grid>
                              <Grid item xs={1} sm={4}>
                                <FacebookLogin
                                  appId='562118384400275'
                                  fields='name,username,picture'
                                  scope='public_profile,user_friends'
                                  callback={responseFacebook}
                                  icon='fa-facebook'
                                  textButton='SignUp'
                                  size='small'
                                />
                              </Grid>
                            </Grid>
                            <Grid container spacing={2}>
                              <Grid item xs={12} sm={6}>
                                <TextField
                                  name='userName'
                                  variant='outlined'
                                  required
                                  fullWidth
                                  id='userName'
                                  label='User Name'
                                  onChange={(e) => setUsername(e.target.value)}
                                  autoFocus
                                />
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                <TextField
                                  type='password'
                                  variant='outlined'
                                  required
                                  fullWidth
                                  onChange={(e) => setPassword(e.target.value)}
                                  id='password'
                                  label='Password'
                                  name='password'
                                />
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                <TextField
                                  name='firstName'
                                  variant='outlined'
                                  required
                                  fullWidth
                                  id='firstName'
                                  label='First Name'
                                  onChange={(e) => setFirstName(e.target.value)}
                                  autoFocus
                                />
                              </Grid>
                              <Grid item xs={2} sm={6}>
                                <TextField
                                  variant='outlined'
                                  required
                                  fullWidth
                                  onChange={(e) => setLastName(e.target.value)}
                                  id='lastName'
                                  label='Last Name'
                                  name='lastName'
                                />
                              </Grid>
                              <Grid item xs={2} sm={12}>
                                <TextField
                                  variant='outlined'
                                  required
                                  fullWidth
                                  onChange={(e) => setAddress(e.target.value)}
                                  id='address'
                                  label='Address'
                                  name='address'
                                />
                              </Grid>
                              <Grid item xs={2} sm={8}>
                                <RadioGroup
                                  row
                                  aria-label='gender'
                                  name='gender1'
                                  value={gender}
                                  onChange={(e) => setGender(e.target.value)}
                                >
                                  <FormControlLabel
                                    value='female'
                                    control={<Radio />}
                                    label='Female'
                                  />
                                  <FormControlLabel
                                    value='male'
                                    control={<Radio />}
                                    label='Male'
                                  />
                                  <FormControlLabel
                                    value='other'
                                    control={<Radio />}
                                    label='Other'
                                  />
                                </RadioGroup>
                              </Grid>
                              <Grid item xs={2} sm={4}>
                                <TextField
                                  variant='outlined'
                                  required
                                  fullWidth
                                  onChange={(e) => setTelephone(e.target.value)}
                                  id='telephone'
                                  label='Telephone'
                                  name='telephone'
                                />
                              </Grid>
                            </Grid>
                            <Button
                              type='submit'
                              fullWidth
                              variant='contained'
                              color='primary'
                              className={classes.submit}
                              onClick={(event) => handleSignUp(event, 'buyer')}
                            >
                              Sign Up
                            </Button>
                            <Typography
                              style={{ fontSize: 15 }}
                              component='h5'
                              variant='h5'
                            >
                              {stateContext.success
                                ? stateContext.success
                                : stateContext.error}
                            </Typography>
                          </form>
                        ) : (
                          <form className={classes.form}>
                            <Grid container spacing={2}>
                              <Grid item xs={12} sm={6}>
                                <TextField
                                  name='userName'
                                  variant='outlined'
                                  required
                                  fullWidth
                                  id='userName'
                                  label='User Name'
                                  onChange={(e) => setUsername(e.target.value)}
                                  autoFocus
                                />
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                <TextField
                                  type='password'
                                  variant='outlined'
                                  required
                                  fullWidth
                                  onChange={(e) => setPassword(e.target.value)}
                                  id='password'
                                  label='Password'
                                  name='password'
                                />
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                <TextField
                                  name='companyName'
                                  variant='outlined'
                                  required
                                  fullWidth
                                  id='companyName'
                                  label='Company Name'
                                  onChange={(e) =>
                                    setComapnyName(e.target.value)
                                  }
                                  autoFocus
                                />
                              </Grid>
                              <Grid item xs={2} sm={6}>
                                <TextField
                                  variant='outlined'
                                  required
                                  fullWidth
                                  onChange={(e) => setTelephone(e.target.value)}
                                  id='telephone'
                                  label='Telephone'
                                  name='telephone'
                                />
                              </Grid>
                              <Grid item xs={2} sm={12}>
                                <TextField
                                  variant='outlined'
                                  required
                                  fullWidth
                                  onChange={(e) => setAddress(e.target.value)}
                                  id='address'
                                  label='Address'
                                  name='address'
                                />
                              </Grid>
                            </Grid>
                            <Button
                              type='submit'
                              fullWidth
                              variant='contained'
                              color='primary'
                              className={classes.submit}
                              onClick={(event) => handleSignUp(event, 'seller')}
                            >
                              Sign Up
                            </Button>
                          </form>
                        )}
                      </DialogContent>
                    </Dialog>
                    <Grid item xs={12} sm={6}>
                      <Button
                        style={{ minHeight: 50 }}
                        type='button'
                        fullWidth
                        variant='contained'
                        color='#157A6E'
                        className={classes.submit}
                        onClick={() => {
                          setRegisterBuyer(false);
                          handleClickOpen();
                        }}
                      >
                        Seller
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </div>
              <Box mt={5}></Box>
            </CardContent>
          </Card>
        ) : (
          <Card style={{backgroundColor:'#1e1f29c0'}}>
            <CardContent>
              <CssBaseline />
              <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                  <LockOpenOutlinedIcon />
                </Avatar>
                <Typography
                  style={{color:'black' }}
                 component='h1' variant='h4'>
                  Sign In
                </Typography>
                
                <Link
                  component='button'
                  onClick={() => {
                    setRegister(true);
                  }}
                  style={{ fontSize:'20px', color:'black', marginBottom: '10%', marginTop: '5%' }}
                >
                  New User? Sign up here!
                </Link>
                <Grid container spacing={1}>
                  <Grid item xs={2} sm={2.7}></Grid>
                  <Grid item xs={1} sm={5}>
                    <GoogleLogin
                      clientId='1017961095121-u3na2ktuf9i8m0s7ndq0l9ishqpsbfst.apps.googleusercontent.com'
                      buttonText='Login'
                      onSuccess={responseGoogle}
                      onFailure={responseGoogle}
                      cookiePolicy={'single_host_origin'}
                    />
                  </Grid>
                  <Grid item xs={1} sm={4}>
                    <FacebookLogin
                      appId='562118384400275'
                      fields='name,username,picture'
                      scope='public_profile,user_friends'
                      callback={responseFacebook}
                      icon='fa-facebook'
                      textButton='Login'
                      size='small'
                    />
                  </Grid>
                </Grid>
                <Typography component='h1' variant='h5'>
                  Or
                </Typography>
                <form className={classes.form}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        name='userName'
                        variant='outlined'
                        required
                        fullWidth
                        id='userName'
                        label='User Name'
                        onChange={(e) => setUsername(e.target.value)}
                        autoFocus
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        type='password'
                        variant='outlined'
                        required
                        fullWidth
                        onChange={(e) => setPassword(e.target.value)}
                        id='password'
                        label='Password'
                        name='password'
                      />
                    </Grid>
                  </Grid>
                  <Button
                    type='submit'
                    fullWidth
                    variant='contained'
                    color='primary'
                    className={classes.submit}
                    onClick={(event) => handleSignIn(event)}
                  >
                    Sign In
                  </Button>
                </form>
                <Typography
                  style={{ color: 'red', fontSize: 15 }}
                  component='h5'
                  variant='h5'
                >
                  {stateContext.error}
                </Typography>
              </div>
              <Box mt={5}></Box>
            </CardContent>
          </Card>
        )}
      </Container>
      </div>
      </div>
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#157A6E'
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor:'#157A6E'
  }
}));
