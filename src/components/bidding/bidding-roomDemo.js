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
import Slider from "react-slick";

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
var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
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
        style={{ marginTop:'20px', marginBottom: 0 }}
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
        <div class="section" style={{marginRight:'20%',marginLeft:'20%',width:'800px'}}>
        <div class="row">
          {props.productUB.map((product, index) => {
            return (
              <div class="col-md-4 col-xs-6 centering">
                  <div class="product">
                    <div class="product-img">
                     <Slider {...settings}>
                      <img src={product.main_img} style={{height:'300px'}} alt=""></img>
                      <img src={product.images[0]} alt="" />
                       <img src={product.images[1]} alt="" />
                        <img src={product.images[2]} alt="" />
                         </Slider>
                    </div>
                    <div class="product-body">
                      <h3 class="product-name">
                        <a href="#">{product.name}</a>
                      </h3>
                     
                      <div class="product-rating">
                        {product.description}
                      </div>
                      <h5>
                        Price: <span id='price'>{price}</span> $
                      </h5>
                    </div>
                  </div>
                </div>
            );
          })}
           </div>
       </div>
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
