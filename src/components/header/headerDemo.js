/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import {
  getRemoteData,
  activeCategory
} from '../../reducers/categories-action';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {
  List,
  Divider,
  Drawer,
  ListItem,
  ListItemText,
  Fab,
  Tooltip,
  Zoom,
  Menu,
  MenuItem,
  Badge,
  InputBase,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';
import GavelRoundedIcon from '@material-ui/icons/GavelRounded';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import PropTypes from 'prop-types';
import ShoppingCartRoundedIcon from '@material-ui/icons/ShoppingCartRounded';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Auth from '../../auth/auth';
import cookies from 'react-cookies';

import {
  getCartAPI
} from '../../reducers/cart-action';
import {
  getFavAPI
} from '../../reducers/favorit-action';

import logo from './assets/sportopia-logo.png'
import './css/style.css';
import './css/bootstrap.min.css';
import './css/font-awesome.min.css';
import './css/nouislider.min.css';
import './css/nouislider.min.css';
import './css/slick.css';

function Header(props) {

  useEffect(() => {
    props.getRemoteData();
    props.getCartAPI();
    props.getFavAPI();
  }, []);

  const menuId = 'primary-search-account-menu';


  // end of drawer

  return (
    <>
      <header>
        <div id="top-header">
          <div className="container">
            <ul className="header-links pull-left">
              <li><a href="#"><i className="fa fa-phone"></i> +962781409518</a></li>
              <li><a href="#"><i className="fa fa-envelope-o"></i> saamteam@hotmail.com</a></li>
              {/* <li><a href="#"><i className="fa fa-map-marker"></i> 1734 Stonecoal Road</a></li> */}
            </ul>
            <ul className="header-links pull-right">
              {/* <li><a href="#"><i className="fa fa-dollar"></i> USD</a></li> */}
              <li>
                <NavLink to="/register">
                  <Tooltip
                    placement="top"
                    arrow
                    TransitionComponent={Zoom}
                    title="sign in / up"
                  >
                    <i className="fa fa-user-o">

                    </i>
                  </Tooltip>
                  <strong style={{ color: '#fff', textDecoration: 'none' }}>Hello user</strong>
                </NavLink>


              </li>
            </ul>
          </div>
        </div>

        <div id="header">
          <div className="container">
            <div className="row">
              <div style={{ marginTop: '-10px' }} className="col-md-3">
                <div className="header-logo">
                  <NavLink to="/">
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar alt='' style={{ width: '70px', height: '70px' }} src={logo} />
                      </ListItemAvatar>
                      <ListItemText
                      // primary='Sportopia'

                      />
                    </ListItem>

                  </NavLink>
                </div>
              </div>

              <div className="col-md-6">
                <div className="header-search">
                  <form>
                    <input className="input" style={{ borderRadius: '40px 0px 0px 40px' }} placeholder="Search here"></input>
                    <button className="search-btn">Search</button>
                  </form>
                </div>
              </div>

              <div className="col-md-3 clearfix">
                <div className="header-ctn">
                  

                  <div >
                    {/* <a className="dropdown-toggle" > */}
                      <NavLink to={'/cart'} style={{color:'white'}}>
                        <Tooltip
                          placement='top'
                          arrow
                          TransitionComponent={Zoom}
                          title='My Cart'
                        >
                          <IconButton aria-label='show 4 new mails' color='inherit'>
                            {/* <Badge badgeContent={0} color='secondary'> */}
                            <Badge badgeContent={props.cartLength} color='secondary' style={{ fontSize: 10 }}>
                              <ShoppingCartRoundedIcon style={{ fontSize: 25 }}/>
                            </Badge>
                          </IconButton>
                        </Tooltip>
                        
                      </NavLink>

                    {/* </a> */}
                   
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  )

}



const mapStateToProps = (state) => {
  // console.log('state',state.cartData.cartItem.length);
  return {
    categories: state.categories.results,
    cartLength: state.cartData.cartItem.length,
    favLength: state.favoriteData.favoriteItem.length
  };
};
const mapDispatchToProps = { getRemoteData, activeCategory, getCartAPI, getFavAPI };
export default connect(mapStateToProps, mapDispatchToProps)(Header);
