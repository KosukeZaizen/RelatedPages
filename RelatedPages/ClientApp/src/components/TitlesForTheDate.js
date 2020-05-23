import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { actionCreators } from '../store/RelatedPages';
import { getEnglishDate } from '../common/functions';
import Head from './Helmet';

class TitlesForTheDate extends Component {
    constructor(props) {
        super(props);

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
        const description = `Themes searched on ${date}`;
        return (
            <div>
                <Head
                    title={date}
                    desc={description}
                />
                <div className="breadcrumbs" itemScope itemType="https://schema.org/BreadcrumbList" style={{ textAlign: "left" }}>
                    <span itemProp="itemListElement" itemScope itemType="http://schema.org/ListItem">
                        <Link to="/" itemProp="item" style={{ marginRight: "5px", marginLeft: "5px" }}>
                            <span itemProp="name">
                                {"Home"}
                            </span>
                        </Link>
                        <meta itemProp="position" content="1" />
                    </span>
                    {" > "}
                    <span itemProp="itemListElement" itemScope itemType="http://schema.org/ListItem">
                        <span itemProp="name" style={{ marginRight: "5px", marginLeft: "5px" }}>
                            {date}
                        </span>
                        <meta itemProp="position" content="2" />
                    </span>
                </div>
                <hr />
                <h1>{date}</h1>
                <p>{description}</p>
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
                        <td>{title.cnt} articles</td>
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
