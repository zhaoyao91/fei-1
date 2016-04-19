import React from 'react';
import {useDeps} from 'mantra-core';

class Page extends React.Component {
    componentDidMount() {
        const {context} = this.props;
        const {Meteor, Toast, FlowRouter} = context();
        Meteor.logout(function(err) {
            if (err) {
                console.error(err);
                Toast.error('退出登录失败。');
            }
            else {
                Toast.success('退出登录成功。');
                FlowRouter.go('/');
            }
        })
    }

    render() {
        return <div></div>
    }
}

export default useDeps()(Page);