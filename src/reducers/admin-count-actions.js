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
      })
      .catch((e) => {
        console.log(e.message);
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
      })
      .catch((e) => {
        console.log(e.message);
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
      })
      .catch((e) => {
        console.log(e.message);
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
      })
      .catch((e) => {
        console.log(e.message);
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
      })
      .catch((e) => {
        console.log(e.message);
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
      })
      .catch((e) => {
        console.log(e.message);
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
      })
      .catch((e) => {
        console.log(e.message);
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
      })
      .catch((e) => {
        console.log(e.message);
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
      })
      .catch((e) => {
        console.log(e.message);
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
      })
      .catch((e) => {
        console.log(e.message);
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
      })
      .catch((e) => {
        console.log(e.message);
      });
  };
};

export const gender = () => {
  return (dispatch) => {
    return superagent
      .get(`${API_LINK_Admin}/static/gender`)
      .set('authorization', `Basic ${token}`)
      .then((res) => {
        return res.body.gender;
      })
      .catch((e) => {
        console.log(e.message);
      });
  };
};

export const actived = () => {
  return (dispatch) => {
    return superagent
      .get(`${API_LINK_Admin}/static/pro`)
      .set('authorization', `Basic ${token}`)
      .then((res) => {
        return res.body.products;
      })
      .catch((e) => {
        console.log(e.message);
      });
  };
};

export const users = () => {
  return (dispatch) => {
    return superagent
      .get(`${API_LINK_Admin}/static/actived`)
      .set('authorization', `Basic ${token}`)
      .then((res) => {
        return res.body.users;
      })
      .catch((e) => {
        console.log(e.message);
      });
  };
};
