/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import {
  getProductDetails,
  buyUsingPaypal,
} from '../../reducers/product-action ';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Button } from '@material-ui/core';

export function ProductDetails(props) {
  const classes = useStyles();
  console.log('props inside the one paypal page', props);
  // Context

  // State

  return (
    <>
      <div>huhuhuh</div>
    </>
  );
}

const useStyles = makeStyles((theme) => ({}));

const mapStateToProps = (state) => {
  console.log('paypal state', state);
  return {
    selectedProduct: state.products.selectedProduct,
  };
};

const mapDispatchToProps = { getProductDetails, buyUsingPaypal };

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
