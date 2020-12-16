/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import {
    getRemoteData,
    activeCategory
} from '../../reducers/categories-action';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { fade, makeStyles } from '@material-ui/core/styles';
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

import '../header/css/style.css';
import '../header/css/bootstrap.min.css';
import '../header/css/font-awesome.min.css';
import '../header/css/nouislider.min.css';
import '../header/css/nouislider.min.css';
import '../header/css/slick.css';


function Footer(props) {
    const classNamees = useStyles();

    useEffect(() => {
        props.getRemoteData();
        // props.getCartAPI();
        // props.getFavAPI();
    }, []);

    const saveCategoryId = (id) => {
        cookies.save('cId', id);
        props.activeCategory(id);
    }


    // end of drawer

    return (
        <>
            <footer id="footer">
                <div className="section" style={{ borderTop: '3px solid #157A6E' }}>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-3 col-xs-6">
                                <div className="footer">
                                    <h3 className="footer-title">About Us</h3>
                                    <p>Sportopia is the best choice for you to find all sport products in one place, search, find and buy!</p>
                                    <ul className="footer-links">
                                        <li><a href="#"><i className="fa fa-phone"></i> +962781409518</a></li>
                                        <li><a href="#"><i className="fa fa-envelope-o"></i>saamteam@hotmail.com</a></li>
                                    </ul>
                                </div>
                            </div>

                            <div className="col-md-3 col-xs-6">
                                <div className="footer">
                                    <h3 className="footer-title">Categories</h3>
                                    <ul className="footer-links">
                                        {props.categories.map((category, index) => (
                                            <>
                                                <li>
                                                    <NavLink color='inherit' to={`/category/${category.id}`}>

                                                        <a onClick={() => {
                                                            saveCategoryId(category.id);
                                                            // props.getRemoteData()
                                                        }}>{category.category_name}</a>
                                                    </NavLink>
                                                </li>

                                            </>
                                        ))}

                                    </ul>
                                </div>
                            </div>

                            <div className="clearfix visible-xs"></div>

                            <div className="col-md-3 col-xs-6">
                                <div className="footer">
                                    <h3 className="footer-title">Information</h3>
                                    <ul className="footer-links">
                                        <li><a href="#">About Us</a></li>
                                        <li><a href="#">Contact Us</a></li>
                                        <li><a href="#">Privacy Policy</a></li>
                                        <li><a href="#">Orders and Returns</a></li>
                                        <li><a href="#">Terms & Conditions</a></li>
                                    </ul>
                                </div>
                            </div>

                            <div className="col-md-3 col-xs-6">
                                <div className="footer">
                                    <h3 className="footer-title">Service</h3>
                                    <ul className="footer-links">
                                        <li><a href="#">My Account</a></li>
                                        <li><a href="#">View Cart</a></li>
                                        <li><a href="#">Wishlist</a></li>
                                        <li><a href="#">Track My Order</a></li>
                                        <li><a href="#">Help</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="bottom-footer" className="section">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 text-center">
                                <ul className="footer-payments">
                                    
                                    <li><a href="#"><i className="fa fa-cc-paypal"></i></a></li>
                                </ul>
                                <span className="copyright">
                                    Copyright &copy;<script>document.write(new Date().getFullYear());</script>  | SAAM TEAM
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

        </>
    )

}

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    root: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
    list: {
        width: 250,
        backgroundColor: '#6BAB90',
        height: '100%',
        color: 'E1F0C4',
        borderBottom: '1px solid black',
    },
    fullList: {
        width: 'auto',
    },
}));

const mapStateToProps = (state) => {
    // console.log('state',state.cartData.cartItem.length);
    return {
        categories: state.categories.results,
        cartLength: state.cartData.cartItem.length,
        favLength: state.favoriteData.favoriteItem.length
    };
};
const mapDispatchToProps = { getRemoteData, activeCategory, getCartAPI, getFavAPI };
export default connect(mapStateToProps, mapDispatchToProps)(Footer);
