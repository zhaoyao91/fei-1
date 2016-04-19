import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import {Posts} from '/lib/collections';
import {Roles} from 'meteor/alanning:roles';
import AppRoles from '/lib/app-roles';
import _ from 'lodash';

export default function () {
    Meteor.methods({
        /**
         * 创建post
         * @pre
         * 用户是blog管理员
         * @param title
         * @param [summary]
         * @param content
         * @param published
         * @return postId
         */
        'posts.create'({title, summary, content, published}) {
            const user = Meteor.user();
            if (!Roles.userIsInRole(user, AppRoles.Admin, Roles.GLOBAL_GROUP)) {
                throw new Meteor.Error('no-permission', 'no permission');
            }

            const now = new Date;
            return Posts.insert({
                title,
                summary,
                content,
                published,
                creatorId: user._id,
                createdAt: now,
                updatedAt: now
            })
        },

        /**
         * 更新post
         * @pre
         * 用户是blog管理员
         * post存在
         * @param id
         * @param title
         * @param [summary]
         * @param content
         * @param published
         */
        'posts.update'({id, title, summary, content, published}) {
            const user = Meteor.user();
            if (!Roles.userIsInRole(user, AppRoles.Admin, Roles.GLOBAL_GROUP)) {
                throw new Meteor.Error('no-permission', 'no permission');
            }

            const post = Posts.findOne({_id: id}, {fields: {_id: 1}});
            if (!post) {
                throw new Meteor.Error('no-post', 'cannot find this post');
            }

            const update = _.extend({updatedAt: new Date}, {title, summary, content, published});
            Posts.update({_id: id}, {
                $set: update
            });
        },

        /**
         * 删除post
         * @pre
         * 用户是blog管理员
         * @param id
         */
        'posts.remove'({id}) {
            const user = Meteor.user();
            if (!Roles.userIsInRole(user, AppRoles.Admin, Roles.GLOBAL_GROUP)) {
                throw new Meteor.Error('no-permission', 'no permission');
            }

            Posts.remove({_id: id});
        },

        /**
         * 获取一篇post
         * @param id
         * @return post
         */
        'posts.get'({id}) {
            return Posts.findOne({_id: id});
        }
    })
}