/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext } from 'react';
import { getRemoteData } from '../../reducers/product-action ';
import { connect } from 'react-redux';
import { StateContext } from '../../context/global-state';
import './products.css';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { CardHeader, Zoom, Tooltip, Badge } from '@material-ui/core';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ShoppingCartRoundedIcon from '@material-ui/icons/ShoppingCartRounded';
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';
import Button from '@material-ui/core/Button';
import { NavLink } from 'react-router-dom';
import Carousel from '../carousel/carousel';
import {
  createCart,
  addToCart,
} from '../../reducers/cart-action';
import {
  createFav,
  addToFav,
} from '../../reducers/favorit-action';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 300,
    // maxHeight:500,
    boxShadow: '0 0 10px 0px rgba(0, 0, 0, 0.25)',
  },
  media: {
    height: 0,
    paddingTop: '100%', // 16:9
  },
  header: {
    height: 175,
    // paddingBottom: '0', // 16:9
    alignItems: 'center',
  },
}));

function Products(props) {
  const classes = useStyles();
  const { setSingleProductId } = useContext(StateContext);
  const selectedProductId = (p_id) => { };

  useEffect(() => {
    props.getRemoteData();
  }, []);

  return (
    <>
      <Carousel />
      {/* <Typography style={{ marginLeft: '45%', marginBottom:'20px', color:'#050505' }} variant="h3" noWrap>
              Products: 
            </Typography> */}
      <section className="container">
        {props.products.map((product) => {
          if (product.quantity) {

            return (
              <Card className={classes.root} key={product.id} >
                <CardMedia
                  className={classes.media}
                  image={product.main_img}
                  title={product.id}
                />
                <CardHeader
                  className={classes.header}
                  title={product.name}
                  subheader={product.description}
                />
                <CardActions disableSpacing>
                  <CardContent>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      price: {product.price}$
                  </Typography>
                    <Typography
                      variant='body2'
                      color='textSecondary'
                      component='p'
                    >
                      Qty: {product.quantity}
                    </Typography>
                  </CardContent>
                  <Tooltip
                    placement="top"
                    arrow
                    TransitionComponent={Zoom}
                    title='add to favorite'
                    onClick={() => {
                      props.createFav(product);
                      props.addToFav(product)
                      // prop(product)

                    }}
                  >
                    <IconButton aria-label="show 4 new mails" color="inherit">
                      <Badge badgeContent={0} color="secondary">
                        <FavoriteRoundedIcon />

                      </Badge>
                    </IconButton>
                  </Tooltip>

                  <Tooltip
                    placement="top"
                    arrow
                    TransitionComponent={Zoom}
                    title='add to cart'
                    onClick={() => {
                      props.createCart(product);
                      props.addToCart(product)
                      // prop(product)

                    }}
                  >
                    <IconButton
                      aria-label='show 4 new mails' color='inherit'
                    >
                      <Badge badgeContent={0} color='secondary'>
                        <ShoppingCartRoundedIcon />
                      </Badge>
                    </IconButton>
                  </Tooltip>
                  <NavLink to={() => `/product/${product.id}`}>
                    <Button variant="contained" color="secondary">
                      Details
                  </Button>
                  </NavLink>
                </CardActions>
              </Card>
            );
          }
        })}
      </section>
    </>
  );
}

const mapStateToProps = (state) => {
  console.log('sssssssssss', state);
  return {
    products: state.products.activeProducts,
  };
};
const mapDispatchToProps = { getRemoteData, createCart, addToCart, createFav, addToFav };


export default connect(mapStateToProps, mapDispatchToProps)(Products);
