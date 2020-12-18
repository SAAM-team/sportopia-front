/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { getBiddingItems } from '../../reducers/actions';
import { StateContext } from '../../context/global-state';
import { NavLink, Link } from 'react-router-dom';
import cookies from 'react-cookies';
import { CardHeader, Zoom, Tooltip, Badge } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import FavoriteRoundedIcon from "@material-ui/icons/FavoriteRounded";
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
import Slider from "react-slick";

export function BiddingMain(props) {
  const classes = useStyles();

  // Context
  const { setProductIdBidding } = useContext(StateContext);
  //   States
  const [open, setOpen] = useState(false);

  // Functions
  useEffect(() => {
    props.getBiddingItems();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Save the product id in the cookies
  // const saveProductId = (p_id) => {
  // cookies.save('b_id', p_id);
  // setProductIdBidding(p_id);
  // };

  return (
      <div class="section" style={{marginRight:'20%',marginLeft:'20%',width:'800px'}}>
        <div class="row">
          {props.products.map((product) => {
            return (
            <div class="col-md-4 col-xs-6 centering">
                  <div class="product">
                    <div class="product-img">
                      <img src={product.main_img} style={{height:'300px'}} alt=""></img>
                     
                    </div>
                    <div class="product-body">
                      <h3 class="product-name">
                        <a href="#">{product.name}</a>
                      </h3>
                     
                      <div class="product-rating">
                        {product.description}
                      </div>
                    </div>
                    <div class="add-to-cart">
                     <Link
                      to={() => `/bidding/${product.id}`}
                      params={{ productId: product.id }}
                    >
                      <button class="add-to-cart-btn">
                        <i class="fa fa-shopping-cart"></i>  Enter Bidding Room
                      </button>
                      </Link>
                    </div>
                  </div>
                </div>
            );
          })}
       </div>
       </div>
  );
};
const useStyles = makeStyles((theme) => ({
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

// Functions

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const mapStateToProps = (state) => {
  return {
    products: state.bidding.biddingProducts
  };
};

const mapDispatchToProps = { getBiddingItems };

export default connect(mapStateToProps, mapDispatchToProps)(BiddingMain);
