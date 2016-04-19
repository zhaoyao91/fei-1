import React from 'react';
import {mount} from 'react-mounter';

import AppLayout from '../core/containers/app-layout';
import TestPage from './components/test-page';
import IndexPage from './containers/index-page';
import NotFoundPage from './components/not-found-page';
import AdminPage from './containers/admin-page';
import SignupPage from './containers/signup-page';
import LogoutPage from './containers/logout-page';
import LoginPage from './containers/login-page';
import ChangePasswordPage from './containers/change-password-page';

export default function (injectDeps, {FlowRouter}) {
    const ContextAppLayout = injectDeps(AppLayout);

    FlowRouter.notFound = {
        action() {
            mount(ContextAppLayout, {
                content: ()=> <NotFoundPage/>
            })
        }
    };

    FlowRouter.route('/test', {
        name: 'test',
        action() {
            mount(ContextAppLayout, {
                content: ()=> <TestPage />
            })
        }
    });

    FlowRouter.route('/signup', {
        name: 'signup',
        action() {
            mount(ContextAppLayout, {
                content: ()=> <SignupPage/>
            })
        }
    });

    FlowRouter.route('/login', {
        name: 'login',
        action() {
            mount(ContextAppLayout, {
                content: ()=> <LoginPage/>
            })
        }
    });

    FlowRouter.route('/logout', {
        name: 'logout',
        action() {
            mount(ContextAppLayout, {
                content: ()=> <LogoutPage/>
            })
        }
    });

    FlowRouter.route('/change-password', {
        name: 'change-password',
        action() {
            mount(ContextAppLayout, {
                content: ()=> <ChangePasswordPage/>
            })
        }
    });

    FlowRouter.route('/admin', {
        name: 'admin',
        action() {
            mount(ContextAppLayout, {
                content: ()=> <AdminPage/>
            })
        }
    });

    FlowRouter.route('/', {
        name: 'index',
        action() {
            mount(ContextAppLayout, {
                content: ()=> <IndexPage/>
            })
        }
    });
}