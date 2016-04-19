import {AppState} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
    Meteor.publish('AppState', function () {
        return AppState.find({});
    })
}