import {composeWithTracker, composeAll, useDeps} from 'mantra-core';
import AdminPage from '../components/admin-page';
import _ from 'lodash';
import adminOnly from '../high-order/admin-only';

export const composer = ({context, actions}, onData)=> {
    const {Meteor, Collections, Toast, FlowRouter} = context();
    const {AppState, AppData} = Collections;
    const stateSub = Meteor.subscribe('AppState');
    const dataSub = Meteor.subscribe('AppData', {
        keys: [
            'indexPageTitle',
            'indexPageCarousel',
            'indexPageSectionA',
            'indexPageSectionB'
        ]
    });

    function getAppState(key, defaultValue) {
        return _.get(AppState.findOne({_id: key}), 'value', defaultValue);
    }

    function getAppData(key, defaultValue) {
        return _.get(AppData.findOne({_id: key}), 'value', defaultValue);
    }

    if (stateSub.ready() && dataSub.ready()) {
        function normalUpdateCallback(err) {
            if (err) {
                if (err.error === 'no-permission') {
                    Toast.error('权限不足。');
                }
                else {
                    console.error(err);
                    Toast.error('更新失败。');
                }
            }
            else {
                Toast.success('更新成功。', {timeout: 'flash'})
            }
        }

        function parseJSON(value, callback) {
            try {
                const parsed = JSON.parse(value);
                callback(parsed);
            }
            catch (err) {
                Toast.error('JSON格式错误。');
            }
        }

        onData(null, {
            blogAdminPagePath: FlowRouter.path('blog.admin'),
            title: getAppState('title', ''),
            onUpdateTitle: (title)=> {
                Meteor.call('core.setAppState', {key: 'title', value: title}, normalUpdateCallback)
            },
            indexPageTitle: getAppData('indexPageTitle', ''),
            onUpdateIndexPageTitle: (indexPageTitle)=> {
                Meteor.call('core.setAppData', {key: 'indexPageTitle', value: indexPageTitle}, normalUpdateCallback)
            },
            metas: JSON.stringify(getAppState('metas', []), null, 4),
            onUpdateMetas: (value)=> parseJSON(value, (value)=> {
                Meteor.call('core.setAppState', {key: 'metas', value: value}, normalUpdateCallback)
            }),
            links: JSON.stringify(getAppState('links', []), null, 4),
            onUpdateLinks: (value)=> parseJSON(value, (value)=> {
                Meteor.call('core.setAppState', {key: 'links', value: value}, normalUpdateCallback)
            }),
            appbarBrand: JSON.stringify(getAppState('appbarBrand', {}), null, 4),
            onUpdateAppbarBrand: (value)=> parseJSON(value, (value)=> {
                Meteor.call('core.setAppState', {key: 'appbarBrand', value: value}, normalUpdateCallback)
            }),
            appbarLinks: JSON.stringify(getAppState('appbarLinks', []), null, 4),
            onUpdateAppbarLinks: (value)=> parseJSON(value, (value)=> {
                Meteor.call('core.setAppState', {key: 'appbarLinks', value: value}, normalUpdateCallback)
            }),
            footer: JSON.stringify(getAppState('footer', {}), null, 4),
            onUpdateFooter: (value)=> parseJSON(value, (value)=> {
                Meteor.call('core.setAppState', {key: 'footer', value: value}, normalUpdateCallback)
            }),
            indexPageCarousel: JSON.stringify(getAppData('indexPageCarousel', []), null, 4),
            onUpdateIndexPageCarousel: (value)=> parseJSON(value, (options)=> {
                Meteor.call('core.setAppData', {key: 'indexPageCarousel', value: options}, normalUpdateCallback)
            }),
            indexPageSectionA: JSON.stringify(getAppData('indexPageSectionA', []), null, 4),
            onUpdateIndexPageSectionA: (value)=> parseJSON(value, (options)=> {
                Meteor.call('core.setAppData', {key: 'indexPageSectionA', value: options}, normalUpdateCallback)
            }),
            indexPageSectionB: JSON.stringify(getAppData('indexPageSectionB', []), null, 4),
            onUpdateIndexPageSectionB: (value)=> parseJSON(value, (options)=> {
                Meteor.call('core.setAppData', {key: 'indexPageSectionB', value: options}, normalUpdateCallback)
            })
        });
    }
    else {
        onData();
    }
};

export default composeAll(
    composeWithTracker(composer),
    adminOnly,
    useDeps()
)(AdminPage)