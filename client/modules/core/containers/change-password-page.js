import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import ChangePasswordPage from '../components/change-password-page';
import _ from 'lodash';

export const composer = ({context}, onData)=> {
    const {Meteor, Accounts, Toast, FlowRouter} = context();
    onData(null, {
        onSubmit({oldPassword, newPassword}) {
            if (!Meteor.userId()) {
                Toast.error('登录后才能修改密码。');
                FlowRouter.go('login');
                return;
            }
            if (!oldPassword) return Toast.error('请输入旧密码。');
            if (!newPassword) return Toast.error('请输入新密码。');
            Accounts.changePassword(oldPassword, newPassword, function (err) {
                if (err) {
                    if (err.reason === 'Incorrect password') {
                        Toast.error('密码错误。');
                    }
                    else {
                        console.error(err);
                        Toast.error('密码修改失败。');
                    }
                }
                else {
                    Toast.success('密码修改成功。');
                    FlowRouter.go('/');
                }
            })
        }
    })
};

export default composeAll(
    composeWithTracker(composer),
    useDeps()
)(ChangePasswordPage);