/**
 * 编辑post的表格
 * 根据id自动获取post作为初始化内容
 * 提交时，执行更新动作
 */

import {
    useDeps, compose, composeWithTracker, composeAll
} from 'mantra-core';
import Form from '../components/edit-post-form';
import React from 'react';

class Container extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.constructor.defaultState;
    }

    componentDidMount() {
        this.fetchPost(this.props.postId);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.postId !== nextProps.postId) {
            this.setState(this.constructor.defaultState);
            this.fetchPost(nextProps.postId);
        }
    }

    render() {
        const {context, postId, onCancel, cancelButtonText} = this.props;
        const {FlowRouter} = context();
        const {postToBeUpdated, noPost, error, loading, updating} = this.state;

        if (loading) {
            return <div>loading...</div>
        }
        else if (error) {
            return <div>error!</div>
        }
        else if (noPost) {
            return <div>can not find this post.</div>
        }
        else {
            return <Form {...{
                post: postToBeUpdated,
                submitButtonText: '保存',
                onSubmit: (post) => {
                    post = _.extend({id: postId}, post);
                    this.updatePost(post);
                },
                disabled: updating,
                cancelButtonText,
                onCancel
            }}/>
        }
    }

    fetchPost(postId) {
        const {context} = this.props;
        const {Meteor} = context();
        this.setState({loading: true});
        Meteor.call('posts.get', {id: postId}, (err, post) => {
            this.setState({loading: false});
            if (err) {
                console.error(err);
                this.setState({error: err})
            }
            else if (!post) {
                this.setState({noPost: true});
            }
            else {
                this.setState({postToBeUpdated: post})
            }
        });
    }

    updatePost(post) {
        const {context, onSuccess} = this.props;
        const {Meteor, Toast} = context();
        if (!post.title) {
            return Toast.error('没有输入标题。') && undefined;
        }
        else if (!post.content) {
            return Toast.error('没有输入内容。') && undefined;
        }

        this.setState({updating: true});
        Meteor.call('posts.update', post, (err)=> {
            this.setState({updating: false});
            if (err) {
                if (err.error === 'no-permission') {
                    Toast.error('权限不足。');
                }
                else {
                    Toast.error('保存失败。');
                    console.error(err);
                }
            }
            else {
                Toast.success('保存成功。', {timeout: 'flash'});
                onSuccess();
            }
        })
    }
}

Container.propsTypes = {
    postId: React.PropTypes.string,

    // func()
    onSuccess: React.PropTypes.func

    // 代理属性：onCancel, cancelButtonText
};

Container.defaultProps = {
    onSuccess(){}
};

Container.defaultState = {
    postToBeUpdated: null,
    noPost: false,
    error: null,
    loading: false,
    updating: false
};

export default useDeps()(Container);