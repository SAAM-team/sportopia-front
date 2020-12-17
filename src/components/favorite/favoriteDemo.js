import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import {
    getFavAPI,
    updateRemoteCart,
    removeFromFav
} from '../../reducers/favorit-action';

import { Container, Grid, Card, CardMedia, CardContent, CardActions, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles((theme) => ({
    '@global': {
        ul: {
            margin: 0,
            padding: 0,
            listStyle: 'none',
        },
    },
    appBar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    toolbarTitle: {
        flex: 1,
    },
    fullHeight: {
        height: "100%"
    },
    card: {
        margin: '1em',
    },
    media: {
        height: 0,
        paddingTop: '56.25%',
        borderTopLeftRadius: '5px',
        borderTopRightRadius: '5px'
    },
    grid2: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'initial'
    },
    jss5: {
        padding: '64px 0px 48px'
    },
    grid1: {
        paddingTop: '24px',
        paddingBottom: '24px'
    }
}));



const Favorite = props => {
    console.log('favvvvvvvv', props);
    useEffect(() => {
        props.getFavAPI();
    }, []);

    const classes = useStyles();
    return (
        <>
            <Typography style={{ padding: '10px 0px 5px 10px', marginTop: '50px' }} variant='h3' align='center' noWrap>
                Favorite List
      </Typography>
      <div class="section">
        {/* <div class="container"></div> */}
        <div class="row ">
            {props.favoriteData.favoriteItem.map((item, idx) => {
                console.log('props', props.favoriteData.favoriteItem[idx].is_deleted);
                if (props.favoriteData.favoriteItem[idx].is_deleted === false) {
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
                                <i class="add-to-cart-btn"></i>
                                <span class="tooltipp">add to wishlist</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    
                    )
                }
            }

            )}
</div>
      </div>

        </>
    )
}




// const mapStateToProps = state => ({
//     // length: state.favoriteItem.length,
//     favoriteData: state.favoriteData,
// })
const mapStateToProps = (state) => {
    // console.log('state inside cart', state);
    return {
        favoriteData: state.favoriteData,

    };
};

const mapDispatchToProps = {
    getFavAPI,
    removeFromFav,
};


export default connect(mapStateToProps, mapDispatchToProps)(Favorite)
