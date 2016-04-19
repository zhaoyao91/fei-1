import React from 'react'
import {Panel} from 'react-bootstrap';
import moment from 'moment';

const Item = ({post, onClick})=> {
    const {title, createdAt, summary} = post;
    const createdAtString = moment(createdAt).format('YYYY-MM-DD hh:mm:ss');

    return <Panel onClick={onClick} style={{cursor: 'pointer'}} className="post-list-item">
        <h3 style={{marginTop: 0}}>{title}</h3>
        <p>{createdAtString}</p>
        {
            summary ?
                <p>{summary}</p> : null
        }
    </Panel>
};

Item.propTypes = {
    // {title, createdAt, [summary]}
    post: React.PropTypes.object,

    onClick: React.PropTypes.func
};

export default Item