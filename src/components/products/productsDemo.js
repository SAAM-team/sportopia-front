/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext } from 'react';
import { getRemoteData, getProductDetails } from '../../reducers/product-action ';
import { connect } from 'react-redux';
import { StateContext } from '../../context/global-state';
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
// import Carousel from '../carousel/carousel';
import {
  createCart,
  addToCart,
} from '../../reducers/cart-action';
import {

  activeCategory
} from '../../reducers/categories-action';
import {
  createFav,
  addToFav,
} from '../../reducers/favorit-action';
import './css/style.css';
import './css/bootstrap.min.css';
import './css/font-awesome.min.css';
import './css/nouislider.min.css';
import './css/nouislider.min.css';
import './css/slick.css';
// import './css/slick-theme.css';

import cookies from 'react-cookies';
import Slider from "react-slick";
import '../../components/signin.css'

// const useStyles = makeStyles((theme) => ({
//   root: {
//     maxWidth: 300,
//     // maxHeight:500,
//     boxShadow: '0 0 10px 0px rgba(0, 0, 0, 0.25)',
//   },
//   media: {
//     height: 0,
//     paddingTop: '100%', // 16:9
//   },
//   header: {
//     height: 175,
//     // paddingBottom: '0', // 16:9
//     alignItems: 'center',
//   },
// }));

function Products(props) {
  // const classNamees = useStyles();
  console.log('props', props);
  const { setSingleProductId } = useContext(StateContext);
  const selectedProductId = (p_id) => { };

  useEffect(() => {
    props.getRemoteData();
  }, []);
  const saveCategoryId = (id) => {
    cookies.save('cId', id);
    props.activeCategory(id);
  }
  var settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    // slidesToScroll: 1,
    autoplay: true,
  };
  return (
    <>
      <div className="section">

        <div className="container">

          <div className="row">

            <div className="col-md-4 col-xs-6">
              <div className="shop">
                <div className="shop-img">
                  <img src="https://www.thedailymba.com/wp-content/uploads/2020/11/pexels-photo-1061640.jpeg" alt=""></img>
                </div>
                <NavLink color='inherit' to={`/category/2`}
                  onClick={() => {
                    saveCategoryId(props.categories.id);
                    // props.getRemoteData()
                  }}>
                  <div className="shop-body">
                    <h3>Camping<br></br>Collection</h3>
                    <a href="#" className="cta-btn">Shop now <i className="fa fa-arrow-circle-right"></i></a>
                  </div>
                </NavLink>
              </div>
            </div>



            <div className="col-md-4 col-xs-6">
              <div className="shop">
                <div className="shop-img">
                  <img src="https://www.vmcdn.ca/f/files/halifaxtoday/images/outdoors/060420-cottage-dock-fishing-fish-sportfishing-adobestock_242597321.jpeg;w=960" alt=""></img>
                </div>
                <NavLink color='inherit' to={`/category/8`}
                  onClick={() => {
                    saveCategoryId(props.categories.id);
                    // props.getRemoteData()
                  }}>

                  <div className="shop-body">
                    <h3>Fishing<br></br>Collection</h3>
                    <a href="#" className="cta-btn">Shop now <i className="fa fa-arrow-circle-right"></i></a>
                  </div>
                </NavLink>
              </div>
            </div>



            <div className="col-md-4 col-xs-6">
              <div className="shop">
                <div className="shop-img">
                  <img src="https://i2.wp.com/ihearthorses.com/wp-content/uploads/2016/07/Canva-Portrait-of-Female-jockey-and-girl-sitting-horseback-riding-scaled.jpg" alt=""></img>
                </div>
                <NavLink color='inherit' to={`/category/6`}
                  onClick={() => {
                    saveCategoryId(props.categories.id);
                    // props.getRemoteData()
                  }}>
                  <div className="shop-body">
                    <h3>Horse Riding<br></br>Collection</h3>
                    <a href="#" className="cta-btn">Shop now <i className="fa fa-arrow-circle-right"></i></a>
                  </div>
                </NavLink>
              </div>
            </div>

          </div>

        </div>

      </div>
      {/* ....................................................... new products ............................................................. */}
      <div className="section">
        <div className="container">
          <div className="row">

            <div className="col-md-12">
              <div className="section-title">
                <h3 className="title">New Products</h3>

              </div>
            </div>

            <div className="col-md-12">
              <div className="row">
                <div className="products-tabs">
                  <div id="tab1" className="tab-pane active">
                    <div className="products-slick" data-nav="#slick-nav-1">
                      <Slider {...settings}>
                        {props.products.map((product) => {
                          return (

                            <div className="product">
                              <div className="product-img">
                                <img src={product.main_img} style={{ height: '250px' }} alt=""></img>
                                <div className="product-label">
                                  <span className="new">NEW</span>
                                </div>
                              </div>
                              <div className="product-body">
                                <h3 className="product-name" style={{ height: '100px' }}><a href="#">{product.name}</a></h3>
                                <h4 className="product-price">{product.price}$ <del className="product-old-price">{product.price + 50}$</del></h4>
                                <div className="product-rating">
                                  <i className="fa fa-star"></i>
                                  <i className="fa fa-star"></i>
                                  <i className="fa fa-star"></i>
                                  <i className="fa fa-star"></i>
                                  <i className="fa fa-star"></i>
                                </div>
                                <div className="product-btns">
                                  <button onClick={() => {
                                    props.createFav(product);
                                    props.addToFav(product)
                                    // prop(product)

                                  }}
                                    className="add-to-wishlist"
                                    style={{ fontSize: '20px' }}
                                  ><i className="fa fa-heart-o"></i><span className="tooltipp">add to wishlist</span></button>

                                  <button
                                    onClick={() => props.getProductDetails(product.id)}
                                    className="quick-view">
                                    <NavLink style={{ color: '#157A6E', fontSize: '20px' }} to={() => `/product/${product.id}`}>
                                      <i className="fa fa-eye"><br></br>Details</i>

                                      <span className="tooltipp">Details</span>
                                    </NavLink>
                                  </button>

                                </div>
                              </div>
                              <div className="add-to-cart">
                                <button onClick={() => {
                                  props.createCart(product);
                                  props.addToCart(product)
                                  // prop(product)

                                }}
                                  className="add-to-cart-btn" style={{ backgroundColor: '#157A6E', color: ' #FFF' }}><i className="fa fa-shopping-cart"></i> add to cart</button>
                              </div>
                            </div>
                          )
                        })}

                      </Slider>
                    </div>
                    <div id="slick-nav-1" className="products-slick-nav"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  console.log('state', state);
  return {
    products: state.products.results,
    categories: state.categories.results,
    activeProd: state.products.activeProducts
  };
};
const mapDispatchToProps = { getRemoteData, createCart, addToCart, createFav, addToFav, activeCategory, getProductDetails };


export default connect(mapStateToProps, mapDispatchToProps)(Products);
