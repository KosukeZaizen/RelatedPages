import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { actionCreators } from '../store/RelatedPages';
import { getEnglishDate } from '../common/functions';
import Head from './Helmet';

class TitlesForTheDate extends Component {
    componentDidMount() {
        // This method is called when the component is first added to the document
        this.ensureDataFetched();
    }

    ensureDataFetched() {
        this.props.requestAllDates();
    }

    render() {
        const title = "Related Pages";
        const description = "This is a website to show the lists of the good website related to specific keywords!";
        return (
            <div>
                <Head
                    title={title}
                    desc={description}
                />
                <h1>{title}</h1>
                <p>{description}</p>
                {renderTable(this.props)}
                {/*renderPagination(this.props)*/}
            </div>
        );
    }
}

function renderTable(props) {
    const { dates } = props;
    return (
        <table className='table table-striped'>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Searched Themes</th>
                </tr>
            </thead>
            <tbody>
                {dates.length > 0 ? dates.map((d, i) =>
                    <tr key={i}>
                        <td><Link to={"/date/" + d.publishDate.split("T")[0]}>{getEnglishDate(d.publishDate.split("T")[0])}</Link></td>
                        <td>{d.cnt} themes</td>
                    </tr>
                )
                    :
                    <tr><td>Loading...</td><td></td></tr>}
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
