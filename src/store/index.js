import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import bidding from '../reducers/bidding';

const reducers = combineReducers({ bidding });

const store = () => {
  return createStore(reducers, applyMiddleware(thunk));
};

export default store();
