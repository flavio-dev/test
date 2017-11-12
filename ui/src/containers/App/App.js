import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';
import Home from '../Home/Home';
import Matches from '../Matches/Matches';
import NotFound from '../Error/NotFound/NotFound';

const App = () => (
  <Router>
    <Layout>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/matches" component={Matches}/>
        <Route component={NotFound}/>
      </Switch>
    </Layout>
  </Router>
);

export default App;
