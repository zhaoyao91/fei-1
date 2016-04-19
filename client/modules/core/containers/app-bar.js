import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import AppBar from '../components/app-bar';
import _ from 'lodash';

export const composer = ({context}, onData)=> {
    const {Collections, ActiveRoute} = context();
    const {AppState} = Collections;

    function getAppState(key) {
        return _.get(AppState.findOne({_id: key}), 'value');
    }

    onData(null, {
        brand: getAppState('appbarBrand'),
        links: _.map(getAppState('appbarLinks'), (link)=> {
            link.active = ActiveRoute.path(link.href);
            return link;
        })
    })
};

export default composeAll(
    composeWithTracker(composer),
    useDeps()
)(AppBar);