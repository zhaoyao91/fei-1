import React from 'react';
import BlogAdminPage from '../components/blog-admin-page';
import {composeAll, composeWithTracker, useDeps} from 'mantra-core';
import scrollTop from '../../core/high-order/scroll-top';
import {getState as getLoadMoreButtonState} from '../../core/components/load-more-button';
import adminOnly from '../../core/high-order/admin-only';

const InnerPage = scrollTop()(BlogAdminPage);

export const composer = ({context, actions}, onData)=> {
    const {Meteor, Collections, LocalState, Toast} = context();

    const loadLimit = LocalState.get('blog.BlogAdminPage.loadLimit');

    const sub = Meteor.subscribe('posts.all', {
        limit: loadLimit,
        sort: {createdAt: -1},
        fields: {title: 1, createdAt: 1, updatedAt: 1, published: 1}
    });

    const posts = Collections.Posts.find({}, {sort: {createdAt: -1}}).fetch();
    const ready = sub.ready();
    const loadMoreButtonState = getLoadMoreButtonState(ready, loadLimit, posts.length);
    const scrollTop = ready ? LocalState.get('blog.BlogAdminPage.scrollTop') : null;

    onData(null, {
        posts,
        handlers: {
            onCreatePost: ()=> {FlowRouter.go('posts.create')},
            onLoadMore: ()=> {
                actions().blog.incBlogAdminPageLoadLimit();
            },
            onTogglePublishState: (id) => {
                const post = Collections.Posts.findOne({_id: id});
                if (post) {
                    const published = !post.published;
                    Meteor.call('posts.update', {id, published}, function (err) {
                        if (err) {
                            console.error(err);
                            Toast.error('更新失败。');
                        }
                    });
                }
            },
            onUpdate: (id) => {FlowRouter.go('posts.update', {id})},
            onRemove: (id) => {
                Meteor.call('posts.remove', {id}, function (err) {
                    if (err) {
                        console.error(err);
                        Toast.error('删除失败。');
                    }
                })
            }
        },
        loadMoreButtonState,
        scrollTop
    })
};

const DataLayer = composeWithTracker(composer)(InnerPage);

class Page extends React.Component {
    componentWillUnmount() {
        const {actions} = this.props;
        actions().blog.setBlogAdminPageScrollTop(document.body.scrollTop);
    }

    render() {
        return <DataLayer {...this.props}/>
    }
}

export default composeAll(
    adminOnly,
    useDeps()
)(Page)