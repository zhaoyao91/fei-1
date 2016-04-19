import React from 'react';
import ListPostsPage from '../components/list-posts-page';
import {composeAll, composeWithTracker, useDeps} from 'mantra-core';
import scrollTop from '../../core/high-order/scroll-top';
import {getState as getLoadMoreButtonState} from '../../core/components/load-more-button';

const InnerPage = scrollTop()(ListPostsPage);

export const composer = function ({context, actions}, onData) {
    const {Meteor, Collections, FlowRouter, LocalState} = context();

    const loadLimit = LocalState.get('blog.ListPostsPage.loadLimit');

    const sub = Meteor.subscribe('posts.all', {
        limit: loadLimit,
        fields: {
            title: 1,
            createdAt: 1,
            summary: 1
        },
        published: true,
        sort: {
            createdAt: -1
        }
    });

    const posts = Collections.Posts.find().fetch();
    const ready = sub.ready();
    const loadMoreButtonState = getLoadMoreButtonState(ready, loadLimit, posts.length);
    const scrollTop = ready ? LocalState.get('blog.ListPostsPage.scrollTop') : null;

    onData(null, {
        scrollTop,
        posts,
        onClickPostItem(postId) {
            FlowRouter.go('posts.show', {id: postId});
        },
        loadMoreButtonState,
        onLoadMore: ()=> {
            actions().blog.incListPostsPageLoadLimit();
        }
    });
};

const DataLayer = composeWithTracker(composer)(InnerPage);

class Page extends React.Component {
    componentWillUnmount() {
        const {actions} = this.props;
        actions().blog.setListPostsPageScrollTop(document.body.scrollTop);
    }

    render() {
        return <DataLayer {...this.props}/>
    }
}

export default useDeps()(Page);