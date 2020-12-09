/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { connect } from 'react-redux';
import { makeStyle } from '@material-ui/core/styles';
import { getInsideBid } from '../../reducers/actions';
import { useEffect } from 'react';

export function BiddingRoom(props) {
  return (
    <>
      <div>WOWOWO</div>
      <div>WOWOWO</div>
      <div>WOWOWO</div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    biddingRoom: state.bidding.biddingRoom
  };
};

const mapDispatchToProps = { getInsideBid };

export default connect(mapStateToProps, mapDispatchToProps)(BiddingRoom);
