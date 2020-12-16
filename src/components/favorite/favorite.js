import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import {
    getFavAPI,
    updateRemoteCart,
    removeFromFav
} from '../../reducers/favorit-action';

import { Container, CardMedia, Grid, Card, CardContent, CardActions, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
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

const useStyles = makeStyles((theme) => ({
    '@global': {
        ul: {
            margin: 0,
            padding: 0,
            listStyle: 'none',
        },
    },
    appBar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    toolbarTitle: {
        flex: 1,
    },
    fullHeight: {
        height: "100%"
    },
    card: {
        margin: '1em',
    },
    media: {
        height: 0,
        paddingTop: '56.25%',
        borderTopLeftRadius: '5px',
        borderTopRightRadius: '5px'
    },
    grid2: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'initial'
    },
    jss5: {
        padding: '64px 0px 48px'
    },
    grid1: {
        paddingTop: '24px',
        paddingBottom: '24px'
    }
}));



const Favorite = props => {
    console.log('favvvvvvvv', props);
    useEffect(() => {
        props.getFavAPI();
    }, []);

    const removeHandler = (p_id) => {
        removeFromFav(p_id);
    }
    const classes = useStyles();
    if (!user || user.role === 'buyer') {
        return (
            <>
                <Typography style={{ padding: '10px 0px 5px 10px', marginTop: '50px' }} variant='h3' align='center' noWrap>
                    Favorite List
      </Typography>
                {props.favoriteData.favoriteItem.map((item, idx) => {
                    console.log('props', props.favoriteData.favoriteItem[idx].is_deleted);
                    if (props.favoriteData.favoriteItem[idx].is_deleted === false) {
                        return (
                            <>
                                <Container key={idx} maxWidth="md" component="main">

                                    <Grid className={classes.grid1} container spacing={0} direction="row" justify="center" alignItems="center">
                                        <Grid className={classes.grid2} container item xs={6} sm={6} lg={6} >
                                            <Card key={idx} className={classes.card}>
                                                <CardContent >
                                                    <Typography variant="h5" color="textPrimary">
                                                        {item.name}
                                                    </Typography>
                                                    <CardMedia
                                                        className={classes.media}
                                                        image={item.main_img}
                                                        title={item.id}
                                                    />
                                                    <Typography variant="p" color="textSecondary">
                                                        Category: {item.category_name}
                                                        <br />
                                            Price:  {item.price}
                                                    </Typography>
                                                </CardContent>
                                                <CardActions>
                                                    <Button key={idx} style={{ fontSize: '0.9rem' }} color="secondary" onClick={() => removeHandler(item.p_id)} >Remove</Button>
                                                </CardActions>
                                            </Card>
                                        </Grid>
                                    </Grid>
                                </Container>

                            </>
                        )
                    }
                }

                )}


            </>
        )
    }
    else{
        return <Redirect to={'/'} />
    }

}




// const mapStateToProps = state => ({
//     // length: state.favoriteItem.length,
//     favoriteData: state.favoriteData,
// })
const mapStateToProps = (state) => {
    // console.log('state inside cart', state);
    return {
        favoriteData: state.favoriteData,

    };
};

const mapDispatchToProps = {
    getFavAPI,
    removeFromFav,
};


export default connect(mapStateToProps, mapDispatchToProps)(Favorite)
