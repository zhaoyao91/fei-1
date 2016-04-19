import {composeAll, useDeps, compose} from 'mantra-core';
import CreatePostPage from '../components/create-post-page';

export const composer = function ({context}, onData) {
    const {FlowRouter} = context();
    onData(null, {
        onSuccess(postId) {
            FlowRouter.go('posts.show', {id: postId});
        }
    })
};

export default composeAll(
    compose(composer),
    useDeps()
)(CreatePostPage)