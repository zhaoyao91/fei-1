/**
 * 为应用添加Toast能力
 * 根据屏幕尺寸决定使用何种模式
 * 通过代理react-s-alert实现中间控制，并添加功能
 * 参考https://github.com/juliancwirko/react-s-alert
 *
 * 中间控制：
 * 提供默认参数
 *
 * 功能增强：
 * 提供语义化的timeout值
 */

import Alert from 'react-s-alert';
import React from 'react';
import defaultGlobalOptions from './default-global-options';
import singleOptionsMapper from './single-options-mapper';

// 需要被添加到应用级组件
export const Placeholder = (props) => {
    return <Alert {...defaultGlobalOptions()} {...props}/>
};

const Toast = {
    close: Alert.close.bind(Alert),
    closeAll: Alert.close.bind(Alert)
};

['warning', 'error', 'info', 'success'].forEach((value)=> {
    Toast[value] = function (message, options) {
        options = singleOptionsMapper(options);
        return Alert[value](message, options);
    }
});

export default Toast;