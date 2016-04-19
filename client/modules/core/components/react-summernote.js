/**
 * 基于summernote封装的react wysiwyg
 * 参考http://summernote.org/
 *
 * 依赖
 * - summernote
 *
 * 注意
 * - 若指定了props.options.callbacks.onChange，则props.onChange将失效
 */

import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import $ from 'jquery';

class Editor extends React.Component {
    componentDidMount() {
        const options = _.defaultsDeep({}, this.props.options, {callbacks: {onChange: (...args)=>this.props.onChange(...args)}});
        $(this.getEditorNode()).summernote(options);
        $(this.getEditorNode()).summernote('code', this.props.value);
        if (this.props.disabled) {
            this.call('disable');
        }
    }

    componentWillUnmount() {
        $(this.getEditorNode()).summernote('destroy');
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.value !== this.props.value && nextProps.value !== $(this.getEditorNode()).summernote('code')) {
            $(this.getEditorNode()).summernote('code', nextProps.value || '');
        }

        if (this.props.disabled !== nextProps.disabled) {
            const action = nextProps.disabled ? 'disable' : 'enable';
            this.call(action);
        }
    }

    render() {
        return <div ref="editor"></div>
    }

    getEditorNode() {
        return ReactDOM.findDOMNode(this.refs.editor);
    }

    call(...args) {
        $(this.getEditorNode()).summernote(...args)
    }
}

Editor.propTypes = {
    // 一次性属性
    options: React.PropTypes.object,

    // 半受控属性
    value: React.PropTypes.string,

    // func(value, $editable)
    onChange: React.PropTypes.func,

    disabled: React.PropTypes.bool
};

export default Editor;