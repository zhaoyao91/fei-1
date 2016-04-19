import {composeAll, useDeps, compose} from 'mantra-core';
import UpdatePostPage from '../components/update-post-page';

export const composer = function ({context, postId}, onData) {
    const {FlowRouter} = context();
    onData(null, {
        onReturn() {
            FlowRouter.go('posts.show', {id: postId});
        }
    })
};

export default composeAll(
    compose(composer),
    useDeps()
)(UpdatePostPage)