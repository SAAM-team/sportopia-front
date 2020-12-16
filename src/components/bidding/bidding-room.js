/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext } from 'react';
import { CssBaseline, Container } from '@material-ui/core';
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

let proURL = window.location.href.split('/');
let productId = [proURL.length - 1];
let user = validateToken(token);

const data = [
  {
    id: '1',
    src:
      'https://media.mfbproject.co.za/repos/2017_alfa-romeo_stelvio_leaked_02.jpg'
  },
  {
    id: '2',
    src:
      'https://media.mfbproject.co.za/repos/2017_alfa_romeo_stelvioquadrifoglio_official_09.jpg'
  },
  {
    id: '3',
    src:
      'https://media.mfbproject.co.za/repos/2018-alfa-romeo-stelvio-quadrifoglio-specs-photos-speed-2.jpg'
  },
  {
    id: '4',
    src:
      'https://media.mfbproject.co.za/repos/alfa-romeo-giulia-quadrifoglio-2017-us-wallpapers-and-hd-images-13.jpg'
  },
  {
    id: '5',
    src:
      'https://media.mfbproject.co.za/repos/ARWP_Infra_Desk_1920_1080_Quad.png'
  }
];

export function BiddingRoom(props) {
  console.log('props inside the biiding room', props.product);
  // Context
  const { productIdBidding } = useContext(StateContext);

  // State

  // Functions

  let socket = io('https://sportopiav1.herokuapp.com/bidding');
  useEffect(() => {
    props.getProductDetails(productId);
    socket.emit('join', {
      user: user.user_id,
      productId: productId
    });
    socket.on('username', (payload) => {
      console.log('this is the name', payload);
    });
  }, []);

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
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth='sm'>
        <SwiftSlider
          data={data}
          interval={3000}
          showDots={false}
          enableNextAndPrev={false}
        />
      </Container>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    productUB: state.bidding.biddingRoom,
    product: state.products.selectedProduct
  };
};

const mapDispatchToProps = { getInsideBid, getProductDetails };

export default connect(mapStateToProps, mapDispatchToProps)(BiddingRoom);
