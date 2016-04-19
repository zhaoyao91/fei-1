import {Mongo} from 'meteor/mongo';
import {Collection2} from 'meteor/aldeed:collection2';

/**
 * 应用状态，在客户端保持实时同步，仅维持少量数据
 * 所有数据以{_id, value}的形式保存，以下为所有数据介绍
 *
 * title: String - 网站标题
 * metas: [Object] - 网站额外的meta信息
 * links: [Object] - 网站额外的links
 *
 * appbarBrand: {text, href} - 导航栏brand
 * appbarLinks: [{text, href}] - 导航栏链接
 *
 * footer: {text, href, target} - footer内容，通常是备案号
 */
export const AppState = new Mongo.Collection('app_state');

/**
 * 应用数据，客户端需要时拉取，可以保存较大量的数据
 * 所有数据以{_id, value}的形式保存，以下为所有数据介绍
 *
 * indexPageTitle: String
 * indexPageCarousel: [{src, href, head, body}] - 建议n个16:9
 * indexPageSectionA: [{src, href}] - 建议1~2个16:9
 * indexPageSectionB: [{src, href}] - 建议4或8个1:1
 */
export const AppData = new Mongo.Collection('app_data');

export const Posts = new Mongo.Collection('posts');
Posts.attachSchema(new SimpleSchema({
    creatorId: {
        type: String,
        index: true
    },

    createdAt: {
        type: Date,
        index: true
    },

    updatedAt: {
        type: Date,
        index: true
    },

    title: {
        type: String,
        index: true
    },

    published: {
        optional: true,
        type: Boolean,
        index: true
    },

    summary: {
        optional: true,
        type: String
    },

    content: {
        type: String
    }
}));