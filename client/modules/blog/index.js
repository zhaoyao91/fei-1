import routes from './routes'
import actions from './actions';
import initState from './configs/state';

export default {
    routes,
    actions,
    load(context) {
        initState(context);
    }
}