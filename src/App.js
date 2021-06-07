import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import './style.css';

import Header from './Components/Header';
import Footer from './Components/Footer';
import UtilityViewer from './Components/UtilityViewer';
import JSONViewer from './Components/JSONViewer';

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Router>
        <Header />
        <Switch>
          <Route exact path="/string-utility-tool">
            <UtilityViewer />
          </Route>
          <Route exact path="/json-viewer">
            <JSONViewer />
          </Route>
          <Redirect exact from="/" to="string-utility-tool" />
        </Switch>
      </Router>
      <Footer />
    </div>
  );
}
