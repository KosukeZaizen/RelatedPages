import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { actionCreators } from '../store/RelatedPages';

class PagesForTheTitles extends Component {
    componentDidMount() {
        // This method is called when the component is first added to the document
        this.ensureDataFetched();
    }

    ensureDataFetched() {
        const startDateIndex = parseInt(this.props.match.params.startDateIndex, 10) || 0;
        this.props.requestPagesForTheTitle(startDateIndex);
    }

    render() {
        return (
            <div>
                <h1>{"dog and cat"}</h1>
                <p>This component demonstrates fetching data from the server and working with URL parameters.</p>
                {renderForecastsTable(this.props)}
                {renderPagination(this.props)}
            </div>
        );
    }
}

function renderForecastsTable(props) {
    return (
        <table className='table table-striped'>
            <thead>
                <tr>
                    <th>Page Name</th>
                    <th>Explanation</th>
                </tr>
            </thead>
            <tbody>
                {props.forecasts.map(forecast =>
                    <tr key={forecast.link}>
                        <td>{forecast.pageName}</td>
                        <td>{forecast.explanation}</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}

function renderPagination(props) {
    const prevStartDateIndex = (props.startDateIndex || 0) - 5;
    const nextStartDateIndex = (props.startDateIndex || 0) + 5;

    return <p className='clearfix text-center'>
        <Link className='btn btn-default pull-left' to={`/fetch-data/${prevStartDateIndex}`}>Previous</Link>
        <Link className='btn btn-default pull-right' to={`/fetch-data/${nextStartDateIndex}`}>Next</Link>
        {props.isLoading ? <span>Loading...</span> : []}
    </p>;
}

export default connect(
    state => state.weatherForecasts,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(PagesForTheTitles);
