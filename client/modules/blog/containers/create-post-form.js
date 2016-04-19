/**
 * 创建post的表格
 * 提交时，执行创建动作
 */

import {
    useDeps, compose, composeAll
} from 'mantra-core';
import Form from '../components/edit-post-form';
import React from 'react';

class Container extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.constructor.defaultState;
    }

    render() {
        const {post, creating} = this.state;
        return <Form {...{
            post,
            submitButtonText: '创建',
            onSubmit: (post) => {
                this.createPost(post);
            },
            disabled: creating
        }}/>
    }

    createPost(post) {
        const {context} = this.props;
        const {Meteor, Toast} = context();

        if (!post.title) {
            return Toast.error('没有输入标题。') && undefined;
        }
        else if (!post.content) {
            return Toast.error('没有输入内容。') && undefined;
        }

        this.setState({creating: true});
        Meteor.call('posts.create', post, (err, postId) => {
            this.setState({creating: false});
            if (err) {
                if (err.error === 'no-permission') {
                    Toast.error('权限不足。');
                }
                else {
                    Toast.error('创建失败。');
                    console.error(err);
                }
            }
            else {
                Toast.success('创建成功。');
                this.props.onSuccess(postId);
            }
        })
    }
}

Container.propTypes = {
    // func(postId)
    onSuccess: React.PropTypes.func
};

Container.defaultProps = {
    onSuccess(){}
};

Container.defaultState = {
    creating: false,
    post: {}
};

export default useDeps()(Container)