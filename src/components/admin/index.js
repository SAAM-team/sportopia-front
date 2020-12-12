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
  List,
  ListItem,
  Divider,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Avatar
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

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
  allCProducts
} from '../../reducers/admin_actions';

// Table Info

let rowsS = [];
let rowsB = [];
let rowP = [];

export function Admin(props) {
  const [keys, setKeys] = useState([]);
  const [showCards, setCards] = useState(true);

  // Effect
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

  const handleAllSellers = () => {
    props.allSellers();
  };

  const handleAllActiveSeller = () => {
    props.allActiveSellers();
  };

  const handleAllDeActiveSeller = () => {
    props.allDeActiveSellers();
  };

  const handleAllBuyers = () => {
    props.allBuyers();
  };

  const handleAllActiveBuyers = () => {
    props.allActiveBuyers();
  };

  const handleAllDeActiveBuyers = () => {
    props.allDeActiveBuyers();
  };
  const handleAllProducts = () => {
    props.allProducts();
  };

  const handleDeletedProducts = () => {
    props.allDProducts();
  };

  const handleActiveProducts = () => {
    props.allAProducts();
  };

  const handleBoughtProducts = () => {
    props.allBProducts();
  };

  const handleCartProducts = () => {
    props.allCProducts();
  };

  const handleFavProducts = () => {};

  const generateList = () => {
    return (
      <Grid item xs={12}>
        <ListItem button onClick={() => setCards(!showCards)}>
          <Avatar className={classes.purple}>A</Avatar>
          <ListItemText primary='Anthign' />
          <Divider />
        </ListItem>
        <ListItem button onClick={() => handleAllSellers()}>
          <ListItemText secondary='Sellers' />
          <Divider />
        </ListItem>
        <ListItem button onClick={() => handleAllActiveSeller()}>
          <ListItemText secondary='Active Sellers' />
          <Divider />
        </ListItem>
        <ListItem button onClick={() => handleAllDeActiveSeller()}>
          <ListItemText secondary='Deactivate Sellers' />
          <Divider />
        </ListItem>
        <ListItem button onClick={() => handleAllBuyers()}>
          <ListItemText secondary='Buyers' />
          <Divider />
        </ListItem>
        <ListItem button onClick={() => handleAllActiveBuyers()}>
          <ListItemText secondary='Active Buyers' />
          <Divider />
        </ListItem>
        <ListItem button onClick={() => handleAllDeActiveBuyers()}>
          <ListItemText secondary='Deactivate Buyers' />
          <Divider />
        </ListItem>
        <ListItem button onClick={() => handleAllProducts()}>
          <ListItemText secondary='Products' />
          <Divider />
        </ListItem>
        <ListItem button onClick={() => handleDeletedProducts()}>
          <ListItemText secondary='Deleted Products' />
          <Divider />
        </ListItem>
        <ListItem button onClick={() => handleActiveProducts()}>
          <ListItemText secondary='Active Products' />
          <Divider />
        </ListItem>
        <ListItem button onClick={() => handleBoughtProducts()}>
          <ListItemText secondary='Bough Products' />
          <Divider />
        </ListItem>
        <ListItem button onClick={() => handleCartProducts()}>
          <ListItemText secondary='In Cart/Not Bought Products' />
          <Divider />
        </ListItem>
      </Grid>
    );
  };
  return (
    <>
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

const cards = () => {
  return (
    <>
      <Card text='dark' bg='danger' style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>Number Of users</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
        </Card.Body>
      </Card>

      <Card text='dark' bg='warning' style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>Number Of Products</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
        </Card.Body>
      </Card>

      <Card text='dark' bg='info' style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};
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
  allCProducts
};

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
