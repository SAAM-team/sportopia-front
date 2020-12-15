import superagent from 'superagent';
import cookie from 'react-cookies';
let api = 'https://sportopiav1.herokuapp.com';
let token = cookie.load('token');


export const getFavAPI = () => {
  return (dispatch) => {
    return superagent
      .get(`${api}/favorite/get`)
      .set('authorization', `Basic ${token}`)
      .then((res) => {
        console.log('res.body.cart',res.body);
        dispatch(getFav(res.body.product));
      });
  };
};

export const createFav = (product) => {
  return (dispatch) => {
    // console.log('yallaaa 3aaad');
    return superagent
      .post(`${api}/favorite/add/${product.id}`)
      .set('authorization', `Basic ${token}`)
      .send({ name: product })
      .then((res) => {
        console.log(res);
      });
  };
};



export const getFav = (items) => {
  return {
    type: 'GET-FAV',
    payload: items
  }
}
export const addToFav = (AddedItem) => {
  return {
    type: 'ADD-FAV',
    payload: AddedItem
  }
}

export const removeFromFav = (productID) => {
  console.log('inside the fav',productID);
  return (dispatch) => {
    console.log('yallaaa 3aaad');
    return superagent
      .delete(`${api}/favorite/delete/${productID}`)
      .set('authorization', `Basic ${token}`)
      .then((res) => {
        console.log(res);
      });
  };
};
