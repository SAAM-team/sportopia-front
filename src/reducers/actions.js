import superagent from 'superagent';
import cookie from 'react-cookies';
import jwt from 'jsonwebtoken';

const API_LINK_Bidding = 'https://sportopiav1.herokuapp.com/bidding';
// const API_LINK_Bidding = 'http://localhost:8000/bidding';
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
let user = validateToken(token);
export const getBiddingItems = () => {
  return (dispatch) => {
    return superagent
      .get(`${API_LINK_Bidding}/${user.user_id}`)
      .set('Content-Type', 'application/json')
      .then((res) => {
        dispatch(getBid(res.body.allProducts));
      })
      .catch((e) => {
        console.error(e.message);
      });
  };
};

export const getInsideBid = (product_id) => {
  console.log(product_id);
  return (dispatch) => {
    return superagent
      .get(`${API_LINK_Bidding}/product/${product_id}`)
      .then((res) => {
        console.log('here my fried', res);
        dispatch(enterRoom(res.body.product));
      });
  };
};

export const getBid = (payload) => {
  return {
    type: 'GET_UNDER_BID',
    payload: payload
  };
};

export const enterRoom = (payload) => {
  return {
    type: 'ENTER_ROOM',
    payload: payload
  };
};
