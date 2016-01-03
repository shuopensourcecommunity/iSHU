'use strict';
const React = require('react');
const Mui = require('material-ui');
const SvgIcon = Mui.SvgIcon;

const ActionHome = React.createClass({
  render: function() {
    return (
      <SvgIcon {...this.props}>
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"></path>
      </SvgIcon>
    );
  }
});

const ActionSearch = React.createClass({
  render: function() {
    return (
      <SvgIcon {...this.props}>
        <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
        <path d="M0 0h24v24H0z" fill="none"/>
      </SvgIcon>
    );
  }
});

const HardwareKeyboardArrowLeft = React.createClass({
  render: function() {
    return (
      <SvgIcon {...this.props}>
        <path d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z"/>
      </SvgIcon>
    );
  }
});

const NavigationMoreVert = React.createClass({
  render: function() {
    return (
      <SvgIcon {...this.props}>
        <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
      </SvgIcon>
    );
  }
});

module.exports = {
  ActionHome: ActionHome,
  ActionSearch: ActionSearch,
  HardwareKeyboardArrowLeft: HardwareKeyboardArrowLeft,
  NavigationMoreVert: NavigationMoreVert
};
