/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext, useState } from 'react';
import {
  CssBaseline,
  Container,
  TextField,
  Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { getInsideBid } from '../../reducers/actions';
import { StateContext } from '../../context/global-state';
import SwiftSlider from 'react-swift-slider';
import io from 'socket.io-client';
import cookie from 'react-cookies';
import jwt from 'jsonwebtoken';
import { getProductDetails } from '../../reducers/product-action ';

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

export function BiddingRoom(props) {
  let array = props.location.pathname.split('/');
  let productId = array[array.length - 1];
  const classes = useStyles();
  // Context
  const [message, setMessages] = useState([]);

  // State

  // Functions

  let socket = io('https://sportopiav1.herokuapp.com/bidding');
  // let socket = io('http://localhost:8000/bidding');
  useEffect(() => {
    props.getInsideBid(productId);
    socket.emit('join', {
      user: user.user_id,
      productId: productId
    });
    socket.on('username', (payload) => {
      console.log('this is the name', payload);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit('chat', {
      message: e.target.elements[0].value,
      handle: user.user_name,
      productId: parseInt(productId)
    });
    socket.on('chat', function (data) {
      console.log('this is the data now', data);
      // message.push(data.message);
      setMessages([...message, data.message]);
      // console.log(message);
    });
    e.target.elements[0].value = '';
  };

  // useEffect(() => {
  //   data.push({
  //     id: 0,
  //     src: props.productUB.main_img
  //   });
  //   props.productUB.images.forEach((image, index) => {
  //     data.push({
  //       id: index + 1,
  //       src: image
  //     });
  //   });
  // }, [props]);

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input type='text' />
        <input type='submit' value='Click' />
      </form>
      {message.map((mess, index) => {
        return (
          <Typography key={index} variant='h1' component='h2'>
            {mess}
          </Typography>
        );
      })}
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch'
    }
  }
}));

const mapStateToProps = (state) => {
  return {
    productUB: state.bidding.biddingRoom
  };
};

const mapDispatchToProps = { getInsideBid, getProductDetails };

export default connect(mapStateToProps, mapDispatchToProps)(BiddingRoom);
