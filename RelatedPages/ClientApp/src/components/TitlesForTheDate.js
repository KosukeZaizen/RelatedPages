import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { actionCreators } from '../store/RelatedPages';
import { getEnglishDate } from '../common/functions';

class TitlesForTheDate extends Component {
    constructor(props) {
        super(props);

        this.fetchData();

        this.state = {
            date: "",
        };
    }

    componentDidMount() {
        // This method is called when the component is first added to the document
        this.fetchData();
    }

    fetchData() {
        const date = this.props.match.params.date;
        if (date !== (this.state && this.state.date)) this.setState({ date });

        const dateWithoutMinus = date.split("-").join("");
        this.props.requestTitlesForTheDate(dateWithoutMinus);
    }

    componentDidUpdate() {
    }

    render() {
        const date = getEnglishDate(this.state.date);
        return (
            <div>
                <h1>{date}</h1>
                <p>Themes searched on {date}.</p>
                {renderTable(this.props)}
                {renderPagination(this.props)}
            </div>
        );
    }
}

function renderTable(props) {
    return (
        <table className='table table-striped'>
            <thead>
                <tr>
                    <th>Theme</th>
                    <th>Found Articles</th>
                </tr>
            </thead>
            <tbody>
                {props.titles.map(title =>
                    <tr key={title.titleId}>
                        <td><Link to={"/theme/" + title.titleId}>{title.title}</Link></td>
                        <td>{2} articles</td>
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
)(TitlesForTheDate);
