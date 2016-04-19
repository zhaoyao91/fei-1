import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import SignupPage from '../components/signup-page';
import _ from 'lodash';

export const composer = ({context}, onData)=> {
    const {Accounts, Toast, FlowRouter} = context();
    onData(null, {
        onSubmit({username, password}) {
            if (!username) return Toast.error('请输入用户名。');
            if (!password) return Toast.error('请输入密码。');
            Accounts.createUser({username, password}, function (err) {
                if (err) {
                    if (err.reason === 'Username already exists.') {
                        Toast.error('用户名已存在。');
                    }
                    else {
                        console.error(err);
                        Toast.error('注册失败。');
                    }
                }
                else {
                    Toast.success('注册成功。');
                    FlowRouter.go('/');
                }
            })
        }
    })
};

export default composeAll(
    composeWithTracker(composer),
    useDeps()
)(SignupPage);