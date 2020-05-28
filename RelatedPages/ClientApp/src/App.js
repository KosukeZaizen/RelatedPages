import React from 'react';
import { Route, Switch } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import TitlesForTheDate from './components/TitlesForTheDate';
import PagesForTheTitles from './components/PagesForTheTitles';
import ScrollMemory from 'react-router-scroll-memory';
import NotFound from './components/404';

export default () => (
    <Layout>
        <ScrollMemory />
        <Switch>
            <Route sensitive exact path='/' component={Home} />
            <Route sensitive exact path='/date/:date' component={TitlesForTheDate} />
            <Route sensitive exact path='/theme/:titleId' component={PagesForTheTitles} />
            <Route sensitive exact path='/not-found' component={NotFound} />
            <Route component={NotFoundRedirect} />
        </Switch>
    </Layout>
);

function NotFoundRedirect() {
    window.location.href = `/not-found?p=${window.location.pathname}`;
    return (
        <div>
            Loading...
        </div>
    );
}