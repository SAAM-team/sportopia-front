import { connect } from 'react-redux';
import { If } from 'react-if'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    // border: 'solid 1px #25374a',
    color: theme.palette.text.primary,
  },
  container: {
    marginTop: '100px',
    marginBottom:'30px'
  },
  containerBtn: {
    marginTop: '30px'
  },
  image: {
    position: 'relative',
    height: 200,
    [theme.breakpoints.down('xs')]: {
      width: '100% !important', // Overrides inline-style
      height: 100,
    },
    '&:hover, &$focusVisible': {
      zIndex: 1,
      '& $imageBackdrop': {
        opacity: 0.15,
      },
      '& $imageMarked': {
        opacity: 0,
      },
      '& $imageTitle': {
        border: '4px solid currentColor',
      },
    },
  }
}));


const Products = (props) => {
    console.log('props inside Category Product',props);
  const classes = useStyles();
  return (
    <Grid className={classes.container} container justify="center" wrap="warp" spacing={2}>
      {/* {props.products.map((product) => {
        return (
          <Grid item sm={4}>
            <If condition={props.active !== ''}>
              
            </If>
          </Grid>
        );
      })} */}
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return { 
    products: state.products.activeProducts,
    active: state.categories.active
 };
};



export default connect(mapStateToProps)(Products);