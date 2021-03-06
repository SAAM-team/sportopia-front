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
import {createFav} from '../../reducers/favorit-action'

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
      {/* {props.products.map((product) => {
      {props.category.map((category) => {
        console.log('props.category.map(',category.id);
        console.log('props.product.map(',product.category_id);
        console.log('if',category.id===product.category_id);


        if(category.id===product.category_id){
      <Typography style={{ marginLeft: '45%', marginBottom: '20px', color: '#050505' }} variant="h3" noWrap>
hii
        {category.category_name}
      </Typography>
        }
      })}
    })} */}
      <Typography
        style={{ marginTop: "50px", color: "#050505" }}
        variant="h3"
        align="center"
      >
        Products Of The Category
      </Typography>
      <section className="containing">
        {props.products.map((product) => {
          return (
            <Card className={classes.root} key={product.id}>
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
                    price: {product.price} $
                  </Typography>
                </CardContent>
                <Tooltip
                  placement="top"
                  arrow
                  TransitionComponent={Zoom}
                  title='Add to favorite'
                  onClick={()=>props.createFav(product)}
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
                  title="Add to cart"
                  onClick={() => addToCart(product.p_id)}
                >
                  <IconButton aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={0} color="secondary">
                      <ShoppingCartRoundedIcon />
                    </Badge>
                  </IconButton>
                </Tooltip>
              </CardActions>
            </Card>
          );
        })}
      </section>
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

const mapDispatchToProps = { activeCategory, getRemoteData,createFav};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
