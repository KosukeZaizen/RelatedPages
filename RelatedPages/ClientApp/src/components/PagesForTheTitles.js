import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { actionCreators } from '../store/RelatedPages';

class PagesForTheTitles extends Component {
    componentDidMount() {
        // This method is called when the component is first added to the document
        this.fetchData();
    }

    fetchData() {
        const titleId = parseInt(this.props.match.params.titleId, 10) || 0;
        this.props.requestPagesForTheTitle(titleId);
    }

    render() {
        const title = this.props.pages && this.props.pages.pop() && this.props.pages.pop().title;
        return (
            <div>
                <h1>{title}</h1>
                <p>Below is the pages related to {title}.</p>
                {renderTable(this.props)}
                {renderPagination(this.props)}
            </div>
        );
    }
}

function renderTable(props) {
    console.log(props);
    return (
        <table className='table table-striped'>
            <thead>
                <tr>
                    <th>Page Title</th>
                    <th>Snippet</th>
                </tr>
            </thead>
            <tbody>
                {props.pages.map((page, i) =>
                    <tr key={i}>
                        <td><a href={page.link}>{page.pageName}</a></td>
                        <td>{page.explanation}</td>
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
    state => state.relatedPages,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(PagesForTheTitles);
