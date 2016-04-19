import React from 'react';
import _ from 'lodash';

const Container = ({children, ...otherProps}) => {
    const props = _.cloneDeep(otherProps);
    props.className = 'container ' + props.className;
    return <div {...props}>
        {children}
    </div>
};

export default Container