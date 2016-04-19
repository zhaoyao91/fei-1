/**
 * 订阅应用状态
 */

import {Meteor} from 'meteor/meteor';

export default function() {
    Meteor.subscribe('AppState');
}