/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { getBiddingItems } from '../../reducers/actions';
import { StateContext } from '../../context/global-state';
import { NavLink, Link } from 'react-router-dom';
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

export function BiddingMain(props) {
  console.log(props.products);
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
  const saveProductId = (p_id) => {
    setProductIdBidding(p_id);
  };

  return (
    <>
      <Grid container spacing={3}>
        <div className={classes.container}>
          {props.products.map((product) => {
            return (
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <Card className={classes.root}>
                  <CardActionArea>
                    <CardMedia
                      className={classes.media}
                      image={product.main_img}
                      title='Contemplative Reptile'
                    />
                    <CardContent>
                      <Typography gutterBottom variant='h5' component='h2'>
                        {product.name}
                      </Typography>
                      <Typography
                        variant='body2'
                        color='textSecondary'
                        component='p'
                      >
                        {product.description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Link to={() => `/bidding/${product.id}`}>
                      <Button
                        onClick={() => saveProductId(2)}
                        size='small'
                        color='primary'
                      >
                        Enter Bidding Room
                      </Button>
                    </Link>
                    <Button
                      onClick={handleClickOpen}
                      size='small'
                      color='primary'
                    >
                      Learn More
                    </Button>
                  </CardActions>
                </Card>
                <Dialog
                  open={open}
                  TransitionComponent={Transition}
                  keepMounted
                  onClose={handleClose}
                  aria-labelledby='alert-dialog-slide-title'
                  aria-describedby='alert-dialog-slide-description'
                >
                  <DialogTitle id='alert-dialog-slide-title'>
                    {"Use Google's location service?"}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id='alert-dialog-slide-description'>
                      Let Google help apps determine location. This means
                      sending anonymous location data to Google, even when no
                      apps are running.
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose} color='primary'>
                      OK!
                    </Button>
                  </DialogActions>
                </Dialog>
              </Grid>
            );
          })}
        </div>
      </Grid>
    </>
  );
}
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
