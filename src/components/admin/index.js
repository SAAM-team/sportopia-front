/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { StateContext } from '../../context/global-state';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { If, Then, Else } from '../../if/if';
import { deepPurple } from '@material-ui/core/colors';
import { Card, Row, Col } from 'react-bootstrap';
import {
  Grid,
  Paper,
  ListItem,
  Divider,
  Button,
  TextField,
  Dialog,
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
  Typography,
  TablePagination
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { connect } from 'react-redux';
import Pagination from '@material-ui/lab/Pagination';

import {
  allSellers,
  allActiveSellers,
  allDeActiveSellers,
  allBuyers,
  allActiveBuyers,
  allDeActiveBuyers,
  allProducts,
  allDProducts,
  allAProducts,
  allBProducts,
  allCProducts,
  addCategory,
  numberOfUsers,
  numberOfProducts,
  everythingFunc
} from '../../reducers/admin_actions';

import {
  sellers,
  dSellers,
  aSellers,
  buyers,
  aBuyers,
  dBuyers,
  products,
  dProducts,
  aProducts,
  bProducts,
  cProducts
} from '../../reducers/admin-count-actions';
import adminCss from './admin.css';

// Table Info

let rowsS = [];
let rowsB = [];
let rowP = [];

export function Admin(props) {
  const [keys, setKeys] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [category, setCategory] = useState('');
  const [users, setUsers] = useState(0);
  const [products, setProducts] = useState(0);
  const [active, setActive] = useState('');
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);

  // Effect

  useEffect(async () => {
    let number = await props.numberOfUsers();
    let products = await props.numberOfProducts();
    setUsers(number);
    setProducts(products);
  }, []);

  // useEffect(async () => {
  //   let pages = await props.everythingFunc(active);
  // }, []);

  useEffect(() => {
    rowsS = [];
    rowsB = [];
    rowP = [];
    setKeys(props.info.length ? Object.keys(props.info[0]) : []);
    props.info.forEach((item) => {
      if (item.user_role === 'seller') {
        rowsS.push(
          createSData(
            item.user_name,
            item.user_role,
            item.company_name,
            item.adress,
            item.telephone
          )
        );
      } else if (item.user_role === 'buyer') {
        rowsB.push(
          createBData(
            item.user_name,
            item.user_role,
            item.first_name,
            item.last_name,
            item.adress,
            item.telephone,
            item.gender,
            item.card_number ? 'XXXXXXXXXXX' : 'Not Inserted'
          )
        );
      } else {
        rowP.push(
          createPData(
            item.name,
            item.description,
            item.main_img,
            item.price,
            item.category_name,
            item.company_name
          )
        );
      }
    });
  }, [props.info]);

  const classes = useStyles();

  // Functions

  const handleChange = (event, value) => {
    setPage(value);
  };

  const handleClickOpen = (e) => {
    setOpen(true);
  };

  const handleClose = (e) => {
    setOpen(false);
  };

  const handleAllSellers = async (e) => {
    setActive(e.target.innerHTML);
    props.allSellers();
    let number = await props.sellers();
    setCount(Math.ceil(number / 10));
  };

  const handleAllActiveSeller = async (e) => {
    setActive(e.target.innerHTML);
    props.allActiveSellers();
    let number = await props.aSellers();
    setCount(Math.ceil(number / 10));
  };

  const handleAllDeActiveSeller = async (e) => {
    setActive(e.target.innerHTML);
    props.allDeActiveSellers();
    let number = await props.dSellers();
    setCount(Math.ceil(number / 10));
  };

  const handleAllBuyers = async (e) => {
    setActive(e.target.innerHTML);
    props.allBuyers();
    let number = await props.buyers();
    setCount(Math.ceil(number / 10));
  };

  const handleAllActiveBuyers = async (e) => {
    setActive(e.target.innerHTML);
    props.allActiveBuyers();
    let number = await props.aBuyers();
    setCount(Math.ceil(number / 10));
  };

  const handleAllDeActiveBuyers = async (e) => {
    setActive(e.target.innerHTML);
    props.allDeActiveBuyers();
    let number = await props.dBuyers();
    setCount(Math.ceil(number / 10));
  };
  const handleAllProducts = async (e) => {
    setActive(e.target.innerHTML);
    props.allProducts();
    let number = await props.products();
    setCount(Math.ceil(number / 10));
  };

  const handleDeletedProducts = async (e) => {
    setActive(e.target.innerHTML);
    props.allDProducts();
    let number = await props.dProducts();
    setCount(Math.ceil(number / 10));
  };

  const handleActiveProducts = async (e) => {
    setActive(e.target.innerHTML);
    props.allAProducts();
    let number = await props.aProducts();
    setCount(Math.ceil(number / 10));
  };

  const handleBoughtProducts = async (e) => {
    setActive(e.target.innerHTML);
    props.allBProducts();
    let number = await props.bProducts();
    setCount(Math.ceil(number / 10));
  };

  const handleCartProducts = async (e) => {
    setActive(e.target.innerHTML);
    props.allCProducts();
    let number = await props.cProducts();
    setCount(Math.ceil(number / 10));
  };

  const handleFavProducts = () => {};

  const handleAddCategory = async (e) => {
    setActive(e.target.innerHTML);
    props.addCategory(category);
  };

  const cards = () => {
    return (
      <>
        <Card text='dark' bg='danger' style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title>Number Of users</Card.Title>
            <Card.Text className='number'>{users}</Card.Text>
          </Card.Body>
        </Card>

        <Card text='dark' bg='warning' style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title>Number Of Products</Card.Title>
            <Card.Text className='number'>{products}</Card.Text>
          </Card.Body>
        </Card>

        <Card text='dark' bg='info' style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text className='number'>{users}</Card.Text>
          </Card.Body>
        </Card>
      </>
    );
  };

  const generateList = () => {
    return (
      <Grid item xs={12}>
        <ListItem button>
          <Avatar className={classes.purple}>A</Avatar>
          <ListItemText primary='Anthign' />
          <Divider />
        </ListItem>
        <ListItem button onClick={(e) => handleAllSellers(e)}>
          <ListItemText secondary='Sellers' />
          <Divider />
        </ListItem>
        <ListItem button onClick={(e) => handleAllActiveSeller(e)}>
          <ListItemText secondary='Active Sellers' />
          <Divider />
        </ListItem>
        <ListItem button onClick={(e) => handleAllDeActiveSeller(e)}>
          <ListItemText secondary='Deactivate Sellers' />
          <Divider />
        </ListItem>
        <ListItem button onClick={(e) => handleAllBuyers(e)}>
          <ListItemText secondary='Buyers' />
          <Divider />
        </ListItem>
        <ListItem button onClick={(e) => handleAllActiveBuyers(e)}>
          <ListItemText secondary='Active Buyers' />
          <Divider />
        </ListItem>
        <ListItem button onClick={(e) => handleAllDeActiveBuyers(e)}>
          <ListItemText secondary='Deactivate Buyers' />
          <Divider />
        </ListItem>
        <ListItem button onClick={(e) => handleAllProducts(e)}>
          <ListItemText secondary='Products' />
          <Divider />
        </ListItem>
        <ListItem button onClick={(e) => handleDeletedProducts(e)}>
          <ListItemText secondary='Deleted Products' />
          <Divider />
        </ListItem>
        <ListItem button onClick={(e) => handleActiveProducts(e)}>
          <ListItemText secondary='Active Products' />
          <Divider />
        </ListItem>
        <ListItem button onClick={(e) => handleBoughtProducts(e)}>
          <ListItemText secondary='Bough Products' />
          <Divider />
        </ListItem>
        <ListItem button onClick={(e) => handleCartProducts(e)}>
          <ListItemText secondary='In Cart/Not Bought Products' />
          <Divider />
        </ListItem>
      </Grid>
    );
  };
  return (
    <>
      <Tooltip title='Add Category'>
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
        <DialogTitle id='form-dialog-title'>Adding Category</DialogTitle>
        <DialogContent>
          <DialogContentText>Adding New Category</DialogContentText>
          <TextField
            autoFocus
            margin='dense'
            id='name'
            label='Category Name'
            type='email'
            fullWidth
            onChange={(e) => setCategory(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={() => handleAddCategory()} color='primary'>
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
          <Grid
            xs={12}
            container
            direction='row'
            justify='space-around'
            alignItems='center'
            style={{ marginBottom: 20 }}
          >
            {cards()}
          </Grid>

          <Grid item xs={12} container direction='row'>
            <TableContainer style={{ marginRight: 15 }} component={Paper}>
              <Table className={classes.table} aria-label='customized table'>
                <TableHead>
                  <TableRow>
                    {keys.map((key) => {
                      return (
                        <StyledTableCell align='center' key={key}>
                          {key}
                        </StyledTableCell>
                      );
                    })}
                  </TableRow>
                </TableHead>
                <TableBody>
                  <If condition={rowsS.length}>
                    <Then>
                      {rowsS.map((row) => (
                        <StyledTableRow key={row.name}>
                          <StyledTableCell
                            align='center'
                            component='th'
                            scope='row'
                          >
                            {row.name}
                          </StyledTableCell>
                          <StyledTableCell align='center'>
                            {row.role}
                          </StyledTableCell>
                          <StyledTableCell align='center'>
                            {row.company}
                          </StyledTableCell>
                          <StyledTableCell align='center'>
                            {row.address}
                          </StyledTableCell>
                          <StyledTableCell align='center'>
                            {row.telephone}
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                      <StyledTableCell colSpan={keys.length} align='center'>
                        <div className={classes.pagination}>
                          <Pagination
                            count={count}
                            page={page}
                            onChange={handleChange}
                          />
                        </div>
                      </StyledTableCell>
                    </Then>

                    <Else>
                      <If condition={rowsB.length}>
                        <Then>
                          {rowsB.map((row) => (
                            <StyledTableRow key={row.name}>
                              <StyledTableCell
                                align='center'
                                component='th'
                                scope='row'
                              >
                                {row.name}
                              </StyledTableCell>
                              <StyledTableCell align='center'>
                                {row.role}
                              </StyledTableCell>
                              <StyledTableCell align='center'>
                                {row.first_name}
                              </StyledTableCell>
                              <StyledTableCell align='center'>
                                {row.last_name}
                              </StyledTableCell>
                              <StyledTableCell align='center'>
                                {row.address}
                              </StyledTableCell>
                              <StyledTableCell align='center'>
                                {row.telephone}
                              </StyledTableCell>
                              <StyledTableCell align='center'>
                                {row.gender}
                              </StyledTableCell>
                              <StyledTableCell align='center'>
                                {row.card_number}
                              </StyledTableCell>
                            </StyledTableRow>
                          ))}
                          <StyledTableCell colSpan={keys.length} align='center'>
                            <div className={classes.pagination}>
                              <Pagination
                                count={count}
                                page={page}
                                onChange={handleChange}
                              />
                            </div>
                          </StyledTableCell>
                        </Then>
                        <Else>
                          <If condition={rowP.length}>
                            <Then>
                              {rowP.map((row) => (
                                <StyledTableRow key={row.name}>
                                  <StyledTableCell
                                    align='center'
                                    component='th'
                                    scope='row'
                                  >
                                    {row.name}
                                  </StyledTableCell>
                                  <StyledTableCell align='center'>
                                    {row.description}
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
                                    {row.category_name}
                                  </StyledTableCell>
                                  <StyledTableCell align='center'>
                                    {row.company_name}
                                  </StyledTableCell>
                                </StyledTableRow>
                              ))}
                              <StyledTableCell
                                colSpan={keys.length}
                                align='center'
                              >
                                <div className={classes.pagination}>
                                  <Pagination
                                    count={count}
                                    page={page}
                                    onChange={handleChange}
                                  />
                                </div>
                              </StyledTableCell>
                            </Then>
                          </If>
                        </Else>
                      </If>
                    </Else>
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
  },
  number: {
    fontSize: 60,
    textAlign: 'center'
  },
  pagination: {
    '& > * + *': {
      marginTop: theme.spacing(2)
    }
  }
}));

// Table Functions
function createSData(name, role, company, address, telephone) {
  return { name, role, company, address, telephone };
}

function createPData(
  name,
  description,
  main_img,
  price,
  category_name,
  company_name
) {
  return { name, description, main_img, price, category_name, company_name };
}

function createBData(
  name,
  role,
  first_name,
  last_name,
  address,
  telephone,
  gender,
  card_number
) {
  return {
    name,
    role,
    first_name,
    last_name,
    address,
    telephone,
    gender,
    card_number
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

// Cards function

const mapStateToProps = (state) => {
  return {
    info: state.admin.information
  };
};
const mapDispatchToProps = {
  allSellers,
  allActiveSellers,
  allDeActiveSellers,
  allBuyers,
  allActiveBuyers,
  allDeActiveBuyers,
  allProducts,
  allDProducts,
  allAProducts,
  allBProducts,
  allCProducts,
  addCategory,
  numberOfUsers,
  numberOfProducts,
  sellers,
  dSellers,
  aSellers,
  buyers,
  aBuyers,
  dBuyers,
  products,
  dProducts,
  aProducts,
  bProducts,
  cProducts
};

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
