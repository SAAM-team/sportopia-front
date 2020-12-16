/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { StateContext } from '../../context/global-state';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { If, Then, Else } from '../../if/if';
import { deepPurple } from '@material-ui/core/colors';
import { Card, Row, Col, PageItem } from 'react-bootstrap';
import CreateIcon from '@material-ui/icons/Create';
import { NavLink, Redirect } from "react-router-dom";
import cookie from 'react-cookies';
import jwt from 'jsonwebtoken';
const JWT_SECRET = 'thebestsecrett';
let token = cookie.load('token');

const validateToken = (token) => {
  try {
    let user = jwt.verify(token, JWT_SECRET);
    return user;
  } catch (e) {
    console.log('You have to register100');
  }
};
// get information

let user = validateToken(token);
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
  Tooltip
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
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
  toggleUser,
  toggleProduct
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
  const [open, setOpen] = useState(false);
  const [openU, setOpenU] = useState(false);
  const [openP, setOpenP] = useState(false);
  const [category, setCategory] = useState('');
  const [users, setUsers] = useState(0);
  const [products, setProducts] = useState(0);
  const [active, setActive] = useState('');
  const [page1, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [userId, setUserId] = useState(0);
  const [productId, setProductId] = useState(0);

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
            item.telephone,
            item.is_activated,
            item.u_id
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
            item.card_number ? 'XXXXXXXXXXX' : 'Not Inserted',
            item.is_activated,
            item.u_id
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
            item.company_name,
            item.is_deleted,
            item.id
          )
        );
      }
    });
  }, [props.info]);

  const classes = useStyles();

  // Functions

  const handleChange = (event, value) => {
    setPage(value);
    renderAgain(value);
  };

  const renderAgain = (pageNumber) => {
    let obj = {
      target: {
        innerHTML: active
      }
    };
    switch (active) {
      case 'Sellers':
        handleAllSellers(obj, pageNumber);
        break;
      case 'Active Sellers':
        handleAllActiveSeller(obj, pageNumber);
        break;
      case 'Deactivate Sellers':
        handleAllDeActiveSeller(obj, pageNumber);
        break;
      case 'Buyers':
        handleAllBuyers(obj, pageNumber);
        break;
      case 'Active Buyers':
        handleAllActiveBuyers(obj, pageNumber);
        break;
      case 'Deactivate Buyers':
        handleAllDeActiveBuyers(obj, pageNumber);
        break;
      case 'Products':
        handleAllProducts(obj, pageNumber);
        break;
      case 'Deleted Products':
        handleDeletedProducts(obj, pageNumber);
        break;
      case 'Active Products':
        handleActiveProducts(obj, pageNumber);
        break;
      case 'Bough Products':
        handleBoughtProducts(obj, pageNumber);
        break;
      case 'In Cart/Not Bought Products':
        handleCartProducts(obj, pageNumber);
        break;

      default:
        break;
    }
  };

  const handleClickOpen = (e) => {
    setOpen(true);
  };
  const handleClickOpenP = (e) => {
    setOpenP(true);
  };
  const handleClickOpenU = (e) => {
    setOpenU(true);
  };

  const handleClose = (e) => {
    setOpen(false);
    setOpenU(false);
    setOpenP(false);
  };

  const handleStates = (number, name) => {
    setCount(Math.ceil(number / 10));
    if (name !== active) {
      setPage(1);
    }
  };

  const handleAllSellers = async (e, page = 1) => {
    setActive(e.target.innerHTML);
    props.allSellers(page);
    let number = await props.sellers();
    handleStates(number, e.target.innerHTML);
  };

  const handleAllActiveSeller = async (e, page = 1) => {
    setActive(e.target.innerHTML);
    props.allActiveSellers(page);
    let number = await props.aSellers();
    handleStates(number, e.target.innerHTML);
  };

  const handleAllDeActiveSeller = async (e, page = 1) => {
    setActive(e.target.innerHTML);
    props.allDeActiveSellers(page);
    let number = await props.dSellers();
    handleStates(number, e.target.innerHTML);
  };

  const handleAllBuyers = async (e, page = 1) => {
    setActive(e.target.innerHTML);
    props.allBuyers(page);
    let number = await props.buyers();
    handleStates(number, e.target.innerHTML);
  };

  const handleAllActiveBuyers = async (e, page = 1) => {
    setActive(e.target.innerHTML);
    props.allActiveBuyers(page);
    let number = await props.aBuyers();
    handleStates(number, e.target.innerHTML);
  };

  const handleAllDeActiveBuyers = async (e, page = 1) => {
    setActive(e.target.innerHTML);
    props.allDeActiveBuyers(page);
    let number = await props.dBuyers();
    handleStates(number, e.target.innerHTML);
  };
  const handleAllProducts = async (e, page = 1) => {
    setActive(e.target.innerHTML);
    props.allProducts(page);
    let number = await props.products();
    handleStates(number, e.target.innerHTML);
  };

  const handleDeletedProducts = async (e, page = 1) => {
    setActive(e.target.innerHTML);
    props.allDProducts(page);
    let number = await props.dProducts();
    handleStates(number, e.target.innerHTML);
  };

  const handleActiveProducts = async (e, page = 1) => {
    setActive(e.target.innerHTML);
    props.allAProducts(page);
    let number = await props.aProducts();
    handleStates(number, e.target.innerHTML);
  };

  const handleBoughtProducts = async (e, page = 1) => {
    setActive(e.target.innerHTML);
    props.allBProducts(page);
    let number = await props.bProducts();
    handleStates(number, e.target.innerHTML);
  };

  const handleCartProducts = async (e, page = 1) => {
    setActive(e.target.innerHTML);
    props.allCProducts(page);
    let number = await props.cProducts();
    handleStates(number, e.target.innerHTML);
  };

  const handleFavProducts = () => { };

  const handleAddCategory = async (e, page = 1) => {
    setActive(e.target.innerHTML);
    props.addCategory(category);
  };

  const handleToggleProduct = () => {
    props.toggleProduct(productId);
  };

  const handleToggleUser = () => {
    props.toggleUser(userId);
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
  if (!user && user.role === 'buyer') {
    return (
      <>
        <div style={{ position: 'absolute', top: 70, right: 30 }}>
          <Tooltip title='Add Category'>
            <Fab color='primary' aria-label='add'>
              <AddIcon onClick={handleClickOpen} />
            </Fab>
          </Tooltip>
          <Tooltip title='Toggle User'>
            <Fab color='primary' aria-label='add'>
              <AccountCircleIcon onClick={handleClickOpenU} />
            </Fab>
          </Tooltip>
          <Tooltip title='Toggle Product'>
            <Fab color='primary' aria-label='add'>
              <EditIcon onClick={handleClickOpenP} />
            </Fab>
          </Tooltip>
        </div>
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
        <Dialog
          open={openU}
          onClose={handleClose}
          aria-labelledby='form-dialog-title'
        >
          <DialogTitle id='form-dialog-title'>Toggle Users</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please get the user id from the table to change it's status
          </DialogContentText>
            <TextField
              autoFocus
              margin='dense'
              id='name'
              label='User ID'
              type='email'
              fullWidth
              onChange={(e) => setUserId(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color='primary'>
              Cancel
          </Button>
            <Button onClick={() => handleToggleUser()} color='primary'>
              Toggle
          </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={openP}
          onClose={handleClose}
          aria-labelledby='form-dialog-title'
        >
          <DialogTitle id='form-dialog-title'>Toggle Products</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please get the product id from the table to change it's status
          </DialogContentText>
            <TextField
              autoFocus
              margin='dense'
              id='name'
              label='Product ID'
              type='email'
              fullWidth
              onChange={(e) => setProductId(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color='primary'>
              Cancel
          </Button>
            <Button onClick={() => handleToggleProduct()} color='primary'>
              Toggle
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
                            {key.toUpperCase()}
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
                            <StyledTableCell align='center'>
                              {row.active ? 'Activated' : 'Deactivated'}
                            </StyledTableCell>
                            <StyledTableCell align='center'>
                              {row.id}
                            </StyledTableCell>
                          </StyledTableRow>
                        ))}
                        <StyledTableCell colSpan={keys.length} align='center'>
                          <div className={classes.pagination}>
                            <Pagination
                              count={count}
                              page={page1}
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
                                <StyledTableCell align='center'>
                                  {row.active ? 'Activated' : 'Deactivated'}
                                </StyledTableCell>
                                <StyledTableCell align='center'>
                                  {row.id}
                                </StyledTableCell>
                              </StyledTableRow>
                            ))}
                            <StyledTableCell colSpan={keys.length} align='center'>
                              <div className={classes.pagination}>
                                <Pagination
                                  count={count}
                                  page={page1}
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
                                    <StyledTableCell align='center'>
                                      {row.deleted ? 'Deactivated' : 'Activated'}
                                    </StyledTableCell>
                                    <StyledTableCell align='center'>
                                      {row.id}
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
                                      page={page1}
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
  else{
    return <Redirect to={'/'} />
  }
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
function createSData(name, role, company, address, telephone, active, id) {
  return { name, role, company, address, telephone, active, id };
}

function createPData(
  name,
  description,
  main_img,
  price,
  category_name,
  company_name,
  deleted,
  id
) {
  return {
    name,
    description,
    main_img,
    price,
    category_name,
    company_name,
    deleted,
    id
  };
}

function createBData(
  name,
  role,
  first_name,
  last_name,
  address,
  telephone,
  gender,
  card_number,
  active,
  id
) {
  return {
    name,
    role,
    first_name,
    last_name,
    address,
    telephone,
    gender,
    card_number,
    active,
    id
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
  toggleUser,
  toggleProduct,
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
