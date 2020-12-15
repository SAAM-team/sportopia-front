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
  Button
} from '@material-ui/core';
import { fade, makeStyles } from '@material-ui/core/styles';
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
import a1 from './assets/11.gif';
import a2 from './assets/12.gif';
import a3 from './assets/13.gif';
import a4 from './assets/14.gif';
import a5 from './assets/15.gif';
import a6 from './assets/16.gif';
import a7 from './assets/17.gif';
import a8 from './assets/18.gif';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Auth from '../../auth/auth';
import cookies from 'react-cookies';
import { getCartAPI } from '../../reducers/cart-action';
import { getFavAPI } from '../../reducers/favorit-action';

const avatarIcons = [a1, a2, a3, a4, a5, a6, a7, a8];

function ScrollTop(props) {
  const { children, window } = props;
  const classes = useStyles();

  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      '#back-to-top-anchor'
    );

    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };
  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role='presentation' className={classes.root}>
        {children}
      </div>
    </Zoom>
  );
}
ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func
};
let notDeletedCart = [];
function Header(props) {
  // props.cart.map((item)=>{
  //   if (item.is_deleted === false){
  //    return notDeletedCart.push(item)
  //   }
  // })
  console.log('prrrrrrrrr', props);
  // console.log('nnnnnn', notDeletedCart);

  useEffect(() => {
    props.getRemoteData();
    // props.getCartAPI();
    // props.getFavAPI();
  }, []);

  const classes = useStyles();
  // start of drawer
  const [state, setState] = React.useState(false);

  const saveCategoryId = (id) => {
    cookies.save('cId', id);
    props.activeCategory(id);
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const list = (anchor) => (
    <div
      // style={{backgroundColor: '#6BAB90', height: '100%', color:'E1F0C4' }}
      className={classes.list}
      role='presentation'
      onClick={toggleDrawer(anchor, false)}
    >
      <Typography style={{ padding: '10px 0px 5px 10px' }} variant='h4' noWrap>
        Categories
      </Typography>
      <Divider />
      <List>
        {props.categories.map((category, index) => (
          <>
            <NavLink
              color='inherit'
              to={`/category/${category.id}`}
              onClick={() => {
                saveCategoryId(category.id);
                // props.getRemoteData()
              }}
            >
              <ListItem button key={category.id}>
                <ListItemAvatar>
                  <Avatar alt='' src={avatarIcons[index]} />
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
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <NavLink color='white' to={'/favorite'}>
        <MenuItem>
          <IconButton aria-label='show 4 new mails' color='inherit'>
            <Badge badgeContent={props.favLength} color='secondary'>
              <FavoriteRoundedIcon />
            </Badge>
          </IconButton>
          <p>My Favorite</p>
        </MenuItem>
      </NavLink>
      <NavLink color='white' to={'/cart'}>
        <MenuItem>
          <IconButton aria-label='show 11 new notifications' color='inherit'>
            {/* <Badge badgeContent={0} color='secondary'> */}
            <Badge badgeContent={props.cartLength} color='secondary'>
              <ShoppingCartRoundedIcon />
            </Badge>
          </IconButton>
          <p>My Cart</p>
        </MenuItem>
      </NavLink>
      {/* <MenuItem >
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <PersonRoundedIcon />
        </IconButton>
        <p>Profile</p>
      </MenuItem> */}
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar style={{ backgroundColor: '#157A6E' }} position='static'>
        <Toolbar>
          {/* ..................................burger view ......................................... */}

          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='open drawer'
            onClick={toggleDrawer('left', true)}
          >
            <MenuIcon></MenuIcon>
          </IconButton>
          <NavLink to='/'>
            <Typography className={classes.title} variant='h6' noWrap>
              Sportopia
            </Typography>
          </NavLink>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder='Search…'
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <div className={classes.grow} />
          <div>
            <React.Fragment key={'left'}>
              <Drawer
                anchor='left'
                open={state['left']}
                onClose={toggleDrawer('left', false)}
              >
                {list('left')}
              </Drawer>
            </React.Fragment>
          </div>

          {/* ................................icons on nav bar .................................... */}
          <div className={classes.sectionDesktop}>
            <Button color='inherit'>Sell</Button>
            <Auth role={'admin'}>
              <NavLink color='inherit' to='/admin'>
                Admin
              </NavLink>
            </Auth>

            <Tooltip
              placement='top'
              arrow
              TransitionComponent={Zoom}
              title='bids list'
            >
              <IconButton
                aria-label='show 17 new notifications'
                color='inherit'
              >
                <Badge badgeContent={17} color='secondary'>
                  <GavelRoundedIcon />
                </Badge>
              </IconButton>
            </Tooltip>
            <NavLink color='white' to={'/favorite'}>
              <Tooltip
                placement='top'
                arrow
                TransitionComponent={Zoom}
                title='My Favorite'
              >
                <IconButton aria-label='show 4 new mails' color='inherit'>
                  <Badge badgeContent={props.favLength} color='secondary'>
                    <FavoriteRoundedIcon />
                  </Badge>
                </IconButton>
              </Tooltip>
            </NavLink>
            <NavLink color='white' to={'/cart'}>
              <Tooltip
                placement='top'
                arrow
                TransitionComponent={Zoom}
                title='My Cart'
              >
                <IconButton aria-label='show 4 new mails' color='inherit'>
                  {/* <Badge badgeContent={0} color='secondary'> */}
                  <Badge badgeContent={props.cartLength} color='secondary'>
                    <ShoppingCartRoundedIcon />
                  </Badge>
                </IconButton>
              </Tooltip>
            </NavLink>
            <Tooltip
              placement='top'
              arrow
              TransitionComponent={Zoom}
              title='sign in / up'
            >
              <NavLink to='/register'>
                <IconButton
                  edge='end'
                  aria-label='account of current user'
                  aria-controls={menuId}
                  aria-haspopup='true'
                  onClick={handleProfileMenuOpen}
                  color='inherit'
                >
                  <PersonRoundedIcon />
                </IconButton>
              </NavLink>
            </Tooltip>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label='show more'
              aria-controls={mobileMenuId}
              aria-haspopup='true'
              onClick={handleMobileMenuOpen}
              color='inherit'
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <Toolbar id='back-to-top-anchor' />

      {renderMobileMenu}
      {/* {renderMenu} */}
      <ScrollTop {...props}>
        <Fab
          style={{ backgroundColor: '#157A6E' }}
          size='small'
          aria-label='scroll back to top'
        >
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    }
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto'
    }
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    color: 'inherit'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch'
    }
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex'
    }
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
  root: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  },
  list: {
    width: 250,
    backgroundColor: '#6BAB90',
    height: '100%',
    color: 'E1F0C4',
    borderBottom: '1px solid black'
  },
  fullList: {
    width: 'auto'
  }
}));

const mapStateToProps = (state) => {
  // console.log('state',state.cartData.cartItem.length);
  return {
    categories: state.categories.results,
    cartLength: state.cartData.cartItem.length,
    favLength: state.favoriteData.favoriteItem.length
  };
};
const mapDispatchToProps = {
  getRemoteData,
  activeCategory,
  getCartAPI,
  getFavAPI
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
