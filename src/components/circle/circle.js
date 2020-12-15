/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';
// import './circle.css';
import $ from 'jquery';

export const EachCategory = () => {
  $('#header').each(function () {
    $('#header').toggleClass('hide');
  });
  return (
    <div>
      <header id='header'>
        <div className='inner'>
          <div className='content'>
            <h1>Bids Item</h1>
            <h2>Check the active auctions </h2>
            <a
              href='#'
              className='button big alt'
              onClick={() =>
                $('#header').each(function () {
                  $('#header').toggleClass('hide');
                })
              }
            >
              <button>Let's Go</button>
            </a>
          </div>
          <a
            href='#'
            className='button hidden'
            onClick={() =>
              $('#header').each(function () {
                $('#header').toggleClass('hide');
              })
            }
          >
            <span>Let's Go</span>
          </a>
        </div>
      </header>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(EachCategory);
