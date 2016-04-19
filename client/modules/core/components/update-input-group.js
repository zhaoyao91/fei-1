import React from 'react';
import {Button} from 'react-bootstrap';

class Group extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            checked: false
        }
    }

    componentDidMount() {
        this.setState({
            value: this.props.value,
            checked: !!this.props.checked
        })
    }

    componentWillReceiveProps(newProps) {
        if (!this.props.compareValue(this.props.value, newProps.value)) {
            this.setState({value: newProps.value})
        }
        if (newProps.checked !== this.props.checked) {
            this.setState({checked: !!newProps.checked})
        }
    }

    render() {
        const {ComponentClass, buttonText, compareValue, componentProps} = this.props;
        const initValue = this.props.value;
        const initChecked = !!this.props.checked;
        const {value, checked} = this.state;

        const different = !compareValue(initValue, value) || initChecked !== checked;

        return <div>
            <ComponentClass {...componentProps} {...{
                value, checked,
                onChange: this.onChange.bind(this)
            }}/>
            <Button style={{marginTop: '10px'}} bsStyle="primary" disabled={!different}
                    onClick={this.onUpdate.bind(this)}>{buttonText}</Button>
        </div>
    }

    onChange(e) {
        this.setState({
            value: e.target.value,
            checked: !!e.target.checked
        })
    }

    onUpdate() {
        this.props.onUpdate({
            value: this.state.value,
            checked: !!this.state.checked
        })
    }
}

Group.propTypes = {
    // input组件类，需要有value | checked和onChange
    ComponentClass: React.PropTypes.any,

    // 传递给input component的参数
    componentProps: React.PropTypes.object,

    // half-controlled
    value: React.PropTypes.string,
    checked: React.PropTypes.bool,

    // func({value, checked})
    onUpdate: React.PropTypes.func,

    buttonText: React.PropTypes.string,

    // func(x, y)
    compareValue: React.PropTypes.func
};

Group.defaultProps = {
    value: '',
    checked: false,
    onUpdate(){},
    buttonText: '更新',
    compareValue: (x, y)=>x === y
};

export default Group