/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline, Typography, Container } from '@material-ui/core';
import { connect } from 'react-redux';
import { getInsideBid } from '../../reducers/actions';
import { StateContext } from '../../context/global-state';
import SwiftSlider from 'react-swift-slider';

const data = [
  {
    id: '1',
    src:
      'https://media.mfbproject.co.za/repos/2017_alfa-romeo_stelvio_leaked_02.jpg'
  },
  {
    id: '2',
    src:
      'https://media.mfbproject.co.za/repos/2017_alfa_romeo_stelvioquadrifoglio_official_09.jpg'
  },
  {
    id: '3',
    src:
      'https://media.mfbproject.co.za/repos/2018-alfa-romeo-stelvio-quadrifoglio-specs-photos-speed-2.jpg'
  },
  {
    id: '4',
    src:
      'https://media.mfbproject.co.za/repos/alfa-romeo-giulia-quadrifoglio-2017-us-wallpapers-and-hd-images-13.jpg'
  },
  {
    id: '5',
    src:
      'https://media.mfbproject.co.za/repos/ARWP_Infra_Desk_1920_1080_Quad.png'
  }
];

export function BiddingRoom(props) {
  console.log('props inside the biiding room', props.productUB);
  // Context
  const { productIdBidding } = useContext(StateContext);

  // State

  // Functions

  useEffect(() => {
    props.getInsideBid(productIdBidding);
  }, []);

  // useEffect(() => {
  //   data.push({
  //     id: 0,
  //     src: props.productUB.main_img
  //   });
  //   props.productUB.images.forEach((image, index) => {
  //     data.push({
  //       id: index + 1,
  //       src: image
  //     });
  //   });
  // }, [props]);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth='sm'>
        <SwiftSlider
          data={data}
          interval={3000}
          showDots={false}
          enableNextAndPrev={false}
        />
      </Container>
    </React.Fragment>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'space-between'
  }
}));

const mapStateToProps = (state) => {
  console.log('state inside the room', state);
  return {
    productUB: state.bidding.biddingRoom
  };
};

const mapDispatchToProps = { getInsideBid };

export default connect(mapStateToProps, mapDispatchToProps)(BiddingRoom);
