import React from 'react';
import {composeWithTracker} from 'mantra-core';

/**
 * 如果当前非管理员登录状态，则离开该页面
 * 依赖：context
 */

export default (Component)=>
    composeWithTracker((props, onData)=> {
        const {Meteor, Roles, AppRoles, Toast} = props.context();
        if (Meteor.loggingIn()) {
            onData();
        }
        else if (!Roles.userIsInRole(Meteor.user(), AppRoles.Admin, Roles.GLOBAL_GROUP)) {
            setTimeout(()=>Toast.error('只有管理员才能访问该页面。'), 0);
            FlowRouter.go('login');
        }
        else {
            onData(null, props)
        }
    })(Component)