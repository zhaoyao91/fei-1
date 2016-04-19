import _ from 'lodash';

export default {
    isMobile() {
        return /Mobile/.test(navigator.userAgent);
    },

    isIOS() {
        return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    },

    compareJSON(x, y) {
        try {
            const xo = JSON.parse(x);
            const yo = JSON.parse(y);
            return _.isEqual(xo, yo);
        }
        catch (err) {
            return false;
        }
    }
}