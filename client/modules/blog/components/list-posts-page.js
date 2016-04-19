import React from 'react';
import {PageHeader} from 'react-bootstrap';
import Container from '../../core/components/container';
import PostList from './post-list';
import LoadMoreButton from '../../core/components/load-more-button';

class Page extends React.Component {
    render() {
        const {posts, onClickPostItem, loadMoreButtonState, onLoadMore} = this.props;

        return <Container>
            <PageHeader>博客</PageHeader>
            <PostList {...{posts, onClickItem: onClickPostItem}}/>
            <LoadMoreButton {...{
                block: true,
                state: loadMoreButtonState,
                onLoadMore: onLoadMore,
                loadMoreOnInview: true
            }}/>
        </Container>
    }
}

Page.propTypes = {
    // post至少包含{_id, title, createdAt, [summary]}
    posts: React.PropTypes.arrayOf(React.PropTypes.object),

    // func(postId)
    onClickPostItem: React.PropTypes.func,

    loadMoreButtonState: React.PropTypes.string,

    // func()
    onLoadMore: React.PropTypes.func
};

Page.defaultProps = {
    posts: [],
    onClickPostItem(){},
    onLoadMore(){}
};

export default Page;