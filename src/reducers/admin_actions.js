import superagent from 'superagent';
const API_LINK_Admin = 'https://sportopiav1.herokuapp.com/';

// Sellers function
export const allSellers = () => {
  return (dispatch) => {
    return superagent.get(`${API_LINK_Admin}/sellers`).then((res) => {});
  };
};

export const allActiveSellers = () => {
  return (dispatch) => {
    return superagent.get(`${API_LINK_Admin}/activesellers`).then((res) => {});
  };
};

export const allDeActiveSellers = () => {
  return (dispatch) => {
    return superagent
      .get(`${API_LINK_Admin}/deactivatedsellers`)
      .then((res) => {});
  };
};

// Buyers

export const allBuyers = () => {
  return (dispatch) => {
    return superagent.get(`${API_LINK_Admin}/buyers`).then((res) => {});
  };
};

export const allActiveBuyers = () => {
  return (dispatch) => {
    return superagent.get(`${API_LINK_Admin}/activebuyers`).then((res) => {});
  };
};

export const allDeActiveBuyers = () => {
  return (dispatch) => {
    return superagent
      .get(`${API_LINK_Admin}/deactivatedbuyers`)
      .then((res) => {});
  };
};

// Products
export const allProducts = () => {
  return (dispatch) => {
    return superagent.get(`${API_LINK_Admin}/allproducts`).then((res) => {});
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
