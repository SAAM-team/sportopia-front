/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext, useState } from 'react';
import { connect } from 'react-redux';
import InnerImageZoom from 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Button } from '@material-ui/core';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Nouislider from 'nouislider-react';
import $ from 'jquery';
import ScriptTag from 'react-script-tag';
import { NavLink } from 'react-router-dom';
import {
  getRemoteData,
  activeCategory,
} from '../../reducers/categories-action';
// import 'https://fonts.googleapis.com/css?family=Montserrat:400,500,700';
import './css/bootstrap.min.css';
import './css/slick.css';
import './css/slick-theme.css';
import './css/nouislider.min.css';
import './css/font-awesome.min.css';
import './css/style.css';
import Slider from "react-slick";

import {
  getProductDetails,
  buyUsingPaypal,
} from '../../reducers/product-action ';

export function ProductDetails(props) {
  const classes = useStyles();
  console.log('props inside the one product page', props);
  // Context

  // State
  const [maniImage, setMainImage] = useState('');
  const [counter, setCounter] = useState(0);
  const [open, setOpen] = React.useState(false);
  // const [redirect, setRedirect] = useState('');

  // Functions
let releated =[];
// console.log(props.selectedProduct,'props.selectedProduct');
 props.allProducts.map((product)=>{
  if(props.selectedProduct[0].category_id === product.category_id){
releated.push(product)
  }
})
console.log(releated);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  // setMainImage(props.selectedProduct.main_img);
  // props.selectedProduct.main_img
 useEffect(() => {
    props.getRemoteData();
  }, []);

  useEffect(() => {
    props.selectedProduct.map((item) => setMainImage(item.main_img));
  }, [props.selectedProduct]);
 var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
    <>
      <ScriptTag
        isHydrating={true}
        type="text/javascript"
        src="./js/main.js"
      />
      <ScriptTag
        isHydrating={true}
        type="text/javascript"
        src="./js/jquery.min.js"
      />
      
        <div className="section" style={{fontSize:'20px'}}>
          {props.selectedProduct.map((product) => {
            return (
              <div className="container" key={product.name}>
                <div className="row">
                  <div className="col-md-5 col-md-push-2">
                    <div id="product-main-img">
                       <Slider {...settings}>
                      <div className="product-preview">
                        <img
                          src={product.main_img}
                        />
                      </div>

                      <div className="product-preview">
                        <img src={product.images[0]} alt="" />
                      </div>

                      <div className="product-preview">
                        <img src={product.images[1]} alt="" />
                      </div>

                      <div className="product-preview">
                        <img src={product.images[2]} alt="" />
                      </div>
                     </Slider>
                    </div>
                  </div>

                  <div className="col-md-2 col-md-pull-5">
                    <div id="product-imgs">
                      <div className="product-preview">
                        <img src={product.images[0]} alt="" />
                      </div>

                      <div className="product-preview">
                        <img src={product.images[1]} alt="" />
                      </div>

                      <div className="product-preview">
                        <img src={product.images[2]} alt="" />
                      </div>
                    </div>
                  </div>

                  <div className="col-md-5">
                    <div className="product-details">
                      <h2 className="product-name">{product.name}</h2>
                      <div>
                        <div className="product-rating">
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star-o"></i>
                        </div>
                        <a className="review-link" href="#">
                          10 Review(s) | Add your review
                        </a>
                      </div>
                      <div>
                        <h3 className="product-price">
                          {product.price}$
                          <del className="product-old-price">
                            {product.price + 50}$
                          </del>
                        </h3>
                        <span className="product-available">
                          In Stock{product.quantity}
                        </span>
                      </div>
                      <p>
                        {product.description}
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit, sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua. Ut enim ad minim veniam, quis
                        nostrud exercitation ullamco laboris nisi ut aliquip ex
                        ea commodo consequat.
                      </p>

                      

                      <div className="add-to-cart">
                        <div className="qty-label">
                          Qty
                          <div className="input-number">
                            <ButtonGroup
                              size="medium"
                              style={{ height: 40}}
                              aria-label="small outlined button group"
                            >
                              <Button onClick={() => setCounter(counter + 1)}>
                                +
                              </Button>
                              <Button disabled>{counter}</Button>
                              <Button
                                onClick={() => {
                                  if (counter > 0) {
                                    setCounter(counter - 1);
                                  }
                                }}
                              >
                                -
                              </Button>
                            </ButtonGroup>
                          </div>
                        </div>
                         <Button
                         className="add-to-cart-btn"
              onClick={() => {
                handleOpen();
                props.buyUsingPaypal(product.id, counter);
              }}
              variant="contained"
            >
              buy now
            </Button>
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
             
              open={open}
              onClose={handleClose}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={open} >
                <div className={classes.paper}>
                  <h2 id="transition-modal-title">Confirmation </h2>
                  <a href={props.redirect} id="transition-modal-description">
                    Click Here To Proceed
                  </a>
                </div>
              </Fade>
            </Modal>                      
                      </div>

                      <ul className="product-btns">
                        <li>
                          <a href="#">
                            <i className="fa fa-heart-o"></i> add to wishlist
                          </a>
                        </li>
                        
                      </ul>

                     

                    
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div id="product-tab">
                      <ul className="tab-nav">
                        <li className="active">
                          <a data-toggle="tab" href="#tab1">
                            Description
                          </a>
                        </li>
                        {/* <li>
                          <a data-toggle="tab" href="#tab2">
                            Details
                          </a>
                        </li>
                        <li>
                          <a data-toggle="tab" href="#tab3">
                            Reviews (3)
                          </a>
                        </li> */}
                      </ul>

                      <div className="tab-content">
                        <div id="tab1" className="tab-pane fade in active">
                          <div className="row">
                            <div className="col-md-12">
                              <p>
                              {product.description}
                                Lorem ipsum dolor sit amet, consectetur
                                adipisicing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut
                                enim ad minim veniam, quis nostrud exercitation
                                ullamco laboris nisi ut aliquip ex ea commodo
                                consequat. Duis aute irure dolor in
                                reprehenderit in voluptate velit esse cillum
                                dolore eu fugiat nulla pariatur. Excepteur sint
                                occaecat cupidatat non proident, sunt in culpa
                                qui officia deserunt mollit anim id est laborum.
                              </p>
                            </div>
                          </div>
                        </div>

                        <div id="tab2" className="tab-pane fade in">
                          <div className="row">
                            <div className="col-md-12">
                              <p>
                              {product.description}
                                Lorem ipsum dolor sit amet, consectetur
                                adipisicing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut
                                enim ad minim veniam, quis nostrud exercitation
                                ullamco laboris nisi ut aliquip ex ea commodo
                                consequat. Duis aute irure dolor in
                                reprehenderit in voluptate velit esse cillum
                                dolore eu fugiat nulla pariatur. Excepteur sint
                                occaecat cupidatat non proident, sunt in culpa
                                qui officia deserunt mollit anim id est laborum.
                              </p>
                            </div>
                          </div>
                        </div>

                        <div id="tab3" className="tab-pane fade in">
                          <div className="row">
                            <div className="col-md-3">
                              <div id="rating">
                                <div className="rating-avg">
                                  <span>4.5</span>
                                  <div className="rating-stars">
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star-o"></i>
                                  </div>
                                </div>
                                <ul className="rating">
                                  <li>
                                    <div className="rating-stars">
                                      <i className="fa fa-star"></i>
                                      <i className="fa fa-star"></i>
                                      <i className="fa fa-star"></i>
                                      <i className="fa fa-star"></i>
                                      <i className="fa fa-star"></i>
                                    </div>
                                    <div className="rating-progress">
                                      <div style={{ width: '80%' }}></div>
                                    </div>
                                    <span className="sum">3</span>
                                  </li>
                                  <li>
                                    <div className="rating-stars">
                                      <i className="fa fa-star"></i>
                                      <i className="fa fa-star"></i>
                                      <i className="fa fa-star"></i>
                                      <i className="fa fa-star"></i>
                                      <i className="fa fa-star-o"></i>
                                    </div>
                                    <div className="rating-progress">
                                      <div style={{ width: '60%' }}></div>
                                    </div>
                                    <span className="sum">2</span>
                                  </li>
                                  <li>
                                    <div className="rating-stars">
                                      <i className="fa fa-star"></i>
                                      <i className="fa fa-star"></i>
                                      <i className="fa fa-star"></i>
                                      <i className="fa fa-star-o"></i>
                                      <i className="fa fa-star-o"></i>
                                    </div>
                                    <div className="rating-progress">
                                      <div></div>
                                    </div>
                                    <span className="sum">0</span>
                                  </li>
                                  <li>
                                    <div className="rating-stars">
                                      <i className="fa fa-star"></i>
                                      <i className="fa fa-star"></i>
                                      <i className="fa fa-star-o"></i>
                                      <i className="fa fa-star-o"></i>
                                      <i className="fa fa-star-o"></i>
                                    </div>
                                    <div className="rating-progress">
                                      <div></div>
                                    </div>
                                    <span className="sum">0</span>
                                  </li>
                                  <li>
                                    <div className="rating-stars">
                                      <i className="fa fa-star"></i>
                                      <i className="fa fa-star-o"></i>
                                      <i className="fa fa-star-o"></i>
                                      <i className="fa fa-star-o"></i>
                                      <i className="fa fa-star-o"></i>
                                    </div>
                                    <div className="rating-progress">
                                      <div></div>
                                    </div>
                                    <span className="sum">0</span>
                                  </li>
                                </ul>
                              </div>
                            </div>

                            <div className="col-md-6">
                              <div id="reviews">
                                <ul className="reviews">
                                  <li>
                                    <div className="review-heading">
                                      <h5 className="name">John</h5>
                                      <p className="date">
                                        27 DEC 2018, 8:0 PM
                                      </p>
                                      <div className="review-rating">
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star-o empty"></i>
                                      </div>
                                    </div>
                                    <div className="review-body">
                                      <p>
                                        Lorem ipsum dolor sit amet, consectetur
                                        adipisicing elit, sed do eiusmod tempor
                                        incididunt ut labore et dolore magna
                                        aliqua
                                      </p>
                                    </div>
                                  </li>
                                  <li>
                                    <div className="review-heading">
                                      <h5 className="name">John</h5>
                                      <p className="date">
                                        27 DEC 2018, 8:0 PM
                                      </p>
                                      <div className="review-rating">
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star-o empty"></i>
                                      </div>
                                    </div>
                                    <div className="review-body">
                                      <p>
                                        Lorem ipsum dolor sit amet, consectetur
                                        adipisicing elit, sed do eiusmod tempor
                                        incididunt ut labore et dolore magna
                                        aliqua
                                      </p>
                                    </div>
                                  </li>
                                  <li>
                                    <div className="review-heading">
                                      <h5 className="name">John</h5>
                                      <p className="date">
                                        27 DEC 2018, 8:0 PM
                                      </p>
                                      <div className="review-rating">
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star-o empty"></i>
                                      </div>
                                    </div>
                                    <div className="review-body">
                                      <p>
                                        Lorem ipsum dolor sit amet, consectetur
                                        adipisicing elit, sed do eiusmod tempor
                                        incididunt ut labore et dolore magna
                                        aliqua
                                      </p>
                                    </div>
                                  </li>
                                </ul>
                                <ul className="reviews-pagination">
                                  <li className="active">1</li>
                                  <li>
                                    <a href="#">2</a>
                                  </li>
                                  <li>
                                    <a href="#">3</a>
                                  </li>
                                  <li>
                                    <a href="#">4</a>
                                  </li>
                                  <li>
                                    <a href="#">
                                      <i className="fa fa-angle-right"></i>
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </div>

                            <div className="col-md-3">
                              <div id="review-form">
                                <form className="review-form">
                                  <input
                                    className="input"
                                    type="text"
                                    placeholder="Your Name"
                                  />
                                  <input
                                    className="input"
                                    type="email"
                                    placeholder="Your Email"
                                  />
                                  <textarea
                                    className="input"
                                    placeholder="Your Review"
                                  ></textarea>
                                  <div className="input-rating">
                                    <span>Your Rating: </span>
                                    <div className="stars">
                                      <input
                                        id="star5"
                                        name="rating"
                                        value="5"
                                        type="radio"
                                      />
                                      <label ></label>
                                      <input
                                        id="star4"
                                        name="rating"
                                        value="4"
                                        type="radio"
                                      />
                                      <label ></label>
                                      <input
                                        id="star3"
                                        name="rating"
                                        value="3"
                                        type="radio"
                                      />
                                      <label ></label>
                                      <input
                                        id="star2"
                                        name="rating"
                                        value="2"
                                        type="radio"
                                      />
                                      <label ></label>
                                      <input
                                        id="star1"
                                        name="rating"
                                        value="1"
                                        type="radio"
                                      />
                                      <label ></label>
                                    </div>
                                  </div>
                                  <button className="primary-btn">
                                    Submit
                                  </button>
                                </form>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="section">
          <div  className="container">
            <div className="row" style={{ justifyContent: "center"}}>
              <div className="col-md-12">
                <div className="section-title text-center">
                  <h3 className="title">Related Products</h3>
                </div>
              </div>

              {releated.map((item,index)=>{
                if(index<4){

                return(
              <div  key={item.name} className="col-md-3 col-xs-6">

                <div className="product">
                  <div className="product-img">
                    <img src={item.main_img} alt={item.name} />
                    <div className="product-label">
                      <span className="sale">-30%</span>
                    </div>
                  </div>
                  <div className="product-body">
                    <h3 className="product-name">
                      <a href="#">{item.name}</a>
                    </h3>
                    <h4 className="product-price">
                      {item.price}$ <del className="product-old-price">{item.price+50}$</del>
                    </h4>
                    <div className="product-rating"></div>
                    <div className="product-btns">
                      <button className="add-to-wishlist">
                        <i className="fa fa-heart-o"></i>
                        <span className="tooltipp">add to wishlist</span>
                      </button>
                      <button className="add-to-compare">
                        <i className="fa fa-exchange"></i>
                        <span className="tooltipp">add to compare</span>
                      </button>
                       {/* <NavLink to={() => `/product/${item.id}`}>
                  <Button
                  className="quick-view"
                    onClick={() => props.getProductDetails(item.id)}
                    variant="contained"
                  >
                  <i className="fa fa-eye"></i>
                  <span className="tooltipp">quick view</span>
                    
                  </Button>
                </NavLink> */}
                      {/* <button className="quick-view">
                        
                      </button> */}
                    </div>
                  </div>
                  <div className="add-to-cart">
                 <NavLink to={() => `/product/${item.id}`}>
                    <button  onClick={() => props.getProductDetails(item.id)} className="add-to-cart-btn">
                      <i className="fa fa-shopping-cart"></i> Details
                    </button>
                     </NavLink>
                  </div>
                </div>
              </div>
                )
                }
              })}
            </div>
          </div>
        </div>      
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  description: {
    margin: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainImage: {
    display: 'flex',
    direction: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 400,
    width: 400,
    margin: 20,
  },
  smallImg: {
    height: 100,
    width: 100,
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background: 'rgba(0,0,0,0.0)',
    // 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
}));

const mapStateToProps = (state) => {
  console.log('staaaaaaaaaaat', state);
  return {
    selectedProduct: state.products.selectedProduct,
    redirect: state.products.redirectURL,
    categories: state.categories.results,
    allProducts:state.products.results,
  };
};

const mapDispatchToProps = { getProductDetails, buyUsingPaypal,getRemoteData, activeCategory };

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
