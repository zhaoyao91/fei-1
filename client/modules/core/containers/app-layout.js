import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import AppLayout from '../components/app-layout';
import _ from 'lodash';

export const composer = ({context, actions, content}, onData)=> {
    const {Collections} = context();
    const {AppState} = Collections;

    function getAppState(key) {
        return _.get(AppState.findOne({_id: key}), 'value');
    }

    onData(null, {
        content,
        footer: getAppState('footer')
    })
};

export default composeAll(
    composeWithTracker(composer),
    useDeps()
)(AppLayout);