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
        console.log('Here is your favorite', res.body);
        dispatch(getFav(res.body.product));
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
        dispatch(addToFav(res.body.product))
      });
  };
};

export const removeFromFav = (productID) => {
  console.log('Removing: ', `${api}/favorite/delete/${productID}`);
  return (dispatch) => {
    return superagent
      .patch(`${api}/favorite/delete/${productID}`)
      .send({ name: productID })
      .then((res) => {
        console.log('Here is the deleted fav item: ', res.body);
        dispatch(removeFromFavDispatch(res.body.product))

      });
  };
  // const requestOptions = {
  //   method: 'PATCH',
  //   headers: { 'Content-Type': 'application/json', 'authorization': `Basic ${token}` },
  //   body: JSON.stringify({ productID: productID })
  // };
  // return (dispatch) => {

  //   fetch(`${api}/favorite/delete/${productID}`, requestOptions)
  //     .then(response => response.json())
  //     .then(data => {
  //       console.log('Here is the deleted fav item: ', data.body);
  //       dispatch(removeFromFavDispatch(data.body.product))
  //     }
  //     );
  // }
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

export const removeFromFavDispatch = (removedItem) => {
  return {
    type: 'REMOVE-FAV',
    payload: removedItem
  }
}