import React from 'react'
import Item from './post-list-item';

const List = ({posts, onClickItem})=> {
    return <div className="post-list">
        {
            posts.map((post)=> {
                return <Item {...{
                    key: post._id,
                    post: _.extend({}, post),
                    onClick: ()=>onClickItem(post._id)
                }}/>
            })
        }
    </div>
};

List.propTypes = {
    // post必须包含{_id, title, createdAt, [summary]}
    posts: React.PropTypes.arrayOf(React.PropTypes.object),

    // func(postId)
    onClickItem: React.PropTypes.func
};

List.defaultProps = {
    posts: [],
    onClickItem(){}
};

export default List