import superagent from 'superagent';
import cookie from 'react-cookies';
const API_LINK_Admin = 'https://sportopiav1.herokuapp.com';
let token = cookie.load('token');

// Sellers function
export const allSellers = () => {
  return (dispatch) => {
    return superagent
      .get(`${API_LINK_Admin}/sellers`)
      .set('authorization', `Basic ${token}`)
      .then((res) => {
        dispatch(getAllSellers(res.body.result));
      })
      .catch((e) => {
        console.error(e);
      });
  };
};

export const allActiveSellers = () => {
  return (dispatch) => {
    return superagent
      .get(`${API_LINK_Admin}/activesellers`)
      .set('authorization', `Basic ${token}`)
      .then((res) => {
        dispatch(getActivatedSellers(res.body.result));
      });
  };
};

export const allDeActiveSellers = () => {
  return (dispatch) => {
    return superagent
      .get(`${API_LINK_Admin}/deactivatedsellers`)
      .set('authorization', `Basic ${token}`)
      .then((res) => {
        dispatch(getDeactivatedSellers(res.body.result));
      });
  };
};

// Buyers

export const allBuyers = () => {
  return (dispatch) => {
    return superagent
      .get(`${API_LINK_Admin}/buyers`)
      .set('authorization', `Basic ${token}`)
      .then((res) => {
        dispatch(getAllBuyers(res.body.result));
      });
  };
};

export const allActiveBuyers = () => {
  return (dispatch) => {
    return superagent
      .get(`${API_LINK_Admin}/activebuyers`)
      .set('authorization', `Basic ${token}`)
      .then((res) => {
        dispatch(getActivatedBuyers(res.body.result));
      });
  };
};

export const allDeActiveBuyers = () => {
  return (dispatch) => {
    return superagent
      .get(`${API_LINK_Admin}/deactivatedbuyers`)
      .set('authorization', `Basic ${token}`)
      .then((res) => {
        dispatch(getDeactivatedBuyers(res.body.result));
      });
  };
};

// Products
export const allProducts = () => {
  return (dispatch) => {
    return superagent
      .get(`${API_LINK_Admin}/allproducts`)
      .set('authorization', `Basic ${token}`)
      .then((res) => {
        dispatch(getAllProducts(res.body.result));
      });
  };
};

// Functions

export const getAllSellers = (payload) => {
  return {
    type: 'GET_SELLERS',
    payload: payload
  };
};

export const getAllBuyers = (payload) => {
  return {
    type: 'GET_BUYER',
    payload: payload
  };
};

export const getActivatedSellers = (payload) => {
  return {
    type: 'GET_A_SELLERS',
    payload: payload
  };
};

export const getActivatedBuyers = (payload) => {
  return {
    type: 'GET_A_BUYER',
    payload: payload
  };
};

export const getDeactivatedBuyers = (payload) => {
  return {
    type: 'GET_D_BUYER',
    payload: payload
  };
};

export const getDeactivatedSellers = (payload) => {
  return {
    type: 'GET_D_SELLER',
    payload: payload
  };
};

export const getAllProducts = (payload) => {
  return {
    type: 'GET_All_PRO',
    payload: payload
  };
};

export const getAllDeactivatedProducts = (payload) => {
  return {
    type: 'GET_All_D_PRO',
    payload: payload
  };
};

export const getAllActiveProducts = (payload) => {
  return {
    type: 'GET_All_A_PRO',
    payload: payload
  };
};

export const getAllBoughtProducts = (payload) => {
  return {
    type: 'GET_All_B_PRO',
    payload: payload
  };
};

export const getAllCartProducts = (payload) => {
  return {
    type: 'GET_All_C_PRO',
    payload: payload
  };
};

export const getAllFavProducts = (payload) => {
  return {
    type: 'GET_All_F_PRO',
    payload: payload
  };
};
