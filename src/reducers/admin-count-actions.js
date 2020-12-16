import superagent from 'superagent';
import cookie from 'react-cookies';
const API_LINK_Admin = 'https://sportopiav1.herokuapp.com';
let token = cookie.load('token');

export const sellers = () => {
  return (dispatch) => {
    return superagent
      .get(`${API_LINK_Admin}/sellerscount`)
      .set('authorization', `Basic ${token}`)
      .then((res) => {
        return res.body.number;
      });
  };
};

export const dSellers = () => {
  return (dispatch) => {
    return superagent
      .get(`${API_LINK_Admin}/dsellerscount`)
      .set('authorization', `Basic ${token}`)
      .then((res) => {
        return res.body.number;
      });
  };
};

export const aSellers = () => {
  return (dispatch) => {
    return superagent
      .get(`${API_LINK_Admin}/asellerscount`)
      .set('authorization', `Basic ${token}`)
      .then((res) => {
        return res.body.number;
      });
  };
};

export const buyers = () => {
  return (dispatch) => {
    return superagent
      .get(`${API_LINK_Admin}/buyerscount`)
      .set('authorization', `Basic ${token}`)
      .then((res) => {
        return res.body.number;
      });
  };
};

export const aBuyers = () => {
  return (dispatch) => {
    return superagent
      .get(`${API_LINK_Admin}/abuyerscount`)
      .set('authorization', `Basic ${token}`)
      .then((res) => {
        return res.body.number;
      });
  };
};

export const dBuyers = () => {
  return (dispatch) => {
    return superagent
      .get(`${API_LINK_Admin}/dbuyerscount`)
      .set('authorization', `Basic ${token}`)
      .then((res) => {
        return res.body.number;
      });
  };
};

export const products = () => {
  return (dispatch) => {
    return superagent
      .get(`${API_LINK_Admin}/productscount`)
      .set('authorization', `Basic ${token}`)
      .then((res) => {
        return res.body.number;
      });
  };
};

export const dProducts = () => {
  return (dispatch) => {
    return superagent
      .get(`${API_LINK_Admin}/dproductscount`)
      .set('authorization', `Basic ${token}`)
      .then((res) => {
        return res.body.number;
      });
  };
};

export const aProducts = () => {
  return (dispatch) => {
    return superagent
      .get(`${API_LINK_Admin}/aproductscount`)
      .set('authorization', `Basic ${token}`)
      .then((res) => {
        return res.body.number;
      });
  };
};

export const bProducts = () => {
  return (dispatch) => {
    return superagent
      .get(`${API_LINK_Admin}/bproductscount`)
      .set('authorization', `Basic ${token}`)
      .then((res) => {
        return res.body.number;
      });
  };
};

export const cProducts = () => {
  return (dispatch) => {
    return superagent
      .get(`${API_LINK_Admin}/cproductscount`)
      .set('authorization', `Basic ${token}`)
      .then((res) => {
        return res.body.number;
      });
  };
};
