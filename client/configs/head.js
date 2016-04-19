/**
 * 配置并自动更新html head
 */

import {Tracker} from 'meteor/tracker';
import {DocHead} from 'meteor/kadira:dochead';
import {AppState} from '/lib/collections';
import _ from 'lodash';

export default function () {
    Tracker.autorun(()=> {
        DocHead.removeDocHeadAddedTags();
        DocHead.setTitle(getValue('title'));
        _.forEach(getValue('metas'), (meta)=> {
            DocHead.addMeta(meta);
        });
        _.forEach(getValue('links'), (link)=>{
            DocHead.addLink(link);
        })
    });
}

function getValue(id) {
    const doc = AppState.findOne({_id: id});
    return doc && doc.value;
}