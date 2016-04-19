import React from 'react';
import {mount} from 'react-mounter';

import AppLayout from '../core/containers/app-layout';
import CreatePostPage from './containers/create-post-page';
import UpdatePostPage from './containers/update-post-page';
import ShowPostPage from './containers/show-post-page';
import ListPostsPage from './containers/list-posts-page';
import BlogAdminPage from './containers/blog-admin-page';

export default function (injectDeps, {FlowRouter}) {
    const ContextAppLayout = injectDeps(AppLayout);

    FlowRouter.route('/blog/admin', {
        name: 'blog.admin',
        action() {
            mount(ContextAppLayout, {
                content: ()=> <BlogAdminPage/>
            })
        }
    });

    FlowRouter.route('/posts/:id/update', {
        name: 'posts.update',
        action({id}) {
            mount(ContextAppLayout, {
                content: ()=> <UpdatePostPage postId={id}/>
            })
        }
    });

    FlowRouter.route('/posts/create', {
        name: 'posts.create',
        action() {
            mount(ContextAppLayout, {
                content: ()=> <CreatePostPage />
            })
        }
    });

    FlowRouter.route('/posts/:id', {
        name: 'posts.show',
        action({id}) {
            mount(ContextAppLayout, {
                content: ()=> <ShowPostPage postId={id}/>
            })
        }
    });

    FlowRouter.route('/posts', {
        name: 'posts.list',
        action() {
            mount(ContextAppLayout, {
                content: ()=> <ListPostsPage />
            })
        }
    });
}