import React from 'react';
import {
  createStackNavigator
} from 'react-navigation'

import Chat from './containers/Chat';
import Login from './containers/Login';
import Register from './containers/Register'
import Home from './containers/Home'


console.disableYellowBox = true;

export default createStackNavigator({
  Home: Home,
  Login: Login,
  Register: Register,
  Chat: Chat,
},{
  headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
});