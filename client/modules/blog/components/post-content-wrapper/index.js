/**
 * 渲染post内容
 * 将按html格式渲染内容
 * 临时为iframe添加粗糙的响应式机制，待summernote解决好之后去除
 */

import React from 'react';

class Wrapper extends React.Component {
    render() {
        const markup = {__html: this.props.children};
        return <div className="post-content-wrapper" dangerouslySetInnerHTML={markup}></div>
    }
}

Wrapper.propsTypes = {
    children: React.PropTypes.string
};

export default Wrapper;