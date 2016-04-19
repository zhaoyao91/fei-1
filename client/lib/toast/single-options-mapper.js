/**
 * 既用于指定默认值，又用于增加新功能
 * @param options
 * @return newOptions
 */

import _ from 'lodash';

function mapTimeout(timeout) {
    switch (timeout) {
        case 'flash':
            return 1000;
        case 'short':
            return 3000;
        case 'middle':
            return 5000;
        case 'long':
            return 10000;
        default:
            return timeout;
    }
}

export default function (options) {
    const defaultOptions = {
        position: window.innerWidth < 768 ? 'bottom' : 'top-right',
        effect: 'scale'
    };
    options = _.defaultsDeep({}, options, defaultOptions);
    options.timeout = mapTimeout(options.timeout);

    return options;
}