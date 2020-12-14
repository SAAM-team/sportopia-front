import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import categories from '../reducers/categories-reducer';
import products from '../reducers/products-reducer';
import bidding from '../reducers/bidding';
import admin from '../reducers/admin_reducer';
import cartData from '../reducers/cart-reducer';
import favoriteData from '../reducers/favorite-reducer';


let reducers = combineReducers({ categories, products, bidding, admin, cartData,favoriteData });

const store = () => {
  return createStore(reducers, applyMiddleware(thunk));
};

export default store();
