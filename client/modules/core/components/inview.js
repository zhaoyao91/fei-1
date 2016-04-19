import React from 'react';
import ReactDOM from 'react-dom';

class Inview extends React.Component {
    componentDidMount() {
        this.updateInviewHandler(this.props.onInview);
    }

    componentDidUpdate(oldProps) {
        if (oldProps.onInview !== this.props.onInview) {
            this.updateInviewHandler(this.props.onInview);
        }
    }

    render() {
        return <div ref="wrapper" {...this.props}>
            {this.props.children}
        </div>
    }

    updateInviewHandler(handler) {
        $(ReactDOM.findDOMNode(this.refs.wrapper))
            .off('inview')
            .on('inview', handler);
    }
}

Inview.propTypes = {
    // func(event, isInview), full-controlled
    onInview: React.PropTypes.func
};

export default Inview