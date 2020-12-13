import superagent from 'superagent';
import dotenv from 'dotenv';
import cookie from 'react-cookies';
let token = cookie.load('token');
dotenv.config();
const api = 'https://sportopiav1.herokuapp.com/all/products';
const api_details = 'https://sportopiav1.herokuapp.com/buyer/product';
const buy_api = 'https://sportopiav1.herokuapp.com/paypal/paypalpayment';
// let url = window.location.href.split('/');
// let productId = url[url.length - 1];

export const getRemoteData = () => {
  return (dispatch) => {
    return superagent.get(api).then((response) => {
      dispatch(getAction(JSON.parse(response.text).result));
    });
  };
};

export const getProductDetails = (productId) => {
  return (dispatch) => {
    return superagent
      .get(`${api_details}/${productId}`)
      .set('authorization', `Basic ${token}`)
      .then((response) => {
        dispatch(singleProductAction(response.body.productInfo));
      });
  };
};

export const buyUsingPaypal = (productId, counter) => {
  return (dispatch) => {
    return superagent
      .post(`${buy_api}/${productId}`)
      .send({ many: counter })
      .then((res) => {
        dispatch(buyProduct(res.text));
      });
  };
};

const getAction = (payload) => {
  return {
    type: 'GET_P',
    payload: payload,
  };
};

const singleProductAction = (payload) => {
  let array = [];
  array.push(payload);
  console.log('here ', array);
  return {
    type: 'GetSingleProductID',
    payload: array,
  };
};

const buyProduct = (payload) => {
  return {
    type: 'buyingProduct',
    payload: payload,
  };
};
