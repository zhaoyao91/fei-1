import {Meteor} from 'meteor/meteor';
import {Roles} from 'meteor/alanning:roles';
import AppRoles from '../../lib/app-roles';
import {check} from 'meteor/check';
import {AppState, AppData} from '../../lib/collections';

export default function () {
    Meteor.methods({
        /**
         * 获取app data
         * 可以同时获取多项
         * @param keys
         * @return values
         */
        'core.getAppData'(...keys) {
            // 支持直接传入数组
            if (keys && Array.isArray(keys[0])) keys = keys[0];

            const values = {};
            AppData.find({_id: {$in: keys}}).forEach((doc)=> {
                values[doc._id] = doc.value;
            });
            return values;
        },

        /**
         * 设置app data项
         *
         * @pre
         * 用户是管理员
         *
         * @param key
         * @param value
         */
        'core.setAppData'({key, value}) {
            if (!Roles.userIsInRole(Meteor.user(), AppRoles.Admin, Roles.GLOBAL_GROUP)) {
                throw new Meteor.Error('no-permission', 'no permission');
            }

            AppData.upsert({_id: key}, {$set: {value}});
        },

        /**
         * 设置app state项
         *
         * @pre
         * 用户是管理员
         *
         * @param key
         * @param value
         */
        'core.setAppState'({key, value}) {
            if (!Roles.userIsInRole(Meteor.user(), AppRoles.Admin, Roles.GLOBAL_GROUP)) {
                throw new Meteor.Error('no-permission', 'no permission');
            }

            AppState.upsert({_id: key}, {$set: {value}});
        }
    })
}