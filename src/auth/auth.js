import React, { useContext } from 'react';
import { If } from 'react-if';
import cookie from 'react-cookies';
import jwt from 'jsonwebtoken';
const JWT_SECRET = 'thebestsecrett';

let token = cookie.load('token');
const validateToken = (token) => {
  try {
    let user = jwt.verify(token, JWT_SECRET);
    return user;
  } catch (e) {
    console.log('You have to register100');
  }
};
// get information

let user = validateToken(token);
export default function Auth(props) {

  let okToRender;

  try {
    okToRender =
      user && props.role
        ? user.role === props.role
        : false;
  } catch (e) {
    console.log('wow');
  }

  return (
    <div>
      <If condition={okToRender}>
        <div>{props.children}</div>
      </If>
    </div>
  );
}
