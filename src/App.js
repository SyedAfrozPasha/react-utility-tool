import React, { Suspense } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import './style.css';

import Header from './Components/Header';
import Footer from './Components/Footer';

const UtilityViewer = React.lazy(() => import('./Components/UtilityViewer'));
const JSONViewer = React.lazy(() => import('./Components/JSONViewer'));
const ChartBuilder = React.lazy(() => import('./Components/ChartBuilder'));

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Router>
        <Header />
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact path="/string-utility-tool">
              <UtilityViewer />
            </Route>
            <Route exact path="/json-viewer">
              <JSONViewer />
            </Route>
            <Route exact path="/chart-builder">
              <ChartBuilder />
            </Route>
            <Redirect exact from="/" to="string-utility-tool" />
          </Switch>
        </Suspense>
      </Router>
      <Footer />
    </div>
  );
}
