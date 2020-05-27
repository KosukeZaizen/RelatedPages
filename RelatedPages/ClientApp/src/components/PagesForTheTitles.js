import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { actionCreators } from '../store/RelatedPages';
import Head from './Helmet';

class PagesForTheTitles extends Component {
    componentDidMount() {
        // This method is called when the component is first added to the document
        this.fetchData();
    }

    fetchData() {
        const titleId = this.props.match.params.titleId;
        this.props.requestPagesForTheTitle(titleId);
    }

    render() {
        const page = this.props.pages && this.props.pages.pop();
        const title = page && page.title;
        const publishDate = page && page.publishDate.split("T").shift();
        const description = `This is a list of the pages related to ${title}. If you want to know about ${title}, please check the list below!`;
        const arrDesc = description.split(". ");
        const lineChangeDesc = arrDesc.map((d, i) => <span>{d}{i < arrDesc.length - 1 && ". "}<br /></span>);
        return (
            <div>
                <Head
                    title={title}
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
                        <Link to={"/date/" + publishDate} itemProp="item" style={{ marginRight: "5px", marginLeft: "5px" }}>
                            <span itemProp="name">
                                {publishDate}
                            </span>
                            <meta itemProp="position" content="2" />
                        </Link>
                    </span>
                    {" > "}
                    <span itemProp="itemListElement" itemScope itemType="http://schema.org/ListItem">
                        <span itemProp="name" style={{ marginRight: "5px", marginLeft: "5px" }}>
                            {title}
                        </span>
                        <meta itemProp="position" content="3" />
                    </span>
                </div>
                <hr />
                <h1>{title}</h1>
                <br />
                {lineChangeDesc}
                <br />
                <hr />
                <h2>Pages related to {title}</h2>
                {renderTable(this.props)}
            </div>
        );
    }
}

function renderTable(props) {
    const { pages } = props;
    return (
        <table className='table table-striped'>
            <thead>
                <tr>
                    <th>Page Title</th>
                    <th>Snippet</th>
                </tr>
            </thead>
            <tbody>
                {pages.length > 0 ? pages.map((page, i) =>
                    <tr key={i}>
                        <td><a href={page.link} target="_blank" rel="noopener noreferrer">{page.pageName}</a></td>
                        <td>{page.explanation}</td>
                    </tr>
                )
                    :
                    <tr><td>Loading...</td><td></td></tr>}
            </tbody>
        </table>
    );
}

export default connect(
    state => state.relatedPages,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(PagesForTheTitles);
