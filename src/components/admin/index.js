/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { StateContext } from '../../context/global-state';
import { Jumbotron, Container } from 'react-bootstrap/';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { If, Then, Else } from '../../if/if';
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
  TableRow
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
  allProducts
} from '../../reducers/admin_actions';

// Table Info

let rowsS = [];
let rowsB = [];
let rows = [];

export function Admin(props) {
  const [keys, setKeys] = useState([]);
  const stateContext = useContext(StateContext);
  // Effect

  useEffect(() => {
    // handleAllSellers();
  }, []);

  useEffect(() => {
    rowsS = [];
    rowsB = [];
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
        rows = [...rowsS];
      } else {
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
        rows = [...rowsB];
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
  return (
    <Grid
      container
      direction='row'
      justify='space-between'
      alignItems='center'
      spacing={4}
    >
      <Grid item xs={12} lg={3}>
        <ListItem button onClick={() => handleAllSellers()}>
          <ListItemText primary='All Sellers' />
          <Divider />
        </ListItem>
        <ListItem button onClick={() => handleAllActiveSeller()}>
          <ListItemText primary='All Active Sellers' />
          <Divider />
        </ListItem>
        <ListItem button onClick={() => handleAllDeActiveSeller()}>
          <ListItemText primary='All Deactivate Sellers' />
          <Divider />
        </ListItem>
        <ListItem button onClick={() => handleAllBuyers()}>
          <ListItemText primary='All Buyers' />
          <Divider />
        </ListItem>
        <ListItem button>
          <ListItemText primary='All Active Buyers' />
          <Divider />
        </ListItem>
        <ListItem button>
          <ListItemText primary='All Deactivate Buyers' />
          <Divider />
        </ListItem>
        <ListItem button>
          <ListItemText primary='All Products' />
          <Divider />
        </ListItem>
      </Grid>
      <Grid item xs={12} lg={9}>
        <TableContainer component={Paper}>
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
                </Else>
              </If>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
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
  }
}));

// Table Functions
function createSData(name, role, company, address, telephone) {
  return { name, role, company, address, telephone };
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
  allProducts
};

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
