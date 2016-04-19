import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import LoginPage from '../components/login-page';
import _ from 'lodash';

export const composer = ({context}, onData)=> {
    const {Meteor, Toast, FlowRouter} = context();
    onData(null, {
        onSubmit({username, password}) {
            if (!username) return Toast.error('请输入用户名。');
            if (!password) return Toast.error('请输入密码。');
            Meteor.loginWithPassword(username, password, function (err) {
                if (err) {
                    if (err.reason === 'Incorrect password') {
                        Toast.error('密码错误。');
                    }
                    else if (err.reason === 'User not found') {
                        Toast.error('用户名不存在。');
                    }
                    else {
                        console.error(err);
                        Toast.error('登录失败。');
                    }
                }
                else {
                    Toast.success('登录成功。');
                    FlowRouter.go('/');
                }
            })
        }
    })
};

export default composeAll(
    composeWithTracker(composer),
    useDeps()
)(LoginPage);