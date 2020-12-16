import superagent from 'superagent';
import cookie from 'react-cookies';
import jwt from 'jsonwebtoken';
const API_LINK_Seller = 'https://sportopiav1.herokuapp.com/seller';
let token = cookie.load('token');
const JWT_SECRET = 'thebestsecrett';

const validateToken = (token) => {
  try {
    let user = jwt.verify(token, JWT_SECRET);
    return user;
  } catch (e) {
    console.log('this is the error in the');
  }
};
let user = validateToken(token);
console.log('this is the user of seller', user);

export const addProduct = (product) => {
  return (dispatch) => {
    return superagent
      .post(`${API_LINK_Seller}/add/${product.category_id}`)
      .set('authorization', `Basic ${token}`)
      .send({
        name: product.name,
        description: product.description,
        main_img: product.main_img,
        images: product.images,
        price: product.price,
        quantity: product.quantity,
        id_bid: product.id_bid
      })
      .then((res) => {
        console.log(res);
      });
  };
};
export const updateProduct = (product) => {
  return (dispatch) => {
    return superagent
      .put(`${API_LINK_Seller}/update/${product.id}`)
      .set('authorization', `Basic ${token}`)
      .send({
        name: product.name,
        description: product.description,
        main_img: product.main_img,
        images: product.images,
        price: product.price,
        category_id: product.category_id,
        quantity: product.quantity,
        id_bid: product.id_bid,
        id: product.id
      })
      .then((res) => {
        console.log(res);
      });
  };
};
export const deleteProduct = (product) => {
  return (dispatch) => {
    return superagent
      .delete(`${API_LINK_Seller}/delete/${product.id}`)
      .set('authorization', `Basic ${token}`)
      .send({
        id: product.id
      })
      .then((res) => {
        console.log(res);
      });
  };
};
export const allSellerProducts = () => {
  console.log('this is the token', token);
  return (dispatch) => {
    return superagent
      .get(`${API_LINK_Seller}/sellerproduct/${user.user_id}`)
      .set('authorization', `Basic ${token}`)
      .then((res) => {
        console.log('this is the results', res);
        dispatch(getAllSellerProducts(res.body.result));
      });
  };
};
export const getAllSellerProducts = (payload) => {
  return {
    type: 'GET_SELLERS_PRODUCT',
    payload: payload
  };
};
