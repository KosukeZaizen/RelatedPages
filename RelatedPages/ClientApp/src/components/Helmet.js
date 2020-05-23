import * as React from 'react';
import { Helmet } from 'react-helmet';

const PageHeader = props => {
    return (
        <Helmet>
            {
                props.title ?
                    <title>{props.title}</title>
                    :
                    null
            }
            {
                props.desc ?
                    <meta name="description" content={props.desc} />
                    :
                    null
            }
        </Helmet>
    );
};
export default PageHeader;