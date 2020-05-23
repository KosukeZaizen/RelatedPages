import React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import TitlesForTheDate from './components/TitlesForTheDate';
import PagesForTheTitles from './components/PagesForTheTitles';

export default () => (
    <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/date/:date?' component={TitlesForTheDate} />
        <Route path='/theme/:titleId?' component={PagesForTheTitles} />
    </Layout>
);
