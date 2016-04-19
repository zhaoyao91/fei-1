import React from 'react';
import {compose, useDeps} from 'mantra-core';
import IndexPage from '../components/index-page';

export const composer = ({context, actions}, onData)=> {
    const {Meteor} = context();
    onData(null, {});
    Meteor.call('core.getAppData', [
        'indexPageTitle',
        'indexPageCarousel',
        'indexPageSectionA',
        'indexPageSectionB'
    ], function (err, values) {
        if (err) {
            console.error(err);
            onData(err);
        }
        else {
            onData(null, values);
        }
    })
};

const DataLayer = compose(composer)(IndexPage);

class Page extends React.Component {
    componentDidMount() {
        const {actions} = this.props;
        const {blog} = actions();

        blog.resetListPostsPageLoadLimit();
        blog.resetListPostsPageScrollTop();
        blog.resetBlogAdminPageLoadLimit();
        blog.resetBlogAdminPageScrollTop();
    }

    render() {
        return <DataLayer {...this.props}/>
    }
}

export default useDeps()(Page);