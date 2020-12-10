/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { getBiddingItems } from '../../reducers/actions';
import { StateContext } from '../../context/global-state';
import { NavLink } from 'react-router-dom';
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
  Grid,
  Paper
} from '@material-ui/core';

export function BiddingMain(props) {
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
    <div className={classes.container}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image='https://cdn.shopify.com/s/files/1/0051/4802/products/Small_Octocat_500x.png?v=1571377850'
                title='Contemplative Reptile'
              />
              <CardContent>
                <Typography gutterBottom variant='h5' component='h2'>
                  Lizard
                </Typography>
                <Typography variant='body2' color='textSecondary' component='p'>
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <NavLink to='/bidding/2'>
                <Button
                  onClick={() => saveProductId(2)}
                  size='small'
                  color='primary'
                >
                  Enter Bidding Room
                </Button>
              </NavLink>
              <Button onClick={handleClickOpen} size='small' color='primary'>
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
                Let Google help apps determine location. This means sending
                anonymous location data to Google, even when no apps are
                running.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color='primary'>
                OK!
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
      </Grid>
    </div>
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
