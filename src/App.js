import './App.css';
import React, { Component } from 'react';
import {Router, Route, Switch} from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';

import Header from '../src/component/header';

import MainPage from '../src/pages/main/main';
import NotFound from '../src/pages/notfound/notfound';

const browerHistory = createBrowserHistory();

class App extends Component {
  render() {
    return (
      <div className="App">
      	<Header />
      	<Router history={browerHistory}>
      		<div>
      			<Switch>
      				<Route exact={true} path="/" component={MainPage}/>
      				<Route component={NotFound} />
      			</Switch>
      		</div>
      	</Router>
      </div>
    );
  }
}

export default App;
