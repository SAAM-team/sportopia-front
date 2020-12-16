/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import {
  getRemoteData,
  activeCategory,
} from "../../reducers/categories-action";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { fade, makeStyles } from "@material-ui/core/styles";
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
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import PersonRoundedIcon from "@material-ui/icons/PersonRounded";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import FavoriteRoundedIcon from "@material-ui/icons/FavoriteRounded";
import GavelRoundedIcon from "@material-ui/icons/GavelRounded";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import PropTypes from "prop-types";
import ShoppingCartRoundedIcon from "@material-ui/icons/ShoppingCartRounded";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Auth from "../../auth/auth";
import cookies from "react-cookies";

import { getCartAPI } from "../../reducers/cart-action";
import { getFavAPI } from "../../reducers/favorit-action";

import logo from "./assets/sportopia-logo.png";
import "./css/style.css";
import "./css/bootstrap.min.css";
import "./css/font-awesome.min.css";
import "./css/nouislider.min.css";
import "./css/nouislider.min.css";
import "./css/slick.css";
import a1 from "./assets/11.gif";
import a2 from "./assets/12.gif";
import a3 from "./assets/13.gif";
import a4 from "./assets/14.gif";
import a5 from "./assets/15.gif";
import a6 from "./assets/16.gif";
import a7 from "./assets/17.gif";
import a8 from "./assets/18.gif";
const avatarIcons = [a1, a2, a3, a4, a5, a6, a7, a8];

