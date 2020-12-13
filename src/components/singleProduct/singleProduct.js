/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import {
  getProductDetails,
  buyUsingPaypal,
} from '../../reducers/product-action ';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Button } from '@material-ui/core';
import ButtonGroup from '@material-ui/core/ButtonGroup';

export function ProductDetails(props) {
  const classes = useStyles();
  console.log('props inside the one product page', props.redirect);
  // Context

  // State
  const [maniImage, setMainImage] = useState('');
  const [counter, setCounter] = useState(0);
  const [open, setOpen] = React.useState(false);
  // const [redirect, setRedirect] = useState('');

  // Functions
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  // setMainImage(props.selectedProduct.main_img);
  // props.selectedProduct.main_img

  useEffect(() => {
    props.selectedProduct.map((item) => setMainImage(item.main_img));
  }, [props.selectedProduct]);

  return (
    <>
      {props.selectedProduct.map((product) => {
        return (
          <>
            <div className={classes.root}>
              <GridListTile className={classes.mainImage} key={product.id}>
                <img src={maniImage} alt={product.name} />
              </GridListTile>
            </div>
            <div className={classes.root}>
              <GridList className={classes.gridList} cols={1.5}>
                <GridListTile key={'main'}>
                  <img
                    className={classes.smallImg}
                    onClick={(e) => setMainImage(e.target.src)}
                    src={product.main_img}
                    alt={'main'}
                  />
                </GridListTile>
                {product.images.map((tile) => (
                  <GridListTile key={tile}>
                    <img
                      className={classes.smallImg}
                      onClick={() => setMainImage(tile)}
                      src={tile}
                      alt={tile}
                    />
                    <GridListTileBar
                      classes={{
                        root: classes.titleBar,
                        title: classes.title,
                      }}
                    />
                  </GridListTile>
                ))}
                <CssBaseline />
              </GridList>
              <div className={classes.description}>{product.description}</div>
            </div>
            {/* <NavLink to={() => `/paypal/paypalpayment/${product.id}`}> */}
            <Button
              onClick={() => {
                handleOpen();
                props.buyUsingPaypal(product.id, counter);
              }}
              variant="contained"
              color="secondary"
            >
              buy now
            </Button>
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              className={classes.modal}
              open={open}
              onClose={handleClose}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={open}>
                <div className={classes.paper}>
                  <h2 id="transition-modal-title">Transition modal</h2>
                  <a href={props.redirect} id="transition-modal-description">
                    react-transition-group animates me.
                  </a>
                </div>
              </Fade>
            </Modal>
            {/* </NavLink> */}
            <ButtonGroup size="small" aria-label="small outlined button group">
              <Button onClick={() => setCounter(counter + 1)}>+</Button>
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
          </>
        );
      })}
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
  console.log('staaaaaaaaaaat', state.products.redirectURL);
  return {
    selectedProduct: state.products.selectedProduct,
    redirect: state.products.redirectURL,
  };
};

const mapDispatchToProps = { getProductDetails, buyUsingPaypal };

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
