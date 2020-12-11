import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import categories from '../reducers/categories-reducer';
import products from '../reducers/products-reducer';
import bidding from '../reducers/bidding';

let reducers = combineReducers({ categories, products, bidding });

const store = () => {
  return createStore(reducers, applyMiddleware(thunk));
};

export default store();
