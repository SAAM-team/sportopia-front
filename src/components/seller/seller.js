/* eslint-disable no-lone-blocks */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { If, Then, Else } from '../../if/if';
import { deepPurple } from '@material-ui/core/colors';
import { getRemoteData } from '../../reducers/categories-action';
import {
  Grid,
  Paper,
  ListItem,
  Divider,
  Button,
  TextField,
  Dialog,
  FormControlLabel,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  ListItemText,
  Fab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Tooltip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Switch
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { connect } from 'react-redux';
import {
  addProduct,
  deleteProduct,
  updateProduct,
  allSellerProducts
} from '../../reducers/seller_actions';
// Table Info
let rowP = [];
export function Seller(props) {
  console.log('the props inside the seller', props);
  const [keys, setKeys] = useState([]);
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState({
    name: '',
    description: '',
    main_img: '',
    images: [],
    price: 0,
    quantity: 0,
    category_id: '',
    is_bid: false
  });

  useEffect(() => {
    rowP = [];
    props.products.map((product) => setKeys(Object.keys(product)));
    props.products.forEach((item) => {
      {
        rowP.push(
          createPData(
            item.id,
            item.name,
            item.main_img,
            item.price,
            item.quantity,
            item.category_id,
            item.is_bid
          )
        );
      }
    });
  }, [props.products]);

  useEffect(() => {
    handleGetAllProducts();
  }, []);

  const classes = useStyles();

  // Functions
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleDeleteProduct = (id) => {
    props.deleteProduct(id);
    props.allSellerProducts();
  };
  const handleUpdateProduct = (id) => {
    // props.updateProduct(product, id);
  };
  const handleGetAllProducts = () => {
    props.allSellerProducts();
  };
  const handleAddProduct = () => {
    console.log(product);
    props.addProduct(product);
    props.allSellerProducts();
  };
  const generateList = () => {
    return (
      <Grid item xs={12}>
        <ListItem button>
          <Avatar className={classes.purple}>S</Avatar>
          <ListItemText primary='Seller' />
          <Divider />
        </ListItem>
      </Grid>
    );
  };
  return (
    <>
      <Tooltip title='Add Product'>
        <Fab
          style={{ position: 'absolute', top: 70, right: 30 }}
          color='primary'
          aria-label='add'
        >
          <AddIcon onClick={handleClickOpen} />
        </Fab>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>Adding Product</DialogTitle>
        <DialogContent>
          <DialogContentText>Adding New Product</DialogContentText>
          <form className={classes.form}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name='productName'
                  variant='outlined'
                  required
                  fullWidth
                  id='productName'
                  label='Product Name'
                  onChange={(e) => (product.name = e.target.value)}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant='outlined'
                  required
                  fullWidth
                  onChange={(e) => (product.description = e.target.value)}
                  id='description'
                  label='description'
                  name='description'
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  name='price'
                  variant='outlined'
                  required
                  fullWidth
                  id='price'
                  label='Price'
                  onChange={(e) => (product.price = e.target.value)}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  variant='outlined'
                  required
                  fullWidth
                  onChange={(e) => (product.quantity = e.target.value)}
                  id='quantity'
                  label='Quantity'
                  name='quantity'
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControlLabel
                  control={
                    <Switch
                      onChange={(e) => (product.is_bid = e.target.checked)}
                      name='checkedA'
                    />
                  }
                  label='On Bidding'
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl className={classes.formControl}>
                  <InputLabel id='demo-simple-select-label'>
                    Category
                  </InputLabel>
                  <Select
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    onChange={(e) => (product.category_id = e.target.value)}
                  >
                    {props.categories.map((item) => {
                      return (
                        <MenuItem value={item.id}>
                          {item.category_name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={() => handleAddProduct()} color='primary'>
            Add
          </Button>
        </DialogActions>
      </Dialog>
      <Grid
        xs={12}
        container
        direction='row'
        justify='space-between'
        alignItems='flex-start'
      >
        <Grid
          lg={2}
          xs={12}
          container
          direction='column'
          justify='space-between'
          alignItems='flex-start'
        >
          {generateList()}
        </Grid>
        <Grid
          lg={10}
          xs={12}
          container
          direction='column'
          justify='space-between'
          alignItems='flex-start'
        >
          <Grid item xs={12} container direction='row'>
            <TableContainer style={{ marginRight: 15 }} component={Paper}>
              <Table className={classes.table} aria-label='customized table'>
                <TableHead>
                  <TableRow>
                    {keys.map((key) => {
                      if (key === 'description') {
                        console.log('');
                      } else {
                        return (
                          <StyledTableCell align='center' key={key}>
                            {key}
                          </StyledTableCell>
                        );
                      }
                    })}
                    <StyledTableCell colSpan={2} align='center' key='Update'>
                      Options
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <If condition={rowP.length}>
                    <Then>
                      {rowP.map((row) => (
                        <StyledTableRow key={row.id}>
                          <StyledTableCell
                            align='center'
                            component='th'
                            scope='row'
                          >
                            {row.id}
                          </StyledTableCell>
                          <StyledTableCell align='center'>
                            {row.name}
                          </StyledTableCell>
                          <StyledTableCell align='center'>
                            <Avatar
                              alt='Product Image'
                              src={row.main_img}
                              className={classes.large}
                            />
                          </StyledTableCell>
                          <StyledTableCell align='center'>
                            {row.price} $
                          </StyledTableCell>
                          <StyledTableCell align='center'>
                            {row.quantity}
                          </StyledTableCell>
                          <StyledTableCell align='center'>
                            {row.category_id}
                          </StyledTableCell>
                          <StyledTableCell align='center'>
                            {row.is_bid ? 'Under Bidding' : 'Not Under Bidding'}
                          </StyledTableCell>
                          <StyledTableCell align='center'>
                            <Button
                              fullWidth
                              variant='contained'
                              color='primary'
                              className={classes.submit}
                              onClick={(event) => handleDeleteProduct(row.id)}
                            >
                              Delete
                            </Button>
                          </StyledTableCell>
                          <StyledTableCell align='center'>
                            <Button
                              fullWidth
                              variant='contained'
                              color='primary'
                              className={classes.submit}
                              onClick={(event) =>
                                handleUpdateProduct(product, row.id)
                              }
                            >
                              Update
                            </Button>{' '}
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </Then>
                  </If>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
  },
  table: {
    minWidth: 700
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7)
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
    marginRight: 5
  },
  list: {
    padding: 5
  }
}));
// Table Functions
function createPData(id, name, main_img, price, quantity, category_id, is_bid) {
  return {
    id,
    name,
    main_img,
    price,
    quantity,
    category_id,
    is_bid
  };
}
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);
const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover
    }
  }
}))(TableRow);

const mapStateToProps = (state) => {
  return {
    products: state.seller.sellersProducts,
    categories: state.categories.results
  };
};
const mapDispatchToProps = {
  addProduct,
  deleteProduct,
  updateProduct,
  allSellerProducts,
  getRemoteData
};
export default connect(mapStateToProps, mapDispatchToProps)(Seller);
