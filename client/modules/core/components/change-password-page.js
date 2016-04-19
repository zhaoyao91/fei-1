import React from 'react';
import Container from './container';
import {PageHeader, FormGroup, FormControl, ControlLabel, Button} from 'react-bootstrap';

class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            oldPassword: '',
            newPassword: ''
        }
    }

    render() {
        const {oldPassword, newPassword} = this.state;

        return <Container>
            <PageHeader>修改密码</PageHeader>
            <form onSubmit={this.onSubmit.bind(this)}>
                <FormGroup>
                    <ControlLabel>旧密码</ControlLabel>
                    <FormControl {...{
                        type: 'password',
                        value: oldPassword,
                        onChange: this.onOldPasswordChange.bind(this)
                    }}/>
                </FormGroup>
                <FormGroup>
                    <ControlLabel>新密码</ControlLabel>
                    <FormControl {...{
                        type: 'password',
                        value: newPassword,
                        onChange: this.onNewPasswordChange.bind(this)
                    }}/>
                </FormGroup>
                <Button bsStyle="primary" type="submit">修改密码</Button>
            </form>
        </Container>
    }

    onOldPasswordChange(e) {
        this.setState({
            oldPassword: e.target.value
        })
    }

    onNewPasswordChange(e) {
        this.setState({
            newPassword: e.target.value
        })
    }

    onSubmit(e) {
        const {onSubmit} = this.props;
        const {oldPassword, newPassword} = this.state;
        e.preventDefault();
        onSubmit({oldPassword, newPassword});
    }
}

Page.propTypes = {
    // func({oldPassword, newPassword})
    onSubmit: React.PropTypes.func
};

export default Page