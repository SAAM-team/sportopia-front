import React, { useContext } from 'react';
import { StateContext } from '../context/global-state';
import { If } from 'react-if';

export default function Auth(props) {
  const siteContext = useContext(StateContext);

  let okToRender;

  try {
    okToRender =
      siteContext.isLogged && props.role
        ? siteContext.user.role === props.role
        : false;
  } catch (e) {
    console.log('wow');
  }

  console.log(okToRender);

  return (
    <div>
      <If condition={okToRender}>
        <div>{props.children}</div>
      </If>
    </div>
  );
}
