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
            <Route exact path='/' component={Home} />
            <Route path='/date/:date?' component={TitlesForTheDate} />
            <Route path='/theme/:titleId?' component={PagesForTheTitles} />
            <Route sensitive path='/not-found' component={NotFound} />
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