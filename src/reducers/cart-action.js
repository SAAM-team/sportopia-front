import superagent from 'superagent';
import cookie from 'react-cookies';
let api = 'https://sportopiav1.herokuapp.com';
let token = cookie.load('token');


export const getCartAPI = () => {
  return (dispatch) => {
    return superagent
      .get(`${api}/cart/getcart`)
      .set('authorization', `Basic ${token}`)
      .then((res) => {
        dispatch(getCart(res.body.cart));
      });
  };
};

export const createCart = (product) => {
  return (dispatch) => {
    // console.log('yallaaa 3aaad');
    return superagent
      .post(`${api}/cart/add/${product.id}`)
      .set('authorization', `Basic ${token}`)
      .send({ name: product })
      .then((res) => {
        console.log(res);
      });
  };
};



export const getCart = (items) => {
  return {
    type: 'GET-CART',
    payload: items
  }
}
export const addToCart = (AddedItem) => {
  return {
    type: 'ADD-CART',
    payload: AddedItem
  }
}

export const removeFromCart = (productID) => {
  console.log('inside the delete',productID);
  return (dispatch) => {
    // console.log('yallaaa 3aaad');
    return superagent
      .delete(`${api}/cart/delete/${productID}`)
      .set('authorization', `Basic ${token}`)
      .then((res) => {
        console.log(res);
      });
  };
};
