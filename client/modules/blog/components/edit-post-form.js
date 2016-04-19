/**
 * 创建或更新post所使用的表单
 */

import React, {Component} from 'react';
import {Button, FormGroup, FormControl, ControlLabel, Checkbox} from 'react-bootstrap';
import Editor from './post-editor'
import _ from 'lodash';

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            post: props.post
        }
    }

    componentWillReceiveProps(nextProps) {
        if (!_.isEqual(this.props.post, nextProps.post)) {
            this.setState({post: nextProps.post});
        }
    }

    render() {
        const {submitButtonText, cancelButtonText, disabled} = this.props;
        const {title, summary, content, published} = this.state.post || {};

        return <form onSubmit={this.onSubmit.bind(this)}>
            <FormGroup>
                <ControlLabel>标题</ControlLabel>
                <FormControl {...{
                    type: 'text',
                    value: title,
                    onChange: this.onTitleChange.bind(this),
                    disabled: disabled
                }}/>
            </FormGroup>
            <Checkbox {...{
                checked: published,
                onChange: this.onPublishedChange.bind(this),
                disabled
            }}>发布</Checkbox>
            <FormGroup>
                <ControlLabel>摘要</ControlLabel>
                <FormControl {...{
                    type: 'text',
                    value: summary,
                    onChange: this.onSummaryChange.bind(this),
                    disabled: disabled
                }}/>
            </FormGroup>
            <FormGroup>
                <ControlLabel>正文</ControlLabel>
                <Editor {...{
                    value: content,
                    onChange: this.onContentChange.bind(this),
                    disabled
                }}/>
            </FormGroup>
            {
                this.props.submitButtonText ?
                    <Button type="submit" bsStyle="primary" disabled={disabled}>{submitButtonText}</Button> : null
            }
            {
                this.props.cancelButtonText ?
                    <Button type="button" style={{marginLeft: 10}} disabled={disabled}
                            onClick={this.onCancel.bind(this)}>
                        {cancelButtonText}
                    </Button> : null
            }
        </form>
    }

    onTitleChange(e) {
        this.setState({
            post: _.extend({}, this.state.post, {title: e.target.value})
        });
    }

    onSummaryChange(e) {
        this.setState({
            post: _.extend({}, this.state.post, {summary: e.target.value})
        })
    }

    onContentChange(text) {
        this.setState({
            post: _.extend({}, this.state.post, {content: text})
        })
    }

    onPublishedChange(e) {
        this.setState({
            post: _.extend({}, this.state.post, {published: e.target.checked})
        });
    }

    onSubmit(e) {
        e.preventDefault();
        this.props.onSubmit(this.state.post);
    }

    onCancel(e) {
        e.preventDefault();
        this.props.onCancel(this.state.post)
    }
}

Form.propTypes = {
    // half-controlled, {title, summary, content, published}
    post: React.PropTypes.object,

    // func(post)
    onSubmit: React.PropTypes.func,

    // func(post)
    onCancel: React.PropTypes.func,

    // falsy则不显示
    submitButtonText: React.PropTypes.string,

    // falsy则不显示
    cancelButtonText: React.PropTypes.string,

    disabled: React.PropTypes.bool
};

Form.defaultProps = {
    post: {},
    onSubmit(){},
    onCancel(){},
    submitButtonText: '提交',
    cancelButtonText: '',
    disabled: false
};

export default Form