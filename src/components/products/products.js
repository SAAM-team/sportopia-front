import React, { useEffect } from 'react'
import { getRemoteData } from '../../store/actions/product-action ';
import { connect } from 'react-redux';
import './products.css';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { CardHeader, Zoom, Tooltip, Badge } from '@material-ui/core';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ShoppingCartRoundedIcon from '@material-ui/icons/ShoppingCartRounded';
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';


const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 300,
        // maxHeight:500,
        boxShadow: '0 0 10px 0px rgba(0, 0, 0, 0.25)'
    },
    media: {
        height: 0,
        paddingTop: '100%', // 16:9
    },
    header: {
        height: 175,
        // paddingBottom: '0', // 16:9
        alignItems: 'center'
    },

}));


function Products(props) {
    const classes = useStyles();


    useEffect(() => {
        props.getRemoteData();
    }, [])

    return (

        <>
               {/* <Typography style={{ marginLeft: '45%', marginBottom:'20px', color:'#050505' }} variant="h3" noWrap>
              Products: 
            </Typography> */}
            <section className="container">
                {

                    props.products.map(product => {
                        return (

                            <Card className={classes.root}>
                                <CardMedia
                                    className={classes.media}
                                    image={product.main_img}
                                    title={product.id}
                                />
                                <CardHeader
                                    className={classes.header}
                                    title={product.name}
                                    subheader={product.description}
                                />
                                <CardActions disableSpacing>
                                    <CardContent>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            price: {product.price} $
                                         </Typography>
                                    </CardContent>
                                    <Tooltip placement="top" arrow TransitionComponent={Zoom} title="add to favorite">
                                        <IconButton aria-label="show 4 new mails" color="inherit">
                                            <Badge badgeContent={0} color="secondary">
                                                <FavoriteRoundedIcon />
                                            </Badge>
                                        </IconButton>
                                    </Tooltip>

                                    <Tooltip placement="top" arrow TransitionComponent={Zoom} title="add to cart">
                                        <IconButton aria-label="show 4 new mails" color="inherit">
                                            <Badge badgeContent={0} color="secondary">
                                                <ShoppingCartRoundedIcon />
                                            </Badge>
                                        </IconButton>
                                    </Tooltip>

                                </CardActions>

                            </Card>
                        )
                    })
                }
            </section>
        </>


       
        
    );
}




const mapStateToProps = (state) => {
    console.log('state inside the product',state);
    return {
        products: state.products.results,
    };
};
const mapDispatchToProps = { getRemoteData };

export default connect(mapStateToProps, mapDispatchToProps)(Products);
