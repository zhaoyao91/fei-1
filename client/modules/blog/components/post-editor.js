/**
 * 基于medium-editor构建
 */

import React from 'react'
import Summernote from '../../core/components/react-summernote'
import _ from 'lodash'

function getDefaultProps() {
    return {
        options: {
            height: '40vh'
        }
    };
}

class Editor extends React.Component {
    render() {
        const props = _.defaultsDeep({}, this.props, getDefaultProps());
        return <Summernote {...props}/>
    }
}

export default Editor