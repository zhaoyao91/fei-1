import {Meteor} from 'meteor/meteor';
import {check, Match} from 'meteor/check';
import {Posts} from '/lib/collections';
import _ from 'lodash';

export default function () {
    /**
     * 查询所有post
     * @param [limit] - 大于0，默认为1
     * @param [sort] - 排序字段，仅支持createdAt, updatedAt
     * @param [fields] - 支持所有字段
     * @param [published] - 发布筛选，undefined则不筛选
     */
    Meteor.publish('posts.all', function ({limit = 1, sort, fields, published}) {
        check(limit, Match.Where((x)=> {
            check(x, Number);
            return x > 0;
        }));
        check(sort, Match.Optional(Match.Where((x)=> {
            check(x, Object);
            return _(x).difference(['createdAt', 'updatedAt']).isEmpty();
        })));
        check(fields, Match.Optional(Object));
        check(published, Match.Optional(Boolean));

        const options = _.extend({}, {limit, sort, fields});

        let query = {};
        if (published === true) {
            query.published = {$eq: true}
        }
        else if (published === false) {
            query.published = {$ne: true}
        }

        return Posts.find(query, options);
    });
}