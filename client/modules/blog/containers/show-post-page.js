import {useDeps} from 'mantra-core';
import React from 'react';
import ShowPostPage from '../components/show-post-page';

class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.constructor.defaultState;
    }

    componentDidMount() {
        this.loadPost(this.props.postId);
    }

    render() {
        const {context} = this.props;
        const {post, error, noPost, loading} = this.state;
        const {Meteor} = context();

        if (error) {
            return <div>{error}</div>
        }
        else if (noPost) {
            return <div>no post.</div>
        }
        //else if (loading) {
        //    return <div>loading...</div>
        //}
        return <ShowPostPage {...{
            post,
            disqus: Meteor.settings.public.disqus
        }}/>
    }

    loadPost(postId) {
        const {context} = this.props;
        const {Meteor} = context();
        this.setState({loading: true});
        Meteor.call('posts.get', {id: postId}, (err, post)=> {
            this.setState({loading: false});
            if (err) {
                console.error(err);
                this.setState({error: err});
            }
            else if (!post) {
                this.setState({noPost: true});
            }
            else {
                this.setState({post})
            }
        });
    }
}

Page.propTypes = {
    postId: React.PropTypes.string.isRequired
};

Page.defaultState = {
    post: {},
    error: null,
    noPost: false,
    loading: false
};

export default useDeps()(Page);