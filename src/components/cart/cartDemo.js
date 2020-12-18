/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import {
  getCartAPI,
  updateRemoteCart,
  removeFromCart
} from '../../reducers/cart-action';

import {
  Zoom, Tooltip, Badge,
  Typography
} from '@material-ui/core';
import FavoriteRoundedIcon from "@material-ui/icons/FavoriteRounded";
import IconButton from "@material-ui/core/IconButton";

import { makeStyles } from '@material-ui/core/styles';



const Cart = (props) => {
  useEffect(() => {
    props.getCartAPI();
  }, []);

  return (
    <>
      <Typography style={{ marginTop: "50px", color: "#050505" }} variant='h3' align='center' >
        Cart
      </Typography>
      <div class="section">
        {/* <div class="container"></div> */}
        <div class="row ">
          {props.cartData.cartItem.map((item, idx) => {
            return (
              <div style={{width:'300px'}} class="col-md-4 col-xs-6 centering">
                <div class="product">
                  <div class="product-img">
                    <img src={item.main_img} alt=""></img>
                  </div>
                  <div class="product-body">
                    <h3 class="product-name">
                      <a href="#">{item.name}</a>
                    </h3>
                    <h4 class="product-price">
                      {item.price} <del class="product-old-price">{item.price - 50}</del>
                    </h4>
                    <div class="product-rating">
                      <i class="fa fa-star"></i>
                      <i class="fa fa-star"></i>
                      <i class="fa fa-star"></i>
                      <i class="fa fa-star"></i>
                      <i class="fa fa-star"></i>
                    </div>
                    <div class="product-btns">
                      <button class="add-to-wishlist">
                        <i class="fa fa-heart-o"></i>
                        <span class="tooltipp">add to wishlist</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

    </>
  );
};

const mapStateToProps = (state) => {
  return {
    cartData: state.cartData
  };
};

const mapDispatchToProps = {
  getCartAPI,
  removeFromCart
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
