import superagent from 'superagent';
import cookie from 'react-cookies';
import axios from 'axios';
let api = 'https://sportopiav1.herokuapp.com';
let token = cookie.load('token');

export const getFavAPI = () => {
  return (dispatch) => {
    return superagent
      .get(`${api}/favorite/get`)
      .set('authorization', `Basic ${token}`)
      .then((res) => {
        console.log('Here is your favorite', res.body);
        if (res.body) {
          dispatch(getFav(res.body.product));
        }
      });
  };
};

export const createFav = (product) => {
  return (dispatch) => {
    console.log('Adding', `${api}/favorite/add/${product.id}`);

    return superagent
      .post(`${api}/favorite/add/${product.id}`)
      .set('authorization', `Basic ${token}`)
      .send({ name: product })
      .then((res) => {
        console.log('Here is the new fav item: ', res.body);
        if (res.body.product) {
          dispatch(addToFav(res.body.product));
        } else {
          alert('You already have this');
        }
      });
  };
};

// Doesn't refresh, dispatch doesn't work
export const removeFromFav = (productID) => {
  console.log('Removing: ', `${api}/favorite/delete/${productID}`);
  return superagent
    .patch(`${api}/favorite/delete/${productID}`)
    .set('authorization', `Basic ${token}`)
    .set('Access-Control-Allow-Origin', '*')
    .set('Content-Type', 'application/json; charset=utf-8')
    .then((res) => {
      console.log('Here is the deleted fav item: ', res.body.product[0]);
      removeFromFavDispatch(res.body.product[0]);
    });
};

export const getFav = (items) => {
  return {
    type: 'GET-FAV',
    payload: items
  };
};
export const addToFav = (AddedItem) => {
  return {
    type: 'ADD-FAV',
    payload: AddedItem
  };
};

export const removeFromFavDispatch = (removedItem) => {
  return {
    type: 'REMOVE-FAV',
    payload: removedItem
  };
};
