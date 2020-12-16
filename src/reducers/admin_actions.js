import superagent from 'superagent';
import cookie from 'react-cookies';
const API_LINK_Admin = 'https://sportopiav1.herokuapp.com';
let token = cookie.load('token');

// Active and Deductive

export const toggleUser = (id) => {
  return (dispatch) => {
    return superagent
      .post(`${API_LINK_Admin}/toggle/${id}`)
      .set('authorization', `Basic ${token}`)
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.error(e);
      });
  };
};

export const toggleProduct = (id) => {
  return (dispatch) => {
    return superagent
      .post(`${API_LINK_Admin}/delete/products/${id}`)
      .set('authorization', `Basic ${token}`)
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.error(e);
      });
  };
};

// Sellers function

export const allSellers = (pageNumber) => {
  pageNumber = pageNumber - 1;
  return (dispatch) => {
    return superagent
      .get(`${API_LINK_Admin}/sellers/${pageNumber}`)
      .set('authorization', `Basic ${token}`)
      .then((res) => {
        dispatch(getAllSellers(res.body.result));
      })
      .catch((e) => {
        console.error(e);
      });
  };
};

export const allActiveSellers = (pageNumber) => {
  pageNumber = pageNumber - 1;
  return (dispatch) => {
    return superagent
      .get(`${API_LINK_Admin}/activesellers/${pageNumber}`)
      .set('authorization', `Basic ${token}`)
      .then((res) => {
        dispatch(getActivatedSellers(res.body.result));
      })
      .catch((e) => {
        console.error(e);
      });
  };
};

export const allDeActiveSellers = (pageNumber) => {
  pageNumber = pageNumber - 1;
  return (dispatch) => {
    return superagent
      .get(`${API_LINK_Admin}/deactivatedsellers/${pageNumber}`)
      .set('authorization', `Basic ${token}`)
      .then((res) => {
        dispatch(getDeactivatedSellers(res.body.result));
      })
      .catch((e) => {
        console.error(e);
      });
  };
};

// Buyers

export const allBuyers = (pageNumber) => {
  pageNumber = pageNumber - 1;
  return (dispatch) => {
    return superagent
      .get(`${API_LINK_Admin}/buyers/${pageNumber}`)
      .set('authorization', `Basic ${token}`)
      .then((res) => {
        dispatch(getAllBuyers(res.body.result));
      })
      .catch((e) => {
        console.error(e);
      });
  };
};

export const allActiveBuyers = (pageNumber) => {
  pageNumber = pageNumber - 1;
  return (dispatch) => {
    return superagent
      .get(`${API_LINK_Admin}/activebuyers/${pageNumber}`)
      .set('authorization', `Basic ${token}`)
      .then((res) => {
        dispatch(getActivatedBuyers(res.body.result));
      })
      .catch((e) => {
        console.error(e);
      });
  };
};

export const allDeActiveBuyers = (pageNumber) => {
  pageNumber = pageNumber - 1;
  return (dispatch) => {
    return superagent
      .get(`${API_LINK_Admin}/deactivatedbuyers/${pageNumber}`)
      .set('authorization', `Basic ${token}`)
      .then((res) => {
        dispatch(getDeactivatedBuyers(res.body.result));
      })
      .catch((e) => {
        console.error(e);
      });
  };
};

// Products
export const allProducts = (pageNumber) => {
  pageNumber = pageNumber - 1;
  return (dispatch) => {
    return superagent
      .get(`${API_LINK_Admin}/allproducts/${pageNumber}`)
      .set('authorization', `Basic ${token}`)
      .then((res) => {
        console.log(res.body.result);
        dispatch(getAllProducts(res.body.result));
      })
      .catch((e) => {
        console.error(e);
      });
  };
};

export const allDProducts = (pageNumber) => {
  pageNumber = pageNumber - 1;
  return (dispatch) => {
    return superagent
      .get(`${API_LINK_Admin}/deletedproducts/${pageNumber}`)
      .set('authorization', `Basic ${token}`)
      .then((res) => {
        dispatch(getAllDeactivatedProducts(res.body.result));
      })
      .catch((e) => {
        console.error(e);
      });
  };
};

export const allAProducts = (pageNumber) => {
  pageNumber = pageNumber - 1;
  return (dispatch) => {
    return superagent
      .get(`${API_LINK_Admin}/activeproducts/${pageNumber}`)
      .set('authorization', `Basic ${token}`)
      .then((res) => {
        dispatch(getAllActiveProducts(res.body.result));
      })
      .catch((e) => {
        console.error(e);
      });
  };
};

export const allBProducts = (pageNumber) => {
  pageNumber = pageNumber - 1;
  return (dispatch) => {
    return superagent
      .get(`${API_LINK_Admin}/boughtproducts/${pageNumber}`)
      .set('authorization', `Basic ${token}`)
      .then((res) => {
        // console.log(res);
        dispatch(getAllBoughtProducts(res.body.result));
      })
      .catch((e) => {
        console.error(e);
      });
  };
};

export const allCProducts = (pageNumber) => {
  pageNumber = pageNumber - 1;
  return (dispatch) => {
    return superagent
      .get(`${API_LINK_Admin}/incartproducts/${pageNumber}`)
      .set('authorization', `Basic ${token}`)
      .then((res) => {
        // console.log(res);
        dispatch(getAllCartProducts(res.body.result));
      })
      .catch((e) => {
        console.error(e);
      });
  };
};

export const allFProducts = (pageNumber) => {
  pageNumber = pageNumber - 1;
  return (dispatch) => {
    return superagent
      .get(`${API_LINK_Admin}/incartproducts/${pageNumber}`)
      .set('authorization', `Basic ${token}`)
      .then((res) => {
        dispatch(getAllFavProducts(res.body.result));
      })
      .catch((e) => {
        console.error(e);
      });
  };
};

export const addCategory = (category) => {
  return (dispatch) => {
    return superagent
      .post(`${API_LINK_Admin}/category`)
      .set('authorization', `Basic ${token}`)
      .send({ name: category })
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.error(e);
      });
  };
};

export const numberOfUsers = () => {
  return (dispatch) => {
    return superagent
      .get(`${API_LINK_Admin}/numberUsers`)
      .set('authorization', `Basic ${token}`)
      .then((res) => {
        return res.body.number;
      })
      .catch((e) => {
        console.error(e);
      });
  };
};

export const numberOfProducts = () => {
  return (dispatch) => {
    return superagent
      .get(`${API_LINK_Admin}/numberproducts`)
      .set('authorization', `Basic ${token}`)
      .then((res) => {
        return res.body.number;
      })
      .catch((e) => {
        console.error(e);
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
