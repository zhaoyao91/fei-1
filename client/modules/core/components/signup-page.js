import React from 'react';
import Container from './container';
import {PageHeader, FormGroup, FormControl, ControlLabel, Button} from 'react-bootstrap';

class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }

    render() {
        const {username, password} = this.state;

        return <Container>
            <PageHeader>注册</PageHeader>
            <form onSubmit={this.onSubmit.bind(this)}>
                <FormGroup>
                    <ControlLabel>用户名</ControlLabel>
                    <FormControl {...{
                        type: 'text',
                        value: username,
                        onChange: this.onUsernameChange.bind(this)
                    }}/>
                </FormGroup>
                <FormGroup>
                    <ControlLabel>密码</ControlLabel>
                    <FormControl {...{
                        type: 'password',
                        value: password,
                        onChange: this.onPasswordChange.bind(this)
                    }}/>
                </FormGroup>
                <Button bsStyle="primary" type="submit">注册</Button>
            </form>
        </Container>
    }

    onUsernameChange(e) {
        this.setState({
            username: e.target.value
        })
    }

    onPasswordChange(e) {
        this.setState({
            password: e.target.value
        })
    }

    onSubmit(e) {
        const {onSubmit} = this.props;
        const {username, password} = this.state;
        e.preventDefault();
        onSubmit({username, password});
    }
}

Page.propTypes = {
    // func({username, password})
    onSubmit: React.PropTypes.func
};

export default Page