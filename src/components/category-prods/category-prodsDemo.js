import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import { CardHeader, Zoom, Tooltip, Badge } from "@material-ui/core";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import ShoppingCartRoundedIcon from "@material-ui/icons/ShoppingCartRounded";
import FavoriteRoundedIcon from "@material-ui/icons/FavoriteRounded";
import "./category-prods.css";
import React, { useEffect } from "react";
import { activeCategory } from "../../reducers/categories-action";
import { getRemoteData } from "../../reducers/product-action ";
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
    boxShadow: "0 0 10px 0px rgba(0, 0, 0, 0.25)",
  },
  media: {
    height: 0,
    paddingTop: "100%", // 16:9
  },
  header: {
    height: 175,
    // paddingBottom: '0', // 16:9
    alignItems: "center",
  },
  containing: {
    flex: 2,
    flexWrap: "wrap",
    rowGap: 40,
    justifyContent: "space-around",
  },
}));

const Products = (props) => {
  console.log("props", props);
  useEffect(() => {
    props.getRemoteData();
  }, []);
  const classes = useStyles();
  return (
    <>
      <Typography
        style={{ marginTop: "50px", color: "#050505" }}
        variant="h3"
        align="center"
      >
        Products Of The Category
      </Typography>
      <div class="section">
        <div class="container">
          <div class="row">
            <div id="store" class="col-md-9">
              <div class="store-filter clearfix">
                <div class="store-sort">
                  <label>
                    Sort By:
                    <select class="input-select">
                      <option value="0">Popular</option>
                      <option value="1">Position</option>
                    </select>
                  </label>

                  <label>
                    Show:
                    <select class="input-select">
                      <option value="0">20</option>
                      <option value="1">50</option>
                    </select>
                  </label>
                </div>
              </div>

              <div class="row">
                {props.products.map((product) => {
                  return (
                    <div class="col-md-4 col-xs-6">
                      <div class="product">
                        <div class="product-img">
                          <img src={product.main_img} alt=""></img>
                          <div class="product-label">
                            <span class="sale">-30%</span>
                            <span class="new">NEW</span>
                          </div>
                        </div>
                        <div class="product-body">
                          <h3 class="product-name">
                            <a href="#">{product.name}</a>
                          </h3>
                          <h4 class="product-price">
                            {product.price} <del class="product-old-price">{product.price - 50}</del>
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
                              <Tooltip
                                placement="top"
                                arrow
                                TransitionComponent={Zoom}
                                title="add to favorite"
                              >
                                <IconButton aria-label="show 4 new mails" color="inherit">
                                  <Badge badgeContent={0} color="secondary">
                                    <FavoriteRoundedIcon />
                                  </Badge>
                                </IconButton>
                              </Tooltip>
                            </button>
                            <button class="add-to-compare">
                              <i class="fa fa-exchange"></i>
                              <span class="tooltipp">add to compare</span>
                            </button>
                            <button class="quick-view">
                              <i class="fa fa-eye"></i>
                              <span class="tooltipp">quick view</span>
                            </button>
                          </div>
                        </div>
                        <div class="add-to-cart">
                          <button class="add-to-cart-btn" onClick={() => addToCart(product.p_id)}
                          >
                            <i class="fa fa-shopping-cart"></i> Add to cart
                      </button>
                        </div>
                      </div>
                    </div>
                  )
                })}

              </div>

              <div class="store-filter clearfix">
                <span class="store-qty">Showing 20-100 products</span>
                <ul class="store-pagination">
                  <li class="active">1</li>
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
                    <a href="#">5</a>
                  </li>
                  <li>
                    <a href="#">6</a>
                  </li>
                  <li>
                    <a href="#">7</a>
                  </li>
                  <li>
                    <a href="#">8</a>
                  </li>
                  <li>
                    <a href="#">9</a>
                  </li>
                  <li>
                    <a href="#">10</a>
                  </li>
                  <li>
                    <a href="#">
                      <i class="fa fa-angle-right"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  console.log("stat", state);
  return {
    products: state.products.activeProducts,
    active: state.categories.active,
    category: state.categories.results,
  };
};

const mapDispatchToProps = { activeCategory, getRemoteData };

export default connect(mapStateToProps, mapDispatchToProps)(Products);
