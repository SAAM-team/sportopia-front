/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext, useState, Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  Card,
  CardMedia,
  CardActionArea,
  Button,
  CardContent,
  CardActions,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  Typography,
  Grid
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { getInsideBid, addMessage, typing } from '../../reducers/actions';
import { StateContext } from '../../context/global-state';
import SwiftSlider from 'react-swift-slider';
import io from 'socket.io-client';
import cookie from 'react-cookies';
import jwt from 'jsonwebtoken';
import { getProductDetails } from '../../reducers/product-action ';
import './chat.css';
const JWT_SECRET = 'thebestsecrett';

let token = cookie.load('token');
const validateToken = (token) => {
  try {
    let user = jwt.verify(token, JWT_SECRET);
    return user;
  } catch (e) {
    console.log('You have to register100');
  }
};
// get information

let user = validateToken(token);
console.log(user);
export function BiddingRoom(props) {
  let array = props.location.pathname.split('/');
  let productId = array[array.length - 1];
  console.log('props in the bidding-room', props);
  const classes = useStyles();
  // Context

  // State
  const [open, setOpen] = useState(false);
  const [price, setPrice] = useState(0);
  // Functions
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Functions

  let socket = io('https://sportopiav1.herokuapp.com/bidding');
  // let socket = io('http://localhost:8000/bidding');

  function updatePrice(uPrice, productId) {
    console.log('first Step ', uPrice, productId);
    socket.emit('updatePrice', {
      price: uPrice,
      productId: productId
    });
  }

  socket.on('updatePrice', (payload) => {
    setPrice(payload.price.price);
  });

  useEffect(() => {
    props.getInsideBid(productId);
    socket.emit('join', {
      user: user.user_id,
      productId: productId
    });
    socket.on('username', (payload) => {
      let user = document.getElementById('handle');
      user.value = payload;
    });

    socket.on('chat', function (data) {
      let para = document.getElementById('feedback');
      para.innerHTML = '';
      props.addMessage(`${data.handle}:${data.message}`);
    });
  }, []);

  useEffect(() => {
    props.productUB.map((item) => setPrice(item.price));
  }, [props.productUB]);

  socket.on('typing', function (data) {
    let para = document.getElementById('feedback');
    para.innerHTML = '<em>' + data.user + ' is typing a message...</em>';
  });

  const handleSubmit = () => {
    let message = document.getElementById('message');
    let user = document.getElementById('handle');
    socket.emit('chat', {
      message: message.value,
      handle: user.value,
      productId: parseInt(productId)
    });
    if (price < parseInt(message.value)) {
      console.log(message.value);
      setPrice(message.value);
      updatePrice(message.value, productId);
    }
    message.value = '';
  };

  const handleChange = (e) => {
    let user = document.getElementById('handle');
    socket.emit('typing', {
      message: e.target.value,
      productId: productId,
      user: user.value
    });
  };

  return (
    <>
      <Grid
        container
        direction='row'
        justify='space-between'
        alignItems='flex-start'
        xs={12}
        lg={10}
        style={{ marginTop: 0, marginBottom: 0 }}
      >
        <Grid
          container
          direction='column'
          justify='center'
          alignItems='center'
          xs={12}
          lg={6}
        >
          <div id='mario-chat'>
            <div id='chat-window'>
              <div id='output'>
                {props.messages.map((message, index) => {
                  return <p key={index}>{message}</p>;
                })}
              </div>
              <p id='feedback'></p>
            </div>
            <input
              username
              class='input'
              id='handle'
              type='text'
              placeholder='Handle'
            />
            <input
              class='input'
              id='message'
              type='text'
              placeholder='Add Your Price'
              onChange={(e) => handleChange(e)}
            />
            <button onClick={() => handleSubmit()} id='send'>
              Send
            </button>
          </div>
        </Grid>
        <Grid
          container
          direction='column'
          justify='center'
          alignItems='flex-end'
          xs={12}
          lg={6}
        >
          {props.productUB.map((product, index) => {
            return (
              <Grid item xs={12} lg={12}>
                <Card xs={12} lg={12} className={classes.root}>
                  <CardActionArea>
                    <CardMedia
                      className={classes.media}
                      image={product.main_img}
                      title={product.name}
                    />
                    <CardContent>
                      <Typography gutterBottom variant='h5' component='h2'>
                        {product.name}
                      </Typography>
                      <Typography
                        variant='body2'
                        color='textSecondary'
                        component='p'
                        gutterBottom
                      >
                        {product.description}
                      </Typography>
                      <h5>
                        {' '}
                        Price: <span id='price'>{price}</span> $
                      </h5>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button
                      onClick={handleClickOpen}
                      size='small'
                      color='primary'
                    >
                      More Info
                    </Button>
                  </CardActions>
                </Card>
                <Dialog
                  open={open}
                  TransitionComponent={Transition}
                  keepMounted
                  onClose={handleClose}
                  aria-labelledby='alert-dialog-slide-title'
                  aria-describedby='alert-dialog-slide-description'
                >
                  <DialogTitle id='alert-dialog-slide-title'>
                    {'Product Information'}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id='alert-dialog-slide-description'>
                      {product.description}
                    </DialogContentText>
                    <DialogContentText id='alert-dialog-slide-description'>
                      {product.start_time}
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose} color='primary'>
                      OK!
                    </Button>
                  </DialogActions>
                </Dialog>
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </>
  );
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch'
    }
  },
  container: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'space-between'
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center'
  },

  root: {
    maxWidth: 345
  },
  media: {
    height: 250
  }
}));

const mapStateToProps = (state) => {
  return {
    productUB: state.bidding.biddingRoom,
    messages: state.bidding.messages,
    typing: state.bidding.typing
  };
};

const mapDispatchToProps = {
  getInsideBid,
  getProductDetails,
  addMessage,
  typing
};

export default connect(mapStateToProps, mapDispatchToProps)(BiddingRoom);