function Header(props) {
  const classes = useStyles();

  useEffect(() => {
    props.getRemoteData();
    props.getCartAPI();
    props.getFavAPI();
  }, []);
  const [state, setState] = React.useState(false);

  const saveCategoryId = (id) => {
    cookies.save("cId", id);
    props.activeCategory(id);
  };

  const menuId = "primary-search-account-menu";
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const list = (anchor) => (
    <div
      // style={{backgroundColor: '#6BAB90', height: '100%', color:'E1F0C4' }}
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
    >
      <Typography style={{ padding: "10px 0px 5px 10px" }} variant="h4" noWrap>
        Categories
      </Typography>
      <Divider />
      <List>
        {props.categories.map((category, index) => (
          <>
            <NavLink
              color="inherit"
              to={`/category/${category.id}`}
              onClick={() => {
                saveCategoryId(category.id);
                // props.getRemoteData()
              }}
            >
              <ListItem button key={category.id}>
                <ListItemAvatar>
                  <Avatar alt="" src={avatarIcons[index]} />
                </ListItemAvatar>
                <ListItemText primary={category.category_name} />
              </ListItem>
            </NavLink>
            <Divider />
          </>
        ))}
      </List>
    </div>
  );

  // end of drawer

  return (
    <>
      <header>
        <div id="top-header">
          <div className="container" style={{ height: "fit-content" }}>
            <ul className="header-links pull-left">
              <li>
                <a href="#">
                  <i className="fa fa-phone"></i> +962781409518
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fa fa-envelope-o"></i> saamteam@hotmail.com
                </a>
              </li>
              {/* <li><a href="#"><i className="fa fa-map-marker"></i> 1734 Stonecoal Road</a></li> */}
            </ul>
            <ul className="header-links pull-right">
              {/* <li><a href="#"><i className="fa fa-dollar"></i> USD</a></li> */}
              <li style={{ height: "5px" }}>
                <Tooltip
                  placement="top"
                  arrow
                  TransitionComponent={Zoom}
                  title="sign in / up"
                >
                  <NavLink to="/register" style={{ color: "#157A6E" }}>
                    {/* <IconButton
                      edge="end"
                      aria-label="account of current user"
                      aria-controls={menuId}
                      aria-haspopup="true"
                      color="inherit"
                    >
                      <PersonRoundedIcon style={{ fontSize: 25 }} />
                    </IconButton> */}
                    <i class="fa fa-user-o"></i>
                  </NavLink>
                </Tooltip>
                <strong style={{ color: "#fff", textDecoration: "none" }}>
                  Hello user
                </strong>
              </li>
            </ul>
          </div>
        </div>

        <div
          id="header"
          style={{
            justifyContent: "space-between",
            borderBottom: "3px solid #157A6E",
          }}
        >
          <div className="container">
            <div className="row">
              <div style={{ marginTop: "-10px" }} className="col-md-3 gridBar">
                <div className="drawer">
                  <IconButton
                    edge="start"
                    className={classes.menuButton}
                    color="inherit"
                    aria-label="open drawer"
                    onClick={toggleDrawer("left", true)}
                  >
                    <MenuIcon
                      style={{ color: "white", fontSize: "35px" }}
                    ></MenuIcon>
                  </IconButton>
                  <div className={classes.grow} />
                  <div>
                    <React.Fragment key={"left"}>
                      <Drawer
                        anchor="left"
                        open={state["left"]}
                        onClose={toggleDrawer("left", false)}
                      >
                        {list("left")}
                      </Drawer>
                    </React.Fragment>
                  </div>
                </div>
                <div className="header-logo">
                  <NavLink to="/">
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar
                          alt=""
                          style={{ width: "50px", height: "50px" }}
                          src={logo}
                        />
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
                    <input
                      className="input"
                      style={{ display: 'inline', marginRight: '4px', borderRadius: "40px 40px 40px 40px" }}
                      placeholder="Search here"
                    ></input>
                    <button
                      style={{height:'42px', borderRadius: "40px 40px 40px 40px" }}

                      className="search-btn">Search</button>
                  </form>
                </div>
              </div>
              {/* ................................icons........................................ */}
              <div className="col-md-3 "style={{marginTop:'10px'}}>
                <div className=" headerGrid">
                  <div>
                    <Auth role={"admin"}>
                      <NavLink
                        color="inherit"
                        to="/admin"
                        style={{ color: "white" }}
                      >
                        Admin
                      </NavLink>
                    </Auth>
                  </div>
                  <NavLink to={"/bidding"} style={{ color: "white" }}>
                    <div>
                      <Tooltip
                        placement="top"
                        arrow
                        TransitionComponent={Zoom}
                        title="bids list"
                      >
                        <IconButton
                          aria-label="show 17 new notifications"
                          color="inherit"
                          style={{ color: "white" }}
                        >
                          <Badge badgeContent={17} color="secondary">
                            <GavelRoundedIcon style={{ fontSize: 25 }} />
                          </Badge>
                        </IconButton>
                      </Tooltip>
                    </div>
                  </NavLink>
                  <div>
                    <NavLink to={"/favorite"} style={{ color: "white" }}>
                      <Tooltip
                        placement="top"
                        arrow
                        TransitionComponent={Zoom}
                        title="My Favorite"
                      >
                        <IconButton
                          aria-label="show 4 new mails"
                          color="inherit"
                        >
                          <Badge
                            badgeContent={props.favLength}
                            color="secondary"
                          >
                            <FavoriteRoundedIcon style={{ fontSize: 25 }} />
                          </Badge>
                        </IconButton>
                      </Tooltip>
                    </NavLink>
                  </div>
                  <div>
                    <NavLink to={"/cart"} style={{ color: "white" }}>
                      <Tooltip
                        placement="top"
                        arrow
                        TransitionComponent={Zoom}
                        title="My Cart"
                      >
                        <IconButton
                          aria-label="show 4 new mails"
                          color="inherit"
                        >
                          <Badge
                            badgeContent={props.cartLength}
                            color="secondary"
                            style={{ fontSize: 10 }}
                          >
                            <ShoppingCartRoundedIcon style={{ fontSize: 25 }} />
                          </Badge>
                        </IconButton>
                      </Tooltip>
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  root: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  list: {
    width: 250,
    backgroundColor: "#6BAB90",
    height: "100%",
    color: "E1F0C4",
    borderBottom: "1px solid black",
  },
  fullList: {
    width: "auto",
  },
}));

const mapStateToProps = (state) => {
  // console.log('state',state.cartData.cartItem.length);
  return {
    categories: state.categories.results,
    cartLength: state.cartData.cartItem.length,
    favLength: state.favoriteData.favoriteItem.length,
  };
};
const mapDispatchToProps = {
  getRemoteData,
  activeCategory,
  getCartAPI,
  getFavAPI,
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
