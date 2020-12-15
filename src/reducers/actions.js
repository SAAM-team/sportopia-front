import superagent from 'superagent';
import cookie from 'react-cookies';
import jwt from 'jsonwebtoken';

const API_LINK_Bidding = 'https://sportopiav1.herokuapp.com/bidding';
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
  console.log('inside the actions', product_id);
  return (dispatch) => {
    return superagent.get(`${API_LINK_Bidding}/${product_id}`).then((res) => {
      let product = JSON.parse(res.text).product;
      dispatch(enterRoom({ product }));
    });
  };
};

export const getBid = (payload) => {
  console.log(payload);
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
