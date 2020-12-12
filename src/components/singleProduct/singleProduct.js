/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline, Container } from '@material-ui/core';
import { connect } from 'react-redux';
import { getProductDetails } from '../../reducers/product-action ';
import { StateContext } from '../../context/global-state';
import CardMedia from '@material-ui/core/CardMedia';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
// import tileData from './tileData';

export function ProductDetails(props) {
  const classes = useStyles();
  console.log('props inside the one product page', props.selectedProduct);
  // Context

  // State

  // Functions

  useEffect(() => {
    props.getProductDetails();
  }, []);

  return (
    <>
      {props.selectedProduct.map((product) => {
        return (
          <>
            <div className={classes.root}>
              <GridListTile className={classes.mainImage} key={product.id}>
                <img src={product.main_img} alt={product.name} />
              </GridListTile>
            </div>
            <div className={classes.root}>
              <GridList className={classes.gridList} cols={1.5}>
                {product.images.map((tile) => (
                  <GridListTile key={tile}>
                    <img src={tile} alt={tile} />
                    <GridListTileBar
                      title={tile}
                      classes={{
                        root: classes.titleBar,
                        title: classes.title,
                      }}
                      actionIcon={
                        <IconButton aria-label={`star ${product.name}`}>
                          <StarBorderIcon className={classes.title} />
                        </IconButton>
                      }
                    />
                  </GridListTile>
                ))}
              </GridList>
            </div>
          </>
        );
      })}
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  mainImage: {
    display: 'flex',
    direction: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 400,
    width: 400,
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
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
}));

const mapStateToProps = (state) => {
  return {
    selectedProduct: state.products.selectedProduct,
  };
};

const mapDispatchToProps = { getProductDetails };

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
