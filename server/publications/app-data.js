import {AppData} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
    Meteor.publish('AppData', function ({keys}) {
        check(keys, [String]);
        return AppData.find({_id: {$in: keys}});
    })
}